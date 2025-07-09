import UsersTable from "@/features/users/components/UsersTable.tsx";
import api from '../../api/api.ts' 

const UserPage = () => {
	const {
		data: users,
		isLoading,
		isError,
		error,
	} = api.useGetUsers()

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>

	return (
		<div className="space-y-4 m-5">
			<UsersTable data={users!} />
		</div>
	)
}

export default UserPage