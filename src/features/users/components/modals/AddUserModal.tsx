import { DefaultModal } from "@/shared/components/modals/DefaultModal";
import AddUserForm from "../forms/AddUserForm";

interface Props {
	open: boolean,
	onClose: () => void
}

export const AddUserModal = ({ open, onClose }: Props) => {
	return (
		<DefaultModal
			title='Add User'
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) onClose()
			}}
		>
			<AddUserForm onSuccess={() => onClose()} />
		</DefaultModal>
	)
}