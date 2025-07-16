import type { UseMutationResult } from '@tanstack/react-query'
import { vi } from 'vitest'

export function createMockMutationResult<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  overrides: Partial<UseMutationResult<TData, TError, TVariables, TContext>> = {}
): UseMutationResult<TData, TError, TVariables, TContext> {
  const base = {
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    data: undefined,
    error: null,
    status: 'idle',
    isIdle: true,
    isSuccess: false,
    isError: false,
    reset: vi.fn(),
    variables: undefined,
    context: undefined,
    failureCount: 0,
  }

  return {
    ...base,
    ...overrides,
  } as unknown as UseMutationResult<TData, TError, TVariables, TContext>
}
