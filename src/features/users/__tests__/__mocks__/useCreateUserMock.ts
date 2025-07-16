import { vi } from 'vitest'
import { createMockMutationResult } from '@/shared/__tests__/MockMutationResult'

export const mockMutate = vi.fn()

export const useCreateUserMock = () => {
	createMockMutationResult({
		mutate: mockMutate
	})
}

export default useCreateUserMock