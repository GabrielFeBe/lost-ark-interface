import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

interface Context  {
  params: {
    id: string
  }
}

export async function PATCH(req:Request, context:Context ) {
	// params
	const {id} = context.params;
	const body = await req.json();
	try {

		const updateChar = await prisma.character.update({
			where: {
				id: Number(id)
			},
			data:{
				dateOfMine: body.dateOfMine,
			}
		});
		return NextResponse.json({message: 'Char updated successfully', char: updateChar });
	} catch (error) {
		return NextResponse.error();
	}
}

export async function GET(req:Request, context:Context ) {
	const {id} = context.params;
	try {

		const char = await prisma.character.findMany({
			where: {
				userId: Number(id)
			},
			orderBy:{
				dateOfMine: 'desc'
			}
		});
		return NextResponse.json({message: 'Characters found successfully', char });
	} catch (error) {
		return NextResponse.error();
	}
}