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

export const NewUserFormSchema = z.object({
	name: z.string().min(1),
	username: z.string().min(1),
	email: z.string().email(),
	role: z.enum(['manager', 'admin', 'user'])
})

export const EditUserFormSchema = NewUserFormSchema.extend({
	id: z.coerce.number()
})

// list of user type
export const UsersSchema = z.array(UserSchema);

// user types
export type UserType = z.infer<typeof UserSchema>;
export type NewUserFormType = z.infer<typeof NewUserFormSchema>;
export type EditUserFormType = z.infer<typeof EditUserFormSchema>
