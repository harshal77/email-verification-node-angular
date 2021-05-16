import * as Mongoose from "mongoose";
import { UserInterfce } from "../interfaces/db-interfaces/UserInterface";

export const UserSchema = new Mongoose.Schema({
    first_name: { type: String, required: false, default: '' },
    last_name: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    mobile: { type: String, required: false, default: '' },
    password: { type: String, required: false, default: '' },
    last_otp: { type: String, required: false, default: '' },
    random_key: { type: String, required: false, default: '' },
    is_verified: { type: String, required: false, default: 0 },
    is_deleted: { type: Number, required: false, default: 0 },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


export const UserModel = Mongoose.model<UserInterfce>('user', UserSchema);