import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../../prisma";

export async function PATCH(req:Request, context:any ) {
  // params
  const {id} = context.params;
  const body = await req.json()
  try {

    const updateChar = await prisma.character.update({
      where: {
        id: Number(id)
      },
      data:body
    })
    return NextResponse.json({message: "Char updated successfully", char: updateChar })
  } catch (error) {
    return NextResponse.error()
  }


}