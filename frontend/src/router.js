import React from 'react'
// import { Router, Route, Redirect } from 'dva/router';
import { Router } from 'dva/router'

import { Loader } from 'semantic-ui-react'

import { PersistGate } from 'redux-persist/lib/integration/react'

import { createPersistorIfNecessary } from './index'

import RouteWithSubRoutes from './routes/RoutesWithSubRoutes'
import App from './routes/App'
import RestaurantPage from './routes/RestaurantPage'
import Login from './components/user/Login'
import Register from './components/user/Register'
import HomePage from './routes/HomePage'
import OrderForm from './components/order/OrderForm'
import Dashboard from './components/user/Dashboard'
import UserContainer from './components/user/userContainer'
import Orders from './components/user/Orders'
import CheckoutPage from './routes/CheckoutPage'
import { privateRoute } from './utils/AuthUtils'
//Admin routes
import AdminPage from './routes/AdminPage'
import AdminDashboard from './admin_components/AdminDashboard'
import AdminUsers from './admin_components/AdminUsers'
import AdminRestaurants from './admin_components/AdminRestaurants'
import AdminOrders from './admin_components/AdminOrders'

function RouterConfig({ history, app }) {
	const routes = [
		// {
		//   path: '/',
		//   exact: false,
		//   component: HealthCheckHidden,
		// },
		{
			path: '/',
			component: App,
			routes: [
				{
					path: '/',
					exact: true,
					component: HomePage,
				},
				{
					path: '/order-form',
					exact: true,
					component: OrderForm,
				},
				{
					path: '/restaurants/:nameTag',
					exact: true,
					component: RestaurantPage,
				},
				{
					path: '/account',
					exact: false,
					component: privateRoute(AdminPage),
					// component: AdminPage,
					routes: [
						{
							path: '/account',
							exact: true,
							component: AdminDashboard,
						},
						{
							path: '/account/users',
							exact: true,
							component: privateRoute(AdminUsers, true), //2nd parameter for is admin
						},
						{
							path: '/account/restaurants',
							exact: true,
							component: AdminRestaurants,
						},
						{
							path: '/account/orders',
							exact: true,
							component: AdminOrders,
						},
					],
				},
				{
					path: '/checkout',
					exact: true,
					component: CheckoutPage,
				},

				//   { path: '/main',
				//     exact: false,
				//     component: privateRoute(Main,['ROLE_USER']),
				//     routes: [
				//       {
				//         path: '/main',
				//         exact: true,
				//         component: Dashboard,
				//       },
				//       {
				//         path: '/main/hospitals',
				//         exact: true,
				//         component: privateRoute(Hospitals,['ROLE_ADMIN']),
				//       },
				//       {
				//         path: '/main/investors',
				//         exact: true,
				//         component: Investors,
				//       },
				//       {
				//         path: '/main/users',
				//         exact: true,
				//         component: privateRoute(Users,['ROLE_ADMIN']),
				//       },
				//       {
				//         path: '/main/settings',
				//         exact: true,
				//         component: privateRoute(Settings,['ROLE_ADMIN']),
				//       }
				//     ]
				//   },
				{
					path: '/login',
					exact: true,
					component: Login,
				},
				{
					path: '/register',
					exact: true,
					component: Register,
				},
			],
		},
		{
			path: '/dashboard/',
			component: UserContainer,
			routes: [
				{
					path: '/dashboard/',
					component: Dashboard,
					routes: [
						{
							path: '/dashboard/orders',
							component: Orders,
							exact: true,
						},
						{
							path: '/dashboard/foodmenu',
							component: Orders,
							exact: true,
						},
						{
							path: '/dashboard/costumers',
							component: Orders,
							exact: true,
						},
					],
				},
			],
		},
	]

	return (
		<PersistGate persistor={createPersistorIfNecessary(app._store)} loading={<Loader />}>
			<Router history={history}>
				<div>
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}

					{/* <Route exact path="/" render={() => (
            <Redirect to="/main"/>
            )
            }
            /> */}
				</div>
			</Router>
		</PersistGate>
	)
}

export default RouterConfig
