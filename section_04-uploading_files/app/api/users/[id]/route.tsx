import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import userSchema from '../schema';
import { errorHandler } from '../../lib/handlers/errors/errorHandler';
import { badRequest, notFound } from '../../lib/handlers/errors/customResponses';
import { getItemById, handleUpdate } from '../../lib/handlers/crudHandlers';

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

export { showRoute as GET, updateRoute as PUT, deleteRoute as DELETE };
