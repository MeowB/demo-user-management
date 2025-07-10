import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/shared/components/ui/alert-dialog'

type ConfirmDeleteModalProps = {
	open: boolean,
	onOpenChange: (open: boolean) => void,
	onConfirm: () => void,
	itemName?: string
}

export const ConfirmDeleteModal = ({
	open,
	onOpenChange,
	onConfirm,
	itemName = 'this item'
}: ConfirmDeleteModalProps) => (
	<AlertDialog open={open} onOpenChange={onOpenChange}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you sure ?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. It will permanently delete <strong>{itemName}</strong>
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
)