import { Resend } from 'resend';
import WelcomeTemplate from '../../../emails/welcome';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'valerio.risuleo@gmail.com',
        subject: 'Hello World',
        react: <WelcomeTemplate />,
    });

    return NextResponse.json({});
}

export { sendEmail as POST };
