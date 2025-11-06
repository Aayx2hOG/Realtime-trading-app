// @ts-ignore
import { test, expect } from "bun:test";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./db/.env" });

test("mongodb connection (integration) - skips if MONGODB_URI not provided", async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.warn("MONGODB_URI not set; skipping integration test");
        return;
    }

    await mongoose.connect(uri, { bufferCommands: false });
    expect(mongoose.connection.readyState).toBe(1);
    await mongoose.disconnect();
});
