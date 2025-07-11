import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/users'
import { toast } from 'sonner'
import type { EditUserFormType } from '../userSchemas'

export const useUpdateUser = (onSuccess?: () => void) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (user: EditUserFormType) => api.updateUser(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			toast.success('User updated successfully')
			onSuccess?.()
		},
		onError: (err) => {
			console.error(err)
			toast.error('Failed to update user')
		}
	})
}