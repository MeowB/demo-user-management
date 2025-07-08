import { createRoute } from "@tanstack/react-router";
import type { RootRoute } from "@tanstack/react-router";
import UserPage from "@/pages/UsersPage";


export default (parentRoute: RootRoute) => 
	createRoute({
		path: '/users',
		component: UserPage,
		getParentRoute: () => parentRoute
	})