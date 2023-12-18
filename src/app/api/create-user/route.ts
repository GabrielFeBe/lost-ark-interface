import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req :NextRequest,res :NextResponse) {

const body = await req.json()
const {discordId, email, password} = body;
try {
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      discordId
    }
  })
  return NextResponse.json({message: "User created successfully", user: newUser})
} catch (error) {
  return NextResponse.error()
}

}