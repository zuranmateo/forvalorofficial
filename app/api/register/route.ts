import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { writeClient } from "@/sanity/lib/write-client";
import { CHECK_FOR_EXISTING_AUTHOR } from "@/sanity/lib/queries";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Preveri ali uporabnik že obstaja
    const existingUser = await writeClient.fetch(CHECK_FOR_EXISTING_AUTHOR, { email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const filePath = path.join(process.cwd(), "public", "defaultProfileImg.png");
    const buffer = fs.readFileSync(filePath);

    const imageAsset = await writeClient.assets.upload(
      "image",
      buffer,
      {filename: "defaultProfileImg.png"}
    )

 const newUser = await writeClient.create({
  _type: "author",
  name,
  email,
  password: hashedPassword,
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: imageAsset._id,
    }
  }
});
/*
await writeClient.patch(newUser._id)
  .set({ id: newUser._id })
  .commit();
*/
console.log("Incoming data:", { name, email, password });

    return NextResponse.json(
      { message: "User created successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
      
    );
  }
}
