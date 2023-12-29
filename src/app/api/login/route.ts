import { NextResponse } from 'next/server';
import prisma from '../../../../prisma';
import jwt from 'jsonwebtoken';
import { opcoes , chaveSecreta } from '@/utils/jwt';

export async function POST(req:Request,) { 
	const body = await req.json();
	const {email, pass} = body;
	try {
		const user = await prisma.user.findUnique({ 
			where: {
				email
			}
		});
		if(!user) return NextResponse.error();
		if(user.password !== pass) return NextResponse.error();
		const { password , ...payload} = user;
		console.log(password);
		const token = jwt.sign(payload, chaveSecreta, opcoes);
		const cookieExpirationInDays = 1; // 1 day
		const redirectUrl = new URL('/dashboard', req.url);
		return NextResponse.json({message: 'User found successfully', redirectUrl, token, cookieExpirationInSecods: cookieExpirationInDays});

	} catch(err) {
		return NextResponse.error();
	}

}