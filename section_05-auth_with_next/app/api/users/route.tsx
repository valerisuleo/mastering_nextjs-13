/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import userSchema from './schema';
import { handleCreate } from '../lib/handlers/crudHandlers';
import { errorHandler } from '../lib/handlers/errors/errorHandler';
import { badRequest } from '../lib/handlers/errors/customResponses';

const { user: userModel } = prisma;

// Function to handle fetching all users
async function indexRoute(request: NextRequest) {
    try {
        const users = await userModel.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return errorHandler();
    }
}

// Function to handle creating a new user
async function createRoute(request: NextRequest) {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        const { errors } = validation.error;
        return badRequest(errors);
    }

    return handleCreate(userModel, body, { email: body.email });
}

export { indexRoute as GET, createRoute as POST };
