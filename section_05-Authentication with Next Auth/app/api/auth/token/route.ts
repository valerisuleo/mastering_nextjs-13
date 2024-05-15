import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

async function jwtDecode(req: NextRequest) {
    const token = await getToken({ req });
    return NextResponse.json(token);
}

export { jwtDecode as GET };
