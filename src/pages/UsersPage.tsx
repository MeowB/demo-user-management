import { useQuery } from "@tanstack/react-query";
import UsersTable from "@/components/UsersTable";

type User = {
	id: number;
	name: string;
	email: string;
	username: string;
}

const UserPage = () => {
	const {
		data: users,
		isLoading,
		isError,
		error,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () =>
			fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
				res.json()
			),
			staleTime: 1000 * 60 * 5
	});

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>

	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<h1 className="text-xl font-semibold">Users</h1>
				<a 
				href="#"
				className="rounded bg-blue-600 px-3 py-1 text-white"
				>
					+ New User
				</a>
			</div>

			<UsersTable data={users!} />
		</div>
	)
}

export default UserPage