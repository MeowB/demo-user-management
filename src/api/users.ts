import { upfetch } from "@/shared/lib/upfetch";
import { UserSchema, UsersSchema } from "@/features/users/userSchemas";
import type { User } from "@/features/users/userSchemas";

/* use custom upfetch wrapper to auto-handle settings and infer type with zod schema */

const getUsers = () => {
	return upfetch('/users', {
		schema: UsersSchema
	})
}

const deleteUser = (id: number) => {
	return upfetch(`/users/${id}`, {
		method: 'DELETE',
		schema: UserSchema
	})
}

const createUser = (data: Omit<User, 'id'>) => {
	return upfetch('/users', {
		method: 'POST',
		body: data,
		schema: UserSchema
	})
}

export default { getUsers, createUser, deleteUser }