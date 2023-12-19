import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../prisma";

export async function POST(req :NextRequest,res :NextResponse) {

const body = await req.json()
const {dateOfMine , name, userId} = body;
try {
  const newUser = await prisma.character.create({
    data: {
      dateOfMine,
       name,
       userId
    }
  })
  return NextResponse.json({message: "Character created successfully", user: newUser})
} catch (error) {
  return NextResponse.error()
}

}