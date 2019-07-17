export const userRoutes = [
	{
		key: 'dashboard',
		name: 'Dashboard',
		path: '/account/dashboard',
		adminOnly: false,
	},
	{
		key: 'users',
		name: 'Users',
		path: '/account/users',
		adminOnly: true,
	},
	{
		key: 'restaurants',
		name: 'Restaurants',
		path: '/account/restaurants',
		adminOnly: false,
	},
	{
		key: 'orders',
		name: 'Orders',
		path: '/account/orders',
		adminOnly: false,
	},
]
