import type {
	ColumnDef,
	SortingState,
} from '@tanstack/react-table'
import type { PaginationState } from '@tanstack/react-table'

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
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

import z from 'zod'

import { useState } from 'react'
import { useDeleteUser } from '../hooks/useDeleteUser'
import { useMemo } from 'react'

import type { UserType } from '../userSchemas'
import { UsersSchema } from '../userSchemas'
import { UserFilters } from './UserFilters'
import { PaginationControls } from './PaginationControls'
import { EditUserModal } from './modals/EditUserModal'
import { AddUserModal } from './modals/AddUserModal'


type Users = z.infer<typeof UsersSchema>

interface Props {
	data: Users
}

const UsersTable = ({ data }: Props) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [roleFilter, setRoleFilter] = useState<string | null>(null)
	const [editingUser, setEditingUser] = useState<UserType | null>(null)
	const [userToDelete, setUserToDelete] = useState<UserType | null>(null)
	const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})
	const { mutate: deleteUserById } = useDeleteUser(() => {
		setUserToDelete(null)
	})

	const filteredUsers = useMemo(() => {
		if (!data) return []
		const query = searchQuery.toLowerCase()
		return data.filter((user) => {
			const matchesQuery =
				user.username.toLowerCase().includes(query) ||
				user.name.toLowerCase().includes(query) ||
				user.email.toLowerCase().includes(query)

			const matchesRole = roleFilter ? user.role === roleFilter : true
			return matchesQuery && matchesRole
		})
	}, [data, searchQuery, roleFilter])

	// handler
	const handleEditClick = (user: UserType) => {
		setEditingUser(user)
	}

	const handleCloseEditingModal = () => {
		setEditingUser(null)
	}

	const handleDeleteUserClick = (user: UserType) => {
		deleteUserById(user.id)
	}

	// Column definition
	const columns: ColumnDef<UserType>[] = [
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
				<div className='flex'>
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
				</div>
			),
		},
	]

	const table = useReactTable({
		data: filteredUsers,
		columns,
		state: {
			sorting,
			pagination
		},
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
	})

	return (
		<Card>
			<EditUserModal
				user={editingUser}
				onClose={handleCloseEditingModal}
			/>
			
			<ConfirmDeleteModal
				open={!!userToDelete}
				onOpenChange={() => setUserToDelete(null)}
				onConfirm={() => {
					handleDeleteUserClick(userToDelete!)
				}}
				itemName={userToDelete?.name}
			/>

			<AddUserModal 
				open={addUserOpen}
				onClose={() => setAddUserOpen(false)}
			/>

			<CardHeader>
				<div className='flex justify-between items-center'>
					<CardTitle>Users</CardTitle>
					<Button
						variant={'secondary'}
						className='cursor-pointer px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-white'
						onClick={() => setAddUserOpen(true)}

					>
						+ Add User
					</Button>
				</div>
				<UserFilters
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					roleFilter={roleFilter}
					setRoleFilter={setRoleFilter}
				/>
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
						{filteredUsers.length === 0
							? (
								<TableRow>
									<TableCell colSpan={columns.length} className='text-center py-4 text-muted-foreground'>
										No users found.
									</TableCell>
								</TableRow>
							)
							: table.getPaginationRowModel().rows.map((row) => (
								<TableRow key={row.id} className='even:bg-gray-50'>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className='p-2'>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						}
					</TableBody>
				</Table>
				<PaginationControls table={table} />
			</CardContent>
		</Card>
	)
}

export default UsersTable
