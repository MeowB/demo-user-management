import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddUserForm from "../components/forms/AddUserForm"
import { mockMutate } from "./__mocks__/useCreateUserMock"
import { createMockMutationResult } from "@/shared/__tests__/MockMutationResult"

vi.mock('../hooks/useCreateUser', () => ({
	useCreateUser: (onSuccess: () => void) => ({
		mutate: (data: any) => {
			mockMutate(data)
			onSuccess()
		},
	}),
}))

beforeEach(() => { vi.clearAllMocks() })

describe('AddUserForm', () => {
	it('renders all inputs and the submit button', () => {
		render(<AddUserForm onSuccess={vi.fn()} />)

		expect(screen.getByLabelText('Name')).toBeInTheDocument()
		expect(screen.getByLabelText('Username')).toBeInTheDocument()
		expect(screen.getByLabelText('Email')).toBeInTheDocument()
		expect(screen.getByLabelText('Role')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Add User' })).toBeEnabled()
	})

	it('shows validation errors if submitted empty', async () => {
		render(<AddUserForm onSuccess={vi.fn()} />)

		await userEvent.click(screen.getByRole('button', { name: 'Add User' }))

		expect(await screen.findByText('Name is required')).toBeInTheDocument()
		expect(await screen.findByText('Username is required')).toBeInTheDocument()
		expect(await screen.findByText('Invalid email')).toBeInTheDocument()
	})

	it('calls useCreateUser with correct data on valid submit', async () => {
		const onSuccess = vi.fn()

		render(<AddUserForm onSuccess={onSuccess} />)

		await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
		await userEvent.type(screen.getByLabelText('Username'), 'johndoe')
		await userEvent.type(screen.getByLabelText('Email'), 'john@exemple.com')
		await userEvent.selectOptions(screen.getByLabelText('Role'), 'admin')

		await userEvent.click(screen.getByRole('button', { name: 'Add User' }))

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledWith({
				name: 'John Doe',
				username: 'johndoe',
				email: 'john@exemple.com',
				role: 'admin'
			})

			expect(onSuccess).toHaveBeenCalled()
		})
	})

	it('disables submit button and shows loading text while submitting', async () => {
		// Override the mock for this test only:
		const loadingMutate = vi.fn(() => new Promise(() => { }))
		vi.mocked(createMockMutationResult({ mutate: loadingMutate }))

		render(<AddUserForm onSuccess={vi.fn()} />)

		// Fill the form
		await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
		await userEvent.type(screen.getByLabelText('Username'), 'johndoe')
		await userEvent.type(screen.getByLabelText('Email'), 'john@exemple.com')
		await userEvent.selectOptions(screen.getByLabelText('Role'), 'admin')

		// Click submit
		const button = screen.getByRole('button', { name: 'Add User' })
		expect(button).toBeEnabled()
		userEvent.click(button)

		// Now button should be disabled and show 'Adding...'
		await waitFor(() => {
			expect(button).toBeDisabled()
			expect(button).toHaveTextContent('Adding...')
		})
	})

	it('reset the form after successful submit', async () => {
		const onSuccess = vi.fn()
		vi.mocked(createMockMutationResult())

		render(<AddUserForm onSuccess={onSuccess} />)

		const nameInput = screen.getByLabelText('Name')
		const usernameInput = screen.getByLabelText('Username')
		const emailInput = screen.getByLabelText('Email')
		const roleSelect = screen.getByLabelText('Role')

		await userEvent.type(nameInput, 'Jane Doe')
		await userEvent.type(usernameInput, 'janedoe')
		await userEvent.type(emailInput, 'jane@example.com')
		await userEvent.selectOptions(roleSelect, 'manager')

		await userEvent.click(screen.getByRole('button', { name: 'Add User' }))

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalled()
			expect(onSuccess).toHaveBeenCalled()

			expect(nameInput).toHaveValue('')
			expect(usernameInput).toHaveValue('')
			expect(emailInput).toHaveValue('')
			expect(roleSelect).toHaveValue('user')
		})

	})

})