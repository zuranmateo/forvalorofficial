import { NextRequest, NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/write-client"
import { CHECK_FOR_EXISTING_AUTHOR, CHECK_FOR_ID_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs";

// Funkcija za POST request (registracija uporabnika)
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Preveri, ali so vsa polja izpolnjena
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

    // Pripravi privzeto profilno sliko
    const filePath = path.join(process.cwd(), "public", "defaultProfileImg.png");
    const buffer = fs.readFileSync(filePath);
    
    // Naloži sliko kot asset v Sanity
    const imageAsset = await writeClient.assets.upload(
      "image",
      buffer,
      {filename: "defaultProfileImg.png"}
    )
    
    // Generiranje unikatnega ID-ja (preverja, da ne obstaja že v bazi)
    let generatedId;
    let existingId;
    do {
      // ID na osnovi trenutnega časa v milisekundah
      generatedId = Date.now();
      existingId = await client.fetch(CHECK_FOR_ID_QUERY, {generatedId})
    } while (existingId);

    // Ustvarimo novega uporabnika v Sanity
    const NewUser = await writeClient.create({
      _type: "author",
      id: generatedId, 
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

    return NextResponse.json(
      { message: "User created successfully", userId: NewUser._id },
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
