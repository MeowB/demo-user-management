import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface UserFiltersProps {
	searchQuery: string,
	setSearchQuery: (q: string) => void,
	roleFilter: string | null,
	setRoleFilter: (r: string | null) => void
}

export const UserFilters = ({
	searchQuery,
	setSearchQuery,
	roleFilter,
	setRoleFilter
}: UserFiltersProps) => {
	const [inputValue, setInputValue] = useState(searchQuery)

	useEffect(() => {
		const handler = setTimeout(() => {
			setSearchQuery(inputValue)
		}, 300)
		return () => clearTimeout(handler)
	}, [inputValue, setSearchQuery])

	useEffect(() => {
		setInputValue(searchQuery)
	}, [searchQuery])

	return (
		<>
			<div className='relative'>
				<Input
					type='text'
					placeholder='Search'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className='my-4 w-full'
				/>
				{inputValue && (
					<Button
						variant={'ghost'}
						onClick={() => setInputValue('')}
						className='absolute right-2 top-0 my-4 text-gray-500 hover:text-gray-700 hover:bg-transparent'
						aria-label='Clear search'
						type='button'
					>
						<X size={16} />
					</Button>
				)}
			</div>
			<div>
				<Select
					value={roleFilter ?? ''}
					onValueChange={(value) => {
						setRoleFilter(value === 'all' ? null : value)
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder='Filter by role' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All</SelectItem>
						<SelectItem value='admin'>Admin</SelectItem>
						<SelectItem value='manager'>Manager</SelectItem>
						<SelectItem value='user'>User</SelectItem>
					</SelectContent>

				</Select>
			</div>
		</>
	)
}