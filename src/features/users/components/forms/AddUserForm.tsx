import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewUserFormSchema } from '../../userSchemas'
import type { NewUserFormType } from '../../userSchemas'

import { useCreateUser } from '../../hooks/useCreateUser'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

const AddUserForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<NewUserFormType>({
		resolver: zodResolver(NewUserFormSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			role: 'user'
		}
	})

	const { mutate: createUser } = useCreateUser(() => {
		reset()
		onSuccess?.()
	})

	const onSubmit = (user: NewUserFormType) => {
		createUser(user)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<Label htmlFor='name' className='pb-2'>Name</Label>
				<Input id='name' {...register("name")} />
				{errors.username && <p className='text-sm text-red-500' >{errors.username.message}</p>}
			</div>
			<div>
				<Label htmlFor='username' className='pb-2'>Username</Label>
				<Input id='username' {...register("username")} />
				{errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
			</div>
			<div>
				<Label htmlFor='email' className='pb-2'>Email</Label>
				<Input id='email' type='email' {...register("email")} />
				{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
			</div>
			<div>
				<Label htmlFor='role' className='pb-2'>Role</Label>
				<select id="role" {...register("role")} className='w-full border rounded p-2'>
					<option value="user">User</option>
					<option value="admin">Admin</option>
					<option value="manager">Manager</option>
				</select>
				{errors.role && <p className='text-sm text-red-500'>{errors.role.message}</p>}
			</div>
			<div className='flex justify-end'>
				<Button type='submit' disabled={isSubmitting} className='cursor-pointer'>
					{isSubmitting ? 'Adding...' : 'Add User'}
				</Button>
			</div>
		</form>
	)
}
export default AddUserForm
