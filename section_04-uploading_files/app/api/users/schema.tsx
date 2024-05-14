import { z } from 'zod';

const userSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name should have at least 3 characters.' }),
    email: z.string().email({ message: 'Invalid email format.' }),
    followers: z
        .number()
        .min(0, { message: 'Followers cannot be less than 0.' })
        .optional(),
    isActive: z.boolean().optional(),
    registeredAt: z.date().optional(),
});

export default userSchema;
