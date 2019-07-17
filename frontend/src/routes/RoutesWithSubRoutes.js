import { Route } from 'dva/router'
import React from 'react'

const RouteWithSubRoutes = route => (
	<Route
		path={route.path}
		exact={route.exact}
		render={props => <route.component {...props} routes={route.routes || []} />}
	/>
)

export default RouteWithSubRoutes
