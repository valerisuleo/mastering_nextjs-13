

# Authentication with Next Auth

In this tutorial, you'll learn how to set up authentication in your Next.js application using Next Auth. Whether you're a beginner or have some experience with authentication, this guide will walk you through everything you need to know to get up and running smoothly.

### What You’ll Learn...

- **Setting up Next Auth:** Learn how to integrate Next Auth into your Next.js application for robust authentication solutions.
- **Configuring the Google Provider:** Step-by-step instructions on how to set up Google as an authentication provider.
- **Authentication Sessions:** Manage user sessions effectively to keep your application secure and user-friendly.
	- Accessing Sessions on the Client;
	- Accessing Sessions on the Server;
	- Sign Out Users;
- **Protecting Routes:** Implement route protection to ensure only authenticated users can access certain pages.
- **Database Adapters:** Explore how to use different database adapters to store and manage user data efficiently.
- **Configuring the Credentials Provider:** Set up custom credentials for user authentication, giving you flexibility in how users log in.
- **Registering Users**;

By the end of this tutorial, you’ll have a fully functional authentication system integrated into your Next.js app, complete with secure sessions, protected routes, and more.

Let’s get started!

## Setting up Next Auth

To set up NextAuth.js in a **Next.js 13.2** application using the new App Router and Route Handlers, follow these steps:

### Step 1: Install NextAuth.js

First, install NextAuth.js and its dependencies:

```bash
npm install next-auth
```

### Step 2: Create the Route Handler

Next, set up the route handler for NextAuth.js in the `app` directory. Create the necessary folders and files:

1. Create the following directory: `app/api/auth/[...nextauth]`.
2. Inside this directory, create a `route.ts` file.

The `route.ts` file should contain the following code:

```typescript
import NextAuth from 'next-auth';


const handler = NextAuth({});

export { handler as GET, handler as POST };
```

This setup ensures that all requests to `/api/auth/*` are handled by NextAuth.js using the new Route Handlers introduced in Next.js 13.


### Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXTAUTH_SECRET=your-secret=
NEXTAUTH_URL=http://localhost:3000
```

## Configuring the Google Provider

In this chapter, we will configure the Google provider to allow users to authenticate with their Google accounts. This involves setting up OAuth credentials in the Google Cloud Console and integrating them with NextAuth.js in your Next.js application.

### Step 1: Create a New Project in Google Cloud Console

1. Go to the [providers](https://next-auth.js.org/providers) => select google;
2. Click on the project dropdown at the top and select "New Project";
4. Enter your project name and location, then click "Create";


### Step 2: Configure OAuth Consent Screen

1. Navigate to the "APIs & Services" > "OAuth consent screen."
2. Select "External" as the user type and click "Create."
3. Fill in the required fields such as App name, User support email, and Developer contact information.
4. Click "Save and Continue."

### Step 3: Add Scopes

1. On the "Scopes" page, click "Add or Remove Scopes."
2. Add the necessary OAuth scopes such as `email` and `profile`.
3. Click "Save and Continue."

### Step 4: Add Test Users

1. On the "Test Users" page, add the email addresses of the users you want to test with.
2. Click "Save and Continue."

### Step 5: Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials."
2. Click on "Create Credentials" and select "OAuth 2.0 Client IDs."
3. Choose "Web application" as the application type.
4. Add the authorized JavaScript origins and redirect URIs. For local development, you can use `http://localhost:4200` and `http://localhost:4200/api/auth/callback/google`.
5. Click "Create" and save your Client ID and Client Secret.

### Step 6: Configure NextAuth.js with Google Provider

1. Open your `[...nextauth].ts` file in the `app/api/auth/[...nextauth]` directory.
2. Configure the Google provider with the credentials you obtained from the Google Cloud Console.

	```typescript
	import NextAuth from 'next-auth';
	import GoogleProvider from 'next-auth/providers/google';
	
	const authOptions = {
	  providers: [
	    GoogleProvider({
	      clientId: process.env.GOOGLE_CLIENT_ID,
	      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	    }),
	    // Add more providers here
	  ],
	};
	
	const handler = NextAuth(authOptions);
	
	export { handler as GET, handler as POST };
	```

3. Ensure your environment variables in `.env.local` are correctly set:

	```env
	GOOGLE_CLIENT_ID=your-google-client-id
	GOOGLE_CLIENT_SECRET=your-google-client-secret
	NEXTAUTH_SECRET=your-nextauth-secret
	```

	>Replace the placeholders with your actual Google OAuth 2.0 credentials, which you can obtain from the [Google Developer Console](https://console.developers.google.com/).
	
	
	
4. To test it let's update our navbar...

	```
	<li className="nav-item">
	    <Link className="nav-link" href={'/api/auth/signin'}>
	        Login
	    </Link>
	</li>
	```
	
	...now we should be able to login with Google.
	
	
## Authentication Sessions


When a user signs in, Next Auth creates an authentication session for that user. By default, authentication sessions are represented using JSON Web Tokens (JWTs). But sessions can also be stored in a database


To access the authentication session on the client, we have to wrap our application with SessionProvider. This component uses React Context to pass the authentication session down the component tree. Since React Context is only available in client components, we have to wrap SessionProvider with a `client component`.

### Accessing Sessions on the Client

Wrap your application with the `SessionProvider` to manage authentication sessions. This involves updating the `layout.tsx` file in the `app` directory:

1. Create a `auth` folder in the `app` directory.
2. Inside the `auth` folder, create an `provider.tsx` file with the following content:

	```
	'use client';
	import React, { ReactNode } from 'react';
	import { SessionProvider } from 'next-auth/react';
	
	interface Props {
	    children: ReactNode;
	}
	
	const AuthProvider = ({ children }: Props) => {
	    return <SessionProvider>{children}</SessionProvider>;
	};
	
	export default AuthProvider;
	
	```

3. Modify the `layout.tsx` file to include the `AuthProvider`:

	```tsx
	import './globals.css';
	import Navbar from './components/Navbar';
	import AuthProvider from './context/AuthProvider';
	
	export default function RootLayout({ children }: { children: React.ReactNode }) {
	  return (
	    <html lang="en">
	      <body>
	        <AuthProvider>
	          <Navbar />
	          {children}
	        </AuthProvider>
	      </body>
	    </html>
	  );
	}
	```

4. Let's consume our `AuthProvider` with `useSession()`

	```
	const Navbar = () => {
	    const { data: session, status } = useSession();
	    const [label, setLabel] = useState('');
	
	    useEffect(() => {
	        handleLinks();
	    }, [status]);
	
	    const handleLinks = () => {
	        if (status === 'unauthenticated') {
	            setLabel('Login');
	        } else {
	            setLabel(session?.user.name);
	        }
	    };
	    return (
	        <nav className="navbar navbar-expand-lg navbar-light bg-light">
	            <div className="container-fluid">
	                <a className="navbar-brand">Navbar</a>
	                <div
	                    className="collapse navbar-collapse d-flex justify-content-between"
	                    id="navbarNav"
	                >
	                    <ul className="navbar-nav">
	                        <li className="nav-item">
	                            {status === 'authenticated' && (
	                                <Link
	                                    className="nav-link active"
	                                    aria-current="page"
	                                    href={'/todos'}
	                                >
	                                    Todos
	                                </Link>
	                            )}
	                        </li>
	                        <li className="nav-item">
	                            {status === 'authenticated' && (
	                                <Link className="nav-link" href={'/products'}>
	                                    Products
	                                </Link>
	                            )}
	                        </li>
	                    </ul>
	                    <ul className="navbar-nav">
	                        <li className="nav-item">
	                            <Link
	                                className="nav-link"
	                                href={'/api/auth/signin'}
	                            >
	                                {label}
	                            </Link>
	                        </li>
	                    </ul>
	                </div>
	            </div>
	        </nav>
	    );
	};
	```


	>**Note**: To consume the `useSession` provider, we had to transform the Navbar into a client component by adding 'use client'. We can achieve the same result using SSR (Server-Side Rendering) techniques.

### Accessing Sessions on the Server

NextAuth.js provides a way to access session information on the server side using the `getServerSession` function. This function is particularly useful when you need to protect server-side rendered pages or perform server-side operations that require user authentication.


1. **Import `getServerSession` and `authOptions`**:
   Ensure you import the `getServerSession` function from `next-auth/next` and `authOptions` from your NextAuth.js configuration file.

    ```typescript
    import { getServerSession } from 'next-auth/next';
    import { authOptions } from './api/auth/[...nextauth]/route';
    ```

2. **Use `getServerSession` in Your Server Component**:
	Call `getServerSession` within your server component or API route to retrieve the session.
	
	```
	const Navbar = async () => {
	const session = await getServerSession(authOptions);
	
	```

#### Example Usage

```
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Navbar</a>
                <div
                    className="collapse navbar-collapse d-flex justify-content-between"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {session && (
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    href={'/todos'}
                                >
                                    Todos
                                </Link>
                            )}
                        </li>
                        <li className="nav-item">
                            {session && (
                                <Link className="nav-link" href={'/products'}>
                                    Products
                                </Link>
                            )}
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={'/api/auth/signin'}
                            >
                                {(session && session.user.name) || 'Login'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

```



### Sign Out Users

Signing out users with NextAuth.js is very simple. You just need to add a link to the sign-out endpoint provided by NextAuth.js. Here's how you can do it:

```jsx
<Link
  className="nav-link"
  href={'/api/auth/signout'}
>
  Sign Out
</Link>
```

By adding this link, NextAuth.js will handle the sign-out process and return a logout prompt. When users click on this link, they will be signed out of your application.




## Protecting Routes

Using middleware in Next.js, we can execute code before a request is completed. This allows us to redirect users to the login page if they attempt to access a private part of our application without an active session.


1. **Create the Middleware File**:
   Create a middleware file in your project root.

   ```bash
   touch middleware.ts
   ```

   > Remember to spell `middleware.ts` correctly as part of the Next.js convention.

2. **Implement the Middleware**:
   Open `middleware.ts` and add the following code:

	```
	import { NextRequest, NextResponse } from 'next/server';
	
	function middleware(req: NextRequest) {
	    return NextResponse.redirect(new URL('/products', req.url));
	}
	
	
	export const config = {
	    matcher: ['/todos']
	}
	
	export default middleware;
	```

   This middleware redirects the user to products everytime we hit the todos rotuer.

	> **Matcher**: The `config` object specifies the paths that the middleware should apply to. In this case, it matches the `/users` path.
 

#### Next Auth includes built-in middleware for to check if session is active:


```
import middleware from 'next-auth/middleware';

export default middleware;
export const config = {
    matcher: ['/todos'],
};

```

## [Database Adapters](https://next-auth.js.org/adapters)

NextAuth.js comes with a variety of database adapters that **allow** you **to** **store** user and **session data** **in** different types of **databases**. Using these adapters, you can easily integrate NextAuth.js with your preferred database. Here’s how you can set up a database adapter in your Next.js application using Prisma.

### Step-by-Step Guide

1. **Prisma Adapter**:

   ```
   npm i @next-auth/prisma-adapter
   ```

2. **Update NextAuth.js Configuration**:
Configure NextAuth.js to use the Prisma adapter.

	```
	import { PrismaAdapter } from '@next-auth/prisma-adapter';
	import NextAuth, { NextAuthOptions } from 'next-auth';
	import GoogleProvider from 'next-auth/providers/google';
	import prisma from '../../../../prisma/client';
	
	export const authOptions: NextAuthOptions = {
	    providers: [
	        GoogleProvider({
	            clientId: process.env.GOOGLE_CLIENT_ID,
	            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	        }),
	        // Add more providers here
	    ],
	    adapter: PrismaAdapter(prisma),
	    session: {
	        strategy: 'jwt',
	    },
	};
	
	const handler = NextAuth(authOptions);
	
	export { handler as GET, handler as POST };

	
	```


2. **Define Your Schema**:
   Update your `schema.prisma` file to include models for the NextAuth.js tables. First let's **drop** the user **table**:
   
   - delete `model User` and save;
   - run `npx prisma migrate dev`
   - copy and paste from [here](https://authjs.dev/getting-started/adapters/prisma) 

   ```prisma

	  model Account {
	  id                 String  @id @default(cuid())
	  userId             String  @map("user_id")
	  type               String
	  provider           String
	  providerAccountId  String  @map("provider_account_id")
	  refresh_token      String? @db.Text
	  access_token       String? @db.Text
	  expires_at         Int?
	  token_type         String?
	  scope              String?
	  id_token           String? @db.Text
	  session_state      String?
	 
	  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
	 
	  @@unique([provider, providerAccountId])
	  @@map("accounts")
	}
	 
	model Session {
	  id           String   @id @default(cuid())
	  sessionToken String   @unique @map("session_token")
	  userId       String   @map("user_id")
	  expires      DateTime
	  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
	 
	  @@map("sessions")
	}
	 
	model User {
	  id            String    @id @default(cuid())
	  name          String?
	  email         String?   @unique
	  emailVerified DateTime? @map("email_verified")
	  image         String?
	  accounts      Account[]
	  sessions      Session[]
	 
	  @@map("users")
	}
	 
	model VerificationToken {
	  identifier String
	  token      String
	  expires    DateTime
	 
	  @@unique([identifier, token])
	  @@map("verificationtokens")
	}   

	```

4. **Run Prisma Migrate**:
   Run the migration to create the tables in your database.

   ```bash
   npx prisma migrate dev
   ```

5. **Verifying in the Database**
	After setting up and running your application, you should be able to see the user data in your database. For example, when a user logs in using Google, their information will be stored in the users table:
	
	
	| id                                   | name    | email                     | email_verified | image                                                       |
	|--------------------------------------|---------|---------------------------|----------------|-------------------------------------------------------------|
	| clw6zg7xk0000bjjm3uepkxzb            | Valerio | valerio@ga.co | NULL           | https://lh3.googleusercontent.com/a/ACg8ocXXX... |
	
	This table shows the `id`, `name`, `email`, `email_verified`, and `image` fields for the user stored in the database.


## Configuring the [Credentials Provider](https://next-auth.js.org/providers/credentials)

To use the Credentials provider in NextAuth.js for custom email and password authentication, follow these steps. This setup will include using bcrypt for hashing passwords.

### Step-by-Step Guide

1. **Install Dependencies**:
   Install bcrypt and its TypeScript types for password hashing.

   ```bash
   npm install bcrypt
   npm install @types/bcrypt --save-dev
   ```

2. **Update User Model**:
   Add a `hashedPassword` field to your user model in Prisma schema.

   ```prisma
   model User {
     id            String   @id @default(uuid())
     name          String?
     email         String   @unique
     emailVerified DateTime?
     image         String?
     hashedPassword? String
     accounts      Account[]
     sessions      Session[]
   }
   ```

   Run the Prisma migration to update your database schema.

   ```bash
   npx prisma migrate dev
   ```

3. **Configure NextAuth.js**:
   Update the NextAuth.js configuration to include the Credentials provider. Use bcrypt to compare the hashed password stored in the database with the password provided during login.

   ```typescript
   import NextAuth from 'next-auth';
   import CredentialsProvider from 'next-auth/providers/credentials';
   import bcrypt from 'bcrypt';
   import { PrismaAdapter } from '@next-auth/prisma-adapter';
   import { prisma } from '@/lib/prisma';

   export const authOptions = {
     providers: [
       CredentialsProvider({
         name: 'Credentials',
         credentials: {
           email: { label: 'Email', type: 'email', placeholder: 'Email' },
           password: {
             label: 'Password',
             type: 'password',
             placeholder: 'Password',
           },
         },
         async authorize(credentials) {
           if (!credentials?.email || !credentials.password) {
             return null;
           }

           const user = await prisma.user.findUnique({
             where: { email: credentials.email },
           });

           if (!user || !user.hashedPassword) {
             return null;
           }

           const isValidPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

           if (!isValidPassword) {
             return null;
           }

           return user;
         },
       }),
       // Add more providers here
     ],
     adapter: PrismaAdapter(prisma),
     session: {
       strategy: 'jwt',
     },
     pages: {
       signIn: '/auth/signin',
     },
   };

   const handler = NextAuth(authOptions);

   export { handler as GET, handler as POST };
   ```

## Registering Users

```
import { NextRequest } from 'next/server';
import userSchema from '../users/schema';
import { badRequest } from '../lib/handlers/errors/customResponses';
import prisma from '../../../prisma/client';
import { handleCreate } from '../lib/handlers/crudHandlers';
import bcrypt from 'bcrypt';

async function registerRoute(request: NextRequest) {
    const { user: userModel } = prisma;

    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        const { errors } = validation.error;
        return badRequest(errors);
    } else {
        const clone = { ...body };
        clone.hashedPassword = await bcrypt.hash(body.hashedPassword, 10);

        return handleCreate(userModel, clone, { email: clone.email });
    }
}

export { registerRoute as POST };

```
