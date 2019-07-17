import React from 'react'
// import styles from './App.css';
import { connect } from 'dva'
// import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import RouteWithSubRoutes from '../../routes/RoutesWithSubRoutes'

class UserContainer extends React.Component {
	state = {}

	render() {
		return (
			<div>
				{this.props.routes.map((route, i) => {
					return <RouteWithSubRoutes key={i} {...route} />
				})}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { auth: state.auth }
}

export default connect(mapStateToProps)(UserContainer)
