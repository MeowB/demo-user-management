import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '@/api/users'
import { toast } from "sonner";

export const useDeleteUser = (onSuccess?: () => void) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: api.deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users']});
			toast.success('User deleted successfully');
			onSuccess?.()
		},
		onError: (err) => {
			console.log(err)
			toast.error('Failed to delete user');
		}
	})
}