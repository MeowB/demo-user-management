import UsersTable from "@/features/users/components/UsersTable.tsx";
import api from '../../api/users.ts' 
import { useQuery } from "@tanstack/react-query";
import { UserTableSkeleton } from "./components/skeletons/UserTableSkeleton.tsx";

const UserPage = () => {
	// fetch the users list using tanstack-query with custom fetch function.
	const {
		data: users,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['users'],
		queryFn: api.getUsers,
	})

	if (isLoading) return <UserTableSkeleton />
	if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>

	return (
		<div className="space-y-4 m-5">
			<UsersTable data={users!} />
		</div>
	)
}

export default UserPage