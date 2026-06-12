import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",
    },
    nativeLanguage:{
        type:String,
        default:"",
    },
     learningLanguage:{
        type:String,
        default:"",
    },
     location:{
        type:String,
        default:"",
    },
     isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},{timestamps:true});

// FIX: Do not use next() in async mongoose pre hooks
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        // HIGHLIGHT: Throw error directly in async pre hooks
        throw error;
    }
});

// Ensure this method is attached BEFORE exporting the model
userSchema.methods.matchPassword = async function(enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
};

const User=mongoose.model("User",userSchema);

//pre hook

export default User;