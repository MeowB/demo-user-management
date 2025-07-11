import { upfetch } from "@/shared/lib/upfetch";
import { EditUserFormSchema, UserSchema, UsersSchema } from "@/features/users/userSchemas";
import type { EditUserFormType, NewUserFormType } from "@/features/users/userSchemas";

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

const createUser = (user: NewUserFormType) => {
	return upfetch('/users', {
		method: 'POST',
		body: JSON.stringify({
			...user,
			id: Date.now(),
			createdAt: new Date().toISOString()
		}),
		schema: UserSchema
	})
}

const updateUser = (user: EditUserFormType) => {
	return upfetch(`/users/${user.id}`, {
		method: 'PATCH',
		body: user,
		schema: EditUserFormSchema
	})
}

export default { getUsers, createUser, deleteUser, updateUser }