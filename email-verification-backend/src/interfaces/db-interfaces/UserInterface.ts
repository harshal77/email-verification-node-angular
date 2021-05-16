import * as Mongoose from "mongoose";

export interface UserInterfce extends Mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    password: string;
    last_otp: string;
    is_verified: string;
    random_key: string;
    is_deleted: number;
}