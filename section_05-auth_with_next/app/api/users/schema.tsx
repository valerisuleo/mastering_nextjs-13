import { z } from 'zod';

const userSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name should have at least 3 characters.' })
        .optional(),
    email: z.string().email({ message: 'Invalid email format.' }),
    hashedPassword: z.string().min(4),
});

export default userSchema;
