import {StreamChat} from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey=process.env.STREAM_API_KEY;
const apiSecret=process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key and secret are required");
    process.exit(1);
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        console.log(`Stream user upserted: ${userData.id}`);
        return userData;
    }catch(error){
        console.error("Error upserting Stream user:", error);
        throw error;
    }
};

export const generateStreamToken=(userId)=>{
    try{
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token:", error);
        throw error;

    }
    //return streamClient.createToken(userId);
};

//export default streamClient;