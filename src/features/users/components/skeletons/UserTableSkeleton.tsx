import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/shared/components/ui/table';

export const UserTableSkeleton = () => {
  return (
	<div className="rounded-md border">
	  <Table>
		<TableHeader>
		  <TableRow className="border-b">
			<TableHead className="p-2 text-left">Username</TableHead>
			<TableHead className="p-2 text-left">Name</TableHead>
			<TableHead className="p-2 text-left">Email</TableHead>
			<TableHead className="p-2 text-left">Role</TableHead>
			<TableHead className="p-2 text-left">Actions</TableHead>
		  </TableRow>
		</TableHeader>
		<TableBody>
		  {[...Array(5)].map((_, i) => (
			<TableRow key={i} className="even:bg-gray-50">
			  <TableCell className="p-2"><Skeleton className="h-4 w-24" /></TableCell>
			  <TableCell className="p-2"><Skeleton className="h-4 w-48" /></TableCell>
			  <TableCell className="p-2"><Skeleton className="h-4 w-32" /></TableCell>
			  <TableCell className="p-2"><Skeleton className="h-4 w-20" /></TableCell>
			  <TableCell className="p-2 flex gap-2">
				<Skeleton className="h-8 w-14 rounded" />
				<Skeleton className="h-8 w-14 rounded" />
			  </TableCell>
			</TableRow>
		  ))}
		</TableBody>
	  </Table>
	</div>
  );
};