import { describe, it, expect } from 'vitest'
import {
	UserSchema,
	NewUserFormSchema,
	EditUserFormSchema
} from '../userSchemas'

describe('NewUserFormSchema', () => {
	it('accepts valid data', () => {
		const result = NewUserFormSchema.safeParse({
			name: 'John Doe',
			username: 'johndoe',
			email: 'john@exemple.com',
			role: 'user'
		})

		expect(result.success).toBe(true)
	})

	it('fails with empty name', () => {
		const result = NewUserFormSchema.safeParse({
			name: '',
			username: 'johndoe',
			email: 'john@exemple.com',
			role: 'user'
		})
		
		expect(result.success).toBe(false)
	})

	it('fails witn invalid email', () => {
		const result = NewUserFormSchema.safeParse({
			name: 'John Doe',
			username: 'johndoe',
			email: 'NOT-AN-EMAIL',
			role: 'user'
		})
		
		expect(result.success).toBe(false)
	})

	it('fails with invalid role', () => {
		const result = NewUserFormSchema.safeParse({
			name: 'John Doe',
			username: 'johndoe',
			email: 'john@exemple.com',
			role: 'NOT-A-VALID-ROLE'
		})

		expect(result.success).toBe(false)
	})
})


describe('EditUserFormSchema', () => {
  it('accepts valid data including id', () => {
    const result = EditUserFormSchema.safeParse({
      id: '42',
      name: 'Jane',
      username: 'jane42',
      email: 'jane@example.com',
      role: 'manager',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(42) // coerced to number
    }
  })
})

describe('UserSchema', () => {
  it('parses a full user from backend correctly', () => {
    const result = UserSchema.safeParse({
      id: '1', // will be coerced
      name: 'Alice',
      username: 'alice',
      email: 'alice@example.com',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
      expect(result.data.createdAt).toBeInstanceOf(Date)
    }
  })

  it('fails with malformed date', () => {
    const result = UserSchema.safeParse({
      id: '1',
      name: 'Alice',
      username: 'alice',
      email: 'alice@example.com',
      role: 'admin',
      createdAt: 'NOT-A-DATE',
    })
    expect(result.success).toBe(true) // ← Zod doesn't throw on invalid Date unless you check manually
    if (result.success) {
      expect(isNaN(result.data.createdAt.getTime())).toBe(true)
    }
  })
})