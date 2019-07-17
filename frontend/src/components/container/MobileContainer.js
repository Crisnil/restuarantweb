import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { menuItems } from '../../constants/LayoutMenu'
import { userRoutes } from '../../constants/UserRoutes'

class MobileContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handlePusherClick = () => {
		const { sidebarOpened } = this.state

		if (sidebarOpened) this.setState({ sidebarOpened: false })
	}

	handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

	componentDidMount() {
		this.props.dispatch({
			type: 'auth/checkLoggedIn',
		})

		this.props.dispatch({
			type: 'layout/setToMobile',
		})
	}

	handleItemClick = (e, props) => {
		this.handleToggle()
		this.goToRoute(props.path)
	}

	goToRoute = route => {
		let currentLink = window.location.pathname + window.location.hash.replace('#/', '')
		if (currentLink !== route) this.props.dispatch(routerRedux.push(route))
	}

	itemClickDirect = route => {
		return () => {
			this.goToRoute(route)
		}
	}

	logout = () => {
		this.setState(
			{
				confirmOpen: false,
			},
			() => {
				this.props.dispatch({
					type: 'auth/logout',
				})
			}
		)
	}

	logoutClick = () => {
		this.setState({
			confirmOpen: true,
		})
	}

	logoutCancel = () => {
		this.setState({
			confirmOpen: false,
		})
	}

	render() {
		const { children } = this.props
		let menuList = []
		if (this.props.auth.isAuthenticated) {
			menuList.push(menuItems.left[0])
			_.map(userRoutes, ur => {
				menuList.push(ur)
			})
		} else {
			menuList = menuItems.left
		}
		const { sidebarOpened } = this.state

		return (
			<Sidebar.Pushable>
				<Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
					{_.map(menuItems.left, (mil, milIdx) => {
						return (
							<Menu.Item
								path={mil.path}
								key={`left${milIdx}`}
								onClick={this.handleItemClick}
							>
								{mil.name}
							</Menu.Item>
						)
					})}
					{_.map(menuItems.right, (mir, mirIdx) => {
						return (
							<Menu.Item
								path={mir.path}
								key={`right${mirIdx}`}
								onClick={this.handleItemClick}
							>
								{' '}
								{mir.name}
							</Menu.Item>
						)
					})}
				</Sidebar>

				<Sidebar.Pusher
					dimmed={sidebarOpened}
					onClick={this.handlePusherClick}
					style={{ minHeight: '100vh' }}
				>
					<Segment inverted textAlign="center" style={{ padding: '1em 0em' }} vertical>
						<Container>
							<Menu inverted pointing secondary size="large">
								<Menu.Item onClick={this.handleToggle}>
									<Icon name="sidebar" />
								</Menu.Item>
								<Menu.Item position="right">
									{_.map(menuItems.right, (mir, mirIdx) => {
										return (
											<Button
												key={mirIdx}
												inverted
												size="mini"
												style={{
													marginLeft: mirIdx > 0 ? '0.5em' : '0',
													fontSize: '0.75rem',
												}}
												onClick={this.itemClickDirect(mir.path)}
											>
												{mir.name}
											</Button>
										)
									})}
								</Menu.Item>
								<Menu.Item>
									<Icon name="cart" />
									<span>{this.props.order.activeRecord.orders.length}</span>
								</Menu.Item>
							</Menu>
						</Container>
					</Segment>

					{children}
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		)
	}
}

MobileContainer.propTypes = {
	children: PropTypes.node,
}

function mapStateToProps(state) {
	return {
		order: state.order,
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(MobileContainer)
