import { Button } from "@/shared/components/ui/button";
import type { Table } from "@tanstack/react-table";

interface PaginationControlsProps<TData> {
	table: Table<TData>
}

export const PaginationControls = <TData,>({ table }: PaginationControlsProps<TData>) => {
	return (
		<div className='flex justify-between items-center mt-4'>
			<span className='text-sm text-muted-foreground'>
				Page {table.getState().pagination.pageIndex + 1} of{' '}
				{table.getPageCount()}
			</span>

			<div className='flex items-center gap-2'>
				<Button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					size={'sm'}
					variant={'outline'}
				>
					Previous
				</Button>
				<Button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					size={'sm'}
					variant={'outline'}
				>
					Next
				</Button>
			</div>
		</div>
	)
}