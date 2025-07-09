import { createRoute } from "@tanstack/react-router";
import type { RootRoute } from "@tanstack/react-router";
import UserPage from "@/features/users/UsersPage";


export default (parentRoute: RootRoute) => 
	createRoute({
		path: '/users',
		component: UserPage,
		getParentRoute: () => parentRoute
	})