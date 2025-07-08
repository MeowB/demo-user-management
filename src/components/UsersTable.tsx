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
} from '@/components/ui/table'

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent
} from '@/components/ui/card'

import { useState } from 'react'

type User = {
	id: number
	name: string
	username: string
	email: string
}

interface Props {
	data: User[]
}

const UsersTable = ({ data }: Props) => {
	const [sorting, setSorting] = useState<SortingState>([])

	// Column definition
	const columns: ColumnDef<User>[] = [
		{
			header: 'Name',
			accessorKey: 'username'
		},
		{
			header: 'Username',
			accessorKey: 'name'
		},
		{
			header: 'Email',
			accessorKey: 'email'
		},
		{
			id: 'actions',
			header: '',
			cell: ({ row }) => (
				<button
					className='text-blue-600 underline'
					onClick={() => alert(`ID: ${row.original.id}`)}
				>
					View
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
			<CardHeader>
				<CardTitle>Users</CardTitle>
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
