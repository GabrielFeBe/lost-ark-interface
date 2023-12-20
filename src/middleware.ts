import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;
	const signInURL = 'http://localhost:3000/';
	if (!token) {
		return NextResponse.redirect(signInURL);
	}
	return NextResponse.next();
}


export const config = {
	matcher: ['/dashboard/:path*' ],
};