import { DefaultModal } from "@/shared/components/modals/DefaultModal";
import EditUserForm from "../forms/EditUserForm";
import type { UserType } from "../../userSchemas";

interface Props {
	user: UserType | null,
	onClose: () => void
}

export const EditUserModal = ({ user, onClose }: Props) => {
	return (
		<DefaultModal
			title='Edit User'
			open={!!user}
			onOpenChange={(open) => {
				if (!open) onClose()
			}}
		>
			{user && (
				<EditUserForm
					user={user}
					onSuccess={() => {
						onClose()
					}}
				/>
			)}
		</DefaultModal>
	)
}