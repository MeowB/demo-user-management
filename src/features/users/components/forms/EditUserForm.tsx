import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserFormSchema } from "../../userSchemas";
import type { EditUserFormType } from "../../userSchemas";
import type { UserType } from "../../userSchemas";
import { useUpdateUser } from '../../hooks/useUpdateUser'

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

type editUserFormProps = {
	user: UserType | null,
	onSuccess?: () => void
}


const EditUserForm = ({ user, onSuccess }: editUserFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<EditUserFormType>({
		resolver: zodResolver(EditUserFormSchema),
		defaultValues: {
			id: user?.id ?? 0,
			name: user?.name ?? '',
			username: user?.username ?? '',
			email: user?.email ?? '',
			role: user?.role ?? 'user'
		}
	})


	const { mutate: updateUser } = useUpdateUser(() => {
		reset()
		onSuccess?.()
	})

	const onSubmit = (data: EditUserFormType) => {
		updateUser(data)
	}

	useEffect(() => {
		if (user) {
			reset({
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				role: user.role
			})
		}
	}, [user, reset])


	if (!user) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...register("name")} />
				{errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
			</div>

			<div>
				<Label htmlFor="username">Username</Label>
				<Input id="username" {...register("username")} />
				{errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
			</div>

			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" {...register("email")} />
				{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
			</div>

			<div>
				<Label htmlFor="role">Role</Label>
				<select id="role" {...register("role")} className="w-full border rounded p-2">
					<option value="user">User</option>
					<option value="admin">Admin</option>
					<option value="manager">Manager</option>
				</select>
				{errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
			</div>

			<div className="flex justify-end">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</form>
	)
}

export default EditUserForm
