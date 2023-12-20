import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma';

interface Context { 
  params: {
    id: string
  }
}

export async function PATCH(req:Request, context:Context ) {
	// params
	const {id} = context.params;
	const body = await req.json();
	try {

		const updateUser = await prisma.user.update({
			where: {
				id: Number(id)
			},
			data:body
		});
		return NextResponse.json({message: 'User updated successfully', char: updateUser });
	} catch (error) {
		return NextResponse.error();
	}
}

export async function GET(req:Request, context:Context ) {
	// params
	const {id} = context.params;
	if(Number(id) === 0 || !isNaN(Number(id))) return NextResponse.error();
	try {
    
		const user = await prisma.user.findUnique({
			where: {
				id: Number(id)
			}
		});
		return NextResponse.json({message: 'User found successfully', user });
	} catch (error) {
		return NextResponse.error();
	}
}