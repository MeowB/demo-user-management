import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/components/ui/dialog'
import type { ReactNode } from 'react'

type ModalProps = {
	title: string,
	trigger?: ReactNode,
	children: ReactNode,
	open?: boolean,
	onOpenChange?: (open: boolean) => void
}

export const DefaultModal = ({ title, trigger, children, open, onOpenChange }: ModalProps) =>{
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}