import type {
	ColumnDef,
	SortingState,
} from '@tanstack/react-table'

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell
} from '@/shared/components/ui/table'

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent
} from '@/shared/components/ui/card'

import { Button } from '@/shared/components/ui/button'
import { ConfirmDeleteModal } from '@/shared/components/modals/ConfirmDeleteModal'
import { DefaultModal } from '@/shared/components/modals/DefaultModal'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

import z from 'zod'

import { useState } from 'react'
import { useDeleteUser } from '../hooks/useDeleteUser'

import type { User } from '../userSchemas'
import { UsersSchema } from '../userSchemas'


type Users = z.infer<typeof UsersSchema>

interface Props {
	data: Users
}

const UsersTable = ({ data }: Props) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [userToDelete, setUserToDelete] = useState<User | null>(null)
	const { mutate: deleteUserById } = useDeleteUser(() => {
		setUserToDelete(null)
	})

	// handler
	const handleEditClick = (user: User) => {
		setEditingUser(user)
	}

	const handleCloseModal = () => {
		setEditingUser(null)
	}

	const handleDeleteUserClick = (user: User) => {
		deleteUserById(user.id)
		setUserToDelete(null)
	}

	// Column definition
	const columns: ColumnDef<User>[] = [
		{
			header: 'Username',
			accessorKey: 'username'
		},
		{
			header: 'Name',
			accessorKey: 'name'
		},
		{
			header: 'Email',
			accessorKey: 'email'
		},
		{
			header: 'Role',
			accessorKey: 'role'
		},
		{
			id: 'actions',
			header: '',
			cell: ({ row }) => (
				<>
					<Button
						className='cursor-pointer bg-blue-300 hover:bg-blue-400 text-white mr-3'
						onClick={() => handleEditClick(row.original)}
						variant={'secondary'}
						size={'sm'}
					>
						Edit
					</Button>
					<Button
						onClick={() => setUserToDelete(row.original)}
						className='cursor-pointer'
						variant={'destructive'}
						size={'sm'}
					>
						Delete
					</Button>
				</>
			),
		},
	]

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
	})


	return (
		<Card>
			{/* EDIT MODAL */}
			<DefaultModal
				title='Edit User'
				open={!!editingUser}
				onOpenChange={(open) => {
					if (!open) setEditingUser(null)
				}}
			>
				<EditUserForm
					user={editingUser}
					onSuccess={() => {
						console.log("updated")
						handleCloseModal()
					}}
				/>
			</DefaultModal>

			{/* DELETE MODAL */}
			<ConfirmDeleteModal
				open={!!userToDelete}
				onOpenChange={() => setUserToDelete(null)}
				onConfirm={() => {
					handleDeleteUserClick(userToDelete!)
				}}
				itemName={userToDelete?.name}
			/>


			<CardHeader className='flex justify-between items-center'>
				<CardTitle>Users</CardTitle>
				<DefaultModal
					title='Add User'
					trigger={
						<Button
							variant={'secondary'}
							className='cursor-pointer px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-white'
						>
							+ add User
						</Button>
					}
				>
					<AddUserForm />
				</DefaultModal>
			</CardHeader>


			<CardContent>

				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((hg) => (
							<TableRow key={hg.id} className='border-b'>
								{hg.headers.map((h) => (
									<TableHead
										key={h.id}
										className='p-2 cursor-pointer select-none text-left'
										onClick={h.column.getToggleSortingHandler()}
									>
										{flexRender(h.column.columnDef.header, h.getContext())}
										{h.column.getIsSorted() === 'asc' && ' ∇'}
										{h.column.getIsSorted() === 'desc' && ' ∆'}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} className='even:bg-gray-50'>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className='p-2'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

export default UsersTable
