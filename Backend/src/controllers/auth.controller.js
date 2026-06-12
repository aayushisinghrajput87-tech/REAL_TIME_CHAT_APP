import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use,please use a different email" });
        }

        // pravatar supports 1-70 only
        const idx = Math.floor(Math.random() * 70) + 1;  //generate random number between 1 and 70
        const randomAvatar = `https://i.pravatar.cc/150?img=${idx}`;
        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar,
        });

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                //email:newUser.email,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.error("Error creating Stream user:", error);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });
        return res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // HIGHLIGHT: If you see 'user.matchPassword is not a function',
        // make sure the method is attached in User.js and User is imported correctly.
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });
        return res.status(200).json({ success: true, user });


    } catch (error) {
        console.error("Error in login:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function logout(req, res) {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

export async function onboard(req,res){
    try{
        const userId=req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location, profilePic } = req.body;
        if (!fullName || !nativeLanguage || !learningLanguage || !location || !bio || !profilePic) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                    !profilePic && "profilePic",
                ].filter(Boolean),
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                bio,
                nativeLanguage,
                learningLanguage,
                location,
                profilePic,
                isOnboarded: true,
            },
            { new: true }
        );

        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }

        try{
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                //email:updatedUser.email,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updated for ${updatedUser.fullName}`);
        } catch (streamError) {
            console.error("Error updating Stream user:", streamError.message);
        }

        return res.status(200).json({ success: true, user: updatedUser });
    }catch(error){
        console.error("Error in onboard:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}