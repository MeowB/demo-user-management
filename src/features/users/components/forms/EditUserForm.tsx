import type { User } from "../../userSchemas";

type NewUser = {
	id: number;
	name: string;
	email: string;
	username: string;
	role: string;
	password: string;
}


const EditUserForm = ({ user, onSuccess}: { user: User | null, onSuccess?: () => void}) => {
	const onSubmit = (data: NewUser) => {
		onSuccess?.();
	}

	return (
		<form>
			<p>edit user form</p>
		</form>
	)
}

export default EditUserForm
