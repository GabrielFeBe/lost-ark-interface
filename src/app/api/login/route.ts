import { NextResponse } from 'next/server';
import prisma from '../../../../prisma';
import jwt from 'jsonwebtoken';
import { opcoes , chaveSecreta } from '@/utils/jwt';

export async function POST(req:Request,) { 
	const body = await req.json();
	const {email, password} = body;
	try {
		const user = await prisma.user.findUnique({ 
			where: {
				email
			}
		});
		if(!user) return NextResponse.error();
		if(user.password !== password) return NextResponse.error();
		const payload = {
			id: user.id,
			email: user.email,
			discordId: user.discordId,
			pointsCap: user.pointsCap
		};
		const token = jwt.sign(payload, chaveSecreta, opcoes);
		const cookieExpirationInSecods = 60 * 60 * 24; // 1 day
		const redirectUrl = new URL('/dashboard', req.url);
		return NextResponse.redirect(redirectUrl, {
			headers: {
				'Set-Cookie': `token=${token};max-age=${cookieExpirationInSecods};path=/;`
			}
		});

	} catch(err) {
		return NextResponse.error();
	}

}