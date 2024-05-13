# Database Integration with Prisma


## 1. Installing MySQL

Installing MySQL on a Mac is a straightforward process. Here are the steps you can follow to install MySQL using Homebrew, which is a popular package manager for macOS. If you don't have Homebrew installed, you can install it first by following the instructions on the [Homebrew website](https://brew.sh/).

### Step 1: Install MySQL
Once Homebrew is installed, you can install MySQL by running the following command in your terminal:

```
brew install mysql
```

### Step 2: Start MySQL
After installation, you can start the MySQL server with the Homebrew services command:

```bash
brew services start mysql
```
This command will start the MySQL server and set it to launch at startup.

### Step 3: Secure MySQL
MySQL comes with a security script that helps you secure your MySQL installation. It's advisable to run this script:

```bash
mysql_secure_installation
```
This script will guide you through setting up a root password, removing anonymous users, disallowing root login remotely, and removing test databases.

### Step 4: Connect to MySQL
You can connect to the MySQL server using the MySQL client. If you haven't set a password during the secure installation process, you should be able to login to MySQL without a password initially:

```bash
mysql -u root -p
```
You will be prompted to enter the root password that you have previously set.

### Step 5: Configure MySQL (optional)
If needed, you can edit the MySQL configuration file, usually located at `/usr/local/etc/my.cnf` on macOS. You can open this file in any text editor to make changes, such as adjusting the maximum allowed packet size or the default storage engine.

#### Additional Tips
- **Check MySQL Version:** To check the version of MySQL you've installed, you can use the command `mysql --version`.
- **Updating MySQL:** To update MySQL in the future, you can simply run `brew upgrade mysql`.
- **Uninstalling MySQL:** If you need to uninstall MySQL, you can do this with Homebrew by running `brew uninstall mysql`.

## 2. Setting up Prisma ORM

Prisma is a widely-used Object-Relational Mapper (ORM) for Next.js (and Node.js) applications.

> What's an ORM? It's a tool that sits between a layer and an application. It’s responsible for mapping database records to objects in an application. 
> Prisma is the most widely-used ORM for Next.js (or Node.js) applications.

Run: `npx prisma init`

### Defining Models

To use Prisma, first, we have to define our data models. Each model has one or more fields (or properties). In this project, we start with a simple `User` model defined in our Prisma schema.

Go to: `/prisma/schema.prisma` and let's define our model:

```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String
  followers Int     @default(0)
  isActive  Boolean @default(true)
}
```

The `User` model includes:

- `id`: an auto-incrementing integer that uniquely identifies a user.
- `email`: a unique string that stores the user's email address.
- `name`: a string representing the user's name.
- `followers`: an integer with a default value of 0, indicating how many followers the user has.
- `isActive`: a boolean indicating whether the user's account is active, defaulting to true.

> To make it look prettier: `npx prisma format`

### Creating Migrations

Once we create a model, we use Prisma CLI to create a migration file: 

`npx prisma migrate dev` 

A migration file contains instructions to generate or update database tables to match our models. These instructions are in SQL language, which is the language database engines understand.

```
-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

```

### Creating a Prisma Client

To connect with a database, we create an instance of PrismaClient:

`cd prisma && touch client.ts`

Now go to [Best practice for instantiating Prisma Client with Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices) and copy and paste this chunk of code:


```
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

```

This will save us from having multiple instance of Prisma Client due to the Next's fast refresh hence quickly exhaust the database connections.

## 3. Working with Prisma Client (C.R.U.D.)

Prisma Client enables you to easily perform CRUD operations on your database. 

#### Fetching All Users

To fetch all users from the database, we use the `findMany` method provided by Prisma Client.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import { errorHandler } from '../lib/handlers/errors/errorHandler';

const { user: userModel } = prisma;

async function indexRoute(request: NextRequest) {
    try {
        const users = await userModel.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return errorHandler();
    }
}

export { indexRoute as GET };
```

#### Creating a New User

To create a new user, we validate the request body against a **schema** and then use the `create` method.

```typescript

const { user: userModel } = prisma;

async function createRoute(request: NextRequest) {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        const { errors } = validation.error;
        return badRequest(errors);
    }

    return handleCreate(userModel, body, { email: body.email });
}

export { createRoute as POST };
```

> ##### Validation: We use schemas (e.g., userSchema) to validate request bodies. If validation fails, we return a bad request response.

```
import * as z from 'zod';

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

export default userSchema;

```

#### Fetching a User by ID

To fetch a specific user by ID, we use the `findUnique` method.

```typescript

const { user: userModel } = prisma;

async function showRoute(req: NextRequest, { params }) {
    const { id } = params;
    const existingUser = await getItemById(userModel, id);

    if (!existingUser) {
        return notFound();
    } else {
        return NextResponse.json(existingUser);
    }
}

export { showRoute as GET };
```

#### Updating a User

To update a user, we first fetch the existing user, validate the request body, and then use the `update` method.

```typescript

const { user: userModel } = prisma;

async function updateRoute(req: NextRequest, { params }) {
    const { id } = params;
    const existingUser = await getItemById(userModel, id);

    if (!existingUser) {
        return notFound();
    }

    const body = await req.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        const { errors } = validation.error;
        return badRequest(errors);
    } else {
        return handleUpdate(userModel, body, existingUser.id);
    }
}

export { updateRoute as PUT };
```

#### Deleting a User

To delete a user, we fetch the existing user and then use the `delete` method.

```typescript

const { user: userModel } = prisma;

async function deleteRoute(req: NextRequest, { params }) {
    const { id } = params;
    const existingUser = await getItemById(userModel, id);

    if (!existingUser) {
        return notFound();
    } else {
        try {
            await userModel.delete({
                where: { id: existingUser.id },
            });

            return NextResponse.json(
                { message: 'User deleted successfully' },
                { status: 200 }
            );
        } catch (error) {
            return errorHandler();
        }
    }
}

export { deleteRoute as DELETE };
```

### Handler Functions

We use handler functions to modularize and simplify our CRUD operations. This section will cover the refactored handler functions.

#### Creating a New Entity

The `handleCreate` function checks if an entity already exists before creating a new one.

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { errorHandler } from "./errors/errorHandler";

// Define a type for any Prisma delegate
type PrismaDelegate<Model> = {
    findUnique: (args: { where: any; }) => Promise<Model | null>;
    create: (args: { data: any; }) => Promise<Model>;
    update: (args: { where: any; data: any; }) => Promise<Model>;
};

export async function handleCreate<Model>(
    model: PrismaDelegate<Model>,
    body: any,
    dbQuery: { [key: string]: any }
) {
    try {
        const existingItem = await model.findUnique({
            where: dbQuery,
        });
        if (existingItem) {
            return errorHandler({
                errorMessage: 'Entity already exists!',
                statusCode: 409,
            });
        }

        const newItem = await model.create({ data: body });
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return errorHandler();
    }
}
```

#### Updating an Existing Entity

The `handleUpdate` function updates an entity's details in the database.

```typescript
export async function handleUpdate<Model>(
    model: PrismaDelegate<Model>,
    body: any,
    id: number
) {
    try {
        const updatedItem = await model.update({
            where: { id },
            data: { ...body },
        });

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        return errorHandler();
    }
}
```

### Fetching an Entity by ID

The `getItemById` function retrieves an entity by its ID.

```typescript
export async function getItemById<Model>(
    model: PrismaDelegate<Model>,
    id: string
) {
    return await model.findUnique({
        where: { id: parseInt(id) },
    });
}
```

## 4. Error Handling

Handling errors effectively is crucial in any application to ensure that issues are communicated clearly to the client and that the application can recover gracefully. To keep our code DRY (Don't Repeat Yourself), we have created two error handler files: one for custom error responses and another for global error handling. This structure helps maintain a clean and organized codebase.

### Custom Error Responses

Custom error responses help standardize the way errors are communicated to the client. We define custom functions for common HTTP error responses, such as `400 Bad Request` and `404 Not Found`.

#### Bad Request (400)

When validation errors occur, a `400 Bad Request` response is appropriate. We use Zod to validate incoming request data and return the validation issues.

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { ZodIssue } from 'zod';

export function badRequest(errors: ZodIssue[]) {
    return NextResponse.json({ errors }, { status: 400 });
}
```

#### Not Found (404)

When a requested resource cannot be found, a `404 Not Found` response informs the client that the resource does not exist.

```typescript
export function notFound() {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}
```

### Global Error Handler

A global error handler centralizes error handling logic, making it easier to manage and update. It can be used to handle unexpected errors and ensure a consistent response format across the application.

```typescript
import { NextResponse } from 'next/server';

export interface IError {
    errorMessage: string;
    statusCode: number;
}

export function errorHandler(error?: IError) {
    // Default values if not provided
    const statusCode = error?.statusCode || 500;
    const errorMessage = error?.errorMessage || 'Internal server error';

    // Return the error response with the computed values
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
}
```
