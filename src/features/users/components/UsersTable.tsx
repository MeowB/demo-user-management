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

import { useState } from 'react'
import { DefaultModal } from '../../../shared/components/DefaultModal'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
type User = {
	id: number;
	name: string;
	email: string;
	username: string;
	role: string;
}

interface Props {
	data: User[]
}

const UsersTable = ({ data }: Props) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [editingUser, setEditingUser] = useState<User | null>(null)

	// handler
	const handleEditClick = (user: User) => {
		setEditingUser(user)
	}

	const handleCloseModal = () => {
		setEditingUser(null)
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
				<button
					className='text-blue-600 underline'
					onClick={() => handleEditClick(row.original)}
				>
					Edit
				</button>
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
			<CardHeader className='flex justify-between items-center'>
				<CardTitle>Users</CardTitle>
				<DefaultModal
					title='Add User'
					trigger={<button className='px-4 py-2 bg-blue-300 rounded-md text-white'>+ add User</button>}
				>
					<AddUserForm />
				</DefaultModal>

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
