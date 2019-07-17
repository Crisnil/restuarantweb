import React from 'react'
// import { Redirect, Route } from 'dva/router'
import _ from 'lodash'
import { connect } from 'dva'
import moment from 'moment'

const isInRole = (role, rolesRepo) => _.includes(rolesRepo || [], role)

const isInAnyRole = (roles, rolesRepo) => {
	roles = _.isArray(roles) ? roles : []
	let found = false
	roles.forEach(i => {
		if (isInRole(i, rolesRepo)) {
			found = true
		}
	})

	return found
}

const privateRoute = (Component, adminOnly = false) => {
	class AuthenticatedComponent extends React.Component {
		authenticate = () => {
			const newProps = this.props

			const loginStored = localStorage.loginStored
			const { dispatch } = newProps

			const targetPath = newProps.location.pathname + newProps.location.search
			// console.log("newProps", newProps); return;
			// this is previously login and then refreshed
			if (loginStored) {
				let loginStoredData = JSON.parse(loginStored)
				if (moment().isAfter(moment(loginStoredData.cookie.expires))) {
					dispatch({
						type: 'auth/logout',
					})
				} else {
					if (!newProps.auth.account) {
						console.log('ari ko sud')
						// attempt to get account details based on existing session cookie and csrf
						dispatch({
							type: 'auth/loginSuccess',
							targetPath,
							fromRefresh: true,
							loginStored: loginStoredData,
						})
					}
				}
			} else if (!newProps.auth.fromStart)
				if (targetPath)
					dispatch({
						type: 'auth/logout',
						targetPath,
					})
				else
					dispatch({
						type: 'auth/logout',
					})
			else {
			}
		}

		render() {
			let content = null
			if (this.props.auth && this.props.auth.account && this.props.auth.isAuthenticated) {
				if (this.props.auth.account.isSuperAdmin) {
					content = <Component {...this.props} />
				} else {
					if (adminOnly !== true) {
						content = <Component {...this.props} />
					}
				}
			}

			setTimeout(() => {
				this.authenticate()
			}, 200)

			return content
		}
	}

	const mapStateToProps = state => ({
		auth: state.auth,
	})

	return connect(mapStateToProps)(AuthenticatedComponent)
}

export { isInRole, isInAnyRole, privateRoute }
