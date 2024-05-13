/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { errorHandler } from "./errors/errorHandler";


// Define a type for any Prisma delegate
type PrismaDelegate<Model> = {
    findUnique: (args: { where: any; }) => Promise<Model | null>;
    create: (args: { data: any; }) => Promise<Model>;
    update: (args: { where: any; data: any; }) => Promise<Model>;
};
// Separated logic for object creation to reduce complexity in the POST function
export async function handleCreate<Model>(
    model: PrismaDelegate<Model>,
    body: any,
    dbQuery: { [key: string]: [value: string]; }
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

export async function handleUpdate<Model>(
    model: PrismaDelegate<Model>,
    body: any,
    id: number
) {
    try {
        // Update the entity in the database using the validated data
        const updatedItem = await model.update({
            where: { id },
            data: { ...body },
        });

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        return errorHandler();
    }
}

export async function getItemById<Model>(
    model: PrismaDelegate<Model>,
    id: string
) {
    return await model.findUnique({
        where: { id: parseInt(id) },
    });
}
