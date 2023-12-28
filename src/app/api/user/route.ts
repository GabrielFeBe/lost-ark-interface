import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../../prisma';


export async function POST(req :NextRequest) {

	const body = await req.json();
	try {
		const newUser = await prisma.user.create({
			data: {
				...body
			}
		});
		return NextResponse.json({message: 'User created successfully', user: newUser});
	} catch (error) {
		return NextResponse.error();
	}
}

export async function GET() {
	try {
    
		const users = await prisma.user.findMany({
			orderBy:{
				id: 'desc',
			}
		});
		return NextResponse.json({message: 'Users found successfully', users });
	} catch (error) {
		return NextResponse.error();
	}

}