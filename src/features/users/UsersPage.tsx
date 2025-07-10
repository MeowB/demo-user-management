import UsersTable from "@/features/users/components/UsersTable.tsx";
import api from '../../api/users.ts' 
import { useQuery } from "@tanstack/react-query";

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

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>

	return (
		<div className="space-y-4 m-5">
			<div className="bg-gray-100 p-4 rounded">
				<h1 className="text-2xl font-bold mb-2">Users Management</h1>
				<p className="text-gray-600">This is some dummy content to help test the page</p>
			</div>
			<UsersTable data={users!} />
		</div>
	)
}

export default UserPage