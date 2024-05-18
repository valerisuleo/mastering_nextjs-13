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
