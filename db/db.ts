import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cached = global.mongooseCache;
if (!cached) cached = global.mongooseCache = { conn: null, promise: null };

export const connectToDb = async () => {
    if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env");
    if (cached.conn) return cached.conn;
    if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    };

    console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`);
}