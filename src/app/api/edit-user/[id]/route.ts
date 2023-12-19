import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../../prisma";

export async function PATCH(req:Request, context:any ) {
  // params
  const {id} = context.params;
  const body = await req.json()
  try {

    const updateUser = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data:body
    })
    return NextResponse.json({message: "User updated successfully", char: updateUser })
  } catch (error) {
    return NextResponse.error()
  }


}