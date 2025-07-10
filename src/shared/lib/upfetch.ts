import { up } from 'up-fetch'

// Create a custom fetch wrapper using upfetch.
export const upfetch = up(fetch, () => ({
	baseUrl: 'http://localhost:3001',
	headers: {
		'content-type': 'application/json'
	},
	timeout: 10_000
}));