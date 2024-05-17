# Sending Emails with React Email

In this guide, we'll show you how to set up and use React Email to send beautiful and responsive emails from your React application. By the end of this guide, you'll be able to create, style, preview, and send emails seamlessly.

### In this section...

2. Setting Up React Email
3. Creating an Email Template
5. Previewing Emails
6. Service integration


## Setting Up `React Email`
To begin, we need to set up React Email in our project manually. Follow these steps:


1. **Install React Email and its components:**


   ```bash
   npm install react-email @react-email/components
   ```

2. **Add the development script to `package.json`:**


   ```json
   {
     "scripts": {
       "preview-email": "email dev"
     }
   }
   ```
   
   > This script allows you to start a development server for previewing your email templates by running npm run preview-email. This will launch a local server where you can see changes to your email templates in real-time as you develop them.
  

## Creating an Email Template

Create a new folder called `emails` and inside it, create a file named `welcome.tsx` with the following content:
	
```
const WelcomeTemplate = () => {
    return (
        <Html>
            <Preview>Welcome to Our Service</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>
                    <div style={styles.header}>
                        <Heading style={styles.headerText}>
                            Welcome to Our Service!
                        </Heading>
                    </div>
                    <div style={styles.main}>
                        <Text>Dear User,</Text>
                        <Text>
                            We are excited to have you on board. Our service
                            offers you the best experience to manage your tasks
                            efficiently and effectively.
                        </Text>
                        <Text>Click the link below to get started:</Text>
                        <Link
                            href="https://www.valerisuleo.it"
                            style={styles.link}
                        >
                            www.mywebsite.it
                        </Link>
                        <Text>We look forward to your success!</Text>
                        <Text>Best Regards,</Text>
                        <Text>The Team</Text>
                    </div>
                    <div style={styles.footer}>
                        <Text>
                            If you have any questions, feel free to{' '}
                            <Link
                                href="https://www.mywebsite.it/contact"
                                style={styles.link}
                            >
                                contact us
                            </Link>
                            .
                        </Text>
                    </div>
                </Container>
            </Body>
        </Html>
    );
};
```


### Styling Emails
To style your emails, you can use inline styles or CSS-in-JS like *Tailwind*. 

>Inline styles are recommended for better compatibility across different email clients.

```
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  header: { color: "#333" },
  link: { color: "#007bff" }
};

const WelcomeEmail = () => (
  <Email>
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Our Service!</h1>
      <p>We're excited to have you on board.</p>
      <a href="https://yourwebsite.com" style={styles.link}>Get Started</a>
    </div>
  </Email>
);
```

## Previewing Emails

- Run the development server: `npm run preview-email`;
- **See changes live**: open your browser and visit [http://localhost:3000](http://localhost:3000) to see your email template.


## Service Integration

`React Email` works with various other email services, including:

- Nodemailer
- SendGrid
- Postmark
- AWS SES
- MailerSend
- Plunk
- **Resend**


>**Note:** Resend was built by the same team that created React Email, making it our recommended service for sending emails.


### Prerequisites
To get the most out of this guide, you’ll need to:

- Visit [Resend](https://resend.com/)
- Create an API key
- Verify your domain


### Installation

```
npm install resend
```

### Sending an Email
In the `send-email` directory, create `route.tsx` with the following content:

```javascript
import { Resend } from 'resend';
import WelcomeTemplate from '../../../emails/welcome';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'my_email@ga.co',
        subject: 'Hello World',
        react: <WelcomeTemplate />,
    });

    return NextResponse.json({});
}

export { sendEmail as POST };
```

