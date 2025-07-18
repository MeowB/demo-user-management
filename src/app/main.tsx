import { StrictMode } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import { router } from '@/router/router.tsx'
import * as TanStackQueryProvider from '../integrations/tanstack-query/root-provider.tsx'

import './styles.css'
import reportWebVitals from '../reportWebVitals.ts'

import { Toaster } from 'sonner'

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<Toaster position='top-right' richColors />
			<TanStackQueryProvider.Provider>
				<RouterProvider router={router} />
			</TanStackQueryProvider.Provider>
		</StrictMode>,
	)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
