import { useQuery } from "@tanstack/react-query";

type User = {
	id: number;
	name: string;
	email: string;
	username: string;
	role: string;
}

const useGetUsers = () => {
	return useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () =>
			fetch("http://localhost:3001/users").then((res) =>
				res.json()
			),
		staleTime: 1000 * 60 * 5
	});
}

export default { useGetUsers }