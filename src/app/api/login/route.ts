import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../../prisma';
import jwt from 'jsonwebtoken';
import { chaveSecreta, opcoes } from '@/utils/jwt';



export async function POST(req :NextRequest) {

	const body = await req.json();
	const { email, password: pass } = body;
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
				
			}
		});
		if(!user) return NextResponse.error();
		if(pass !== user.password) return NextResponse.error();
		const {password, ...payload} = user;
		console.log(password);
		const token = jwt.sign(payload,chaveSecreta, opcoes );
		const cookiesExpiresInDays = 1; //days

		return NextResponse.json({message: 'User created successfully', token,cookiesExpiresInDays, redirectUrl:'/dashboard'} );
	} catch (error) {
		return NextResponse.error();
	}
}

