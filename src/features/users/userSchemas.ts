import { z } from 'zod'

// zod schema for type infering
export const UserSchema = z.object({
	id: z.coerce.number(),
	name: z.string(),
	username: z.string(),
	email: z.string().email(),
	role: z.enum(['manager', 'admin', 'user']),
	createdAt: z
		.string()
		.transform((val) => new Date(val)),
})

// list of user type
export const UsersSchema = z.array(UserSchema);

// user type
export type User = z.infer<typeof UserSchema>;