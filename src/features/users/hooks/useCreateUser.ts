import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '@/api/users'
import { toast } from "sonner";
import type { NewUserFormType } from "../userSchemas";

export const useCreateUser = (onSuccess?: () => void) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (user: NewUserFormType) => api.createUser(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			toast.success('User created successfully')
			onSuccess?.()
		},
		onError: (err) => {
			console.error(err)
			toast.error('Failed to create user')
		}
	})
}