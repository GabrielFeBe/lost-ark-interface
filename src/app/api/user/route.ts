import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../../prisma';


export async function POST(req :NextRequest) {

	const body = await req.json();
	const {discordId, email, password , pointsCap} = body;
	try {
		const newUser = await prisma.user.create({
			data: {
				email,
				password,
				discordId,
				pointsCap
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
				pointsCap: 'desc'
			},
			select:{
				id: true,
				email: true,
				discordId: true,
				pointsCap: true,
				password:false,
			}
		});
		return NextResponse.json({message: 'Users found successfully', users });
	} catch (error) {
		return NextResponse.error();
	}

}