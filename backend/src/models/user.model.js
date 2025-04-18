import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    cerkId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })
// timestamps:  automatic createtAt: , updatedAt: times

export const User = mongoose.model("User", userSchema)