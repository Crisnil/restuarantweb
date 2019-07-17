import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	Button,
	Confirm,
	Container,
	Dropdown,
	Icon,
	Image,
	Menu,
	Segment,
	Visibility,
} from 'semantic-ui-react'
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import { menuItems } from '../../constants/LayoutMenu'
import { userRoutes } from '../../constants/UserRoutes'

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmOpen: false,
		}
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'auth/checkLoggedIn',
		})

		this.props.dispatch({
			type: 'layout/setToDesktop',
		})
	}

	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })

	handleItemClick = (e, props) => {
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
		let currentLink = window.location.pathname + window.location.hash.replace('#/', '')

		const { children } = this.props
		const { fixed } = this.state
		let menuList = []
		if (this.props.auth.isAuthenticated) {
			menuList.push(menuItems.left[0])
			_.map(userRoutes, ur => {
				if (!this.props.auth.account.isSuperAdmin) {
					if (ur.adminOnly !== true) {
						menuList.push(ur)
					}
				} else {
					menuList.push(ur)
				}
			})
		} else {
			menuList = menuItems.left
		}

		return (
			<Container fluid>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<Segment
						inverted
						textAlign="center"
						style={{ padding: '0em', height: 65 }}
						vertical
					>
						<Menu fixed={fixed ? 'top' : null} inverted={!fixed} size="large">
							<Container>
								{_.map(menuList, (mil, milIdx) => {
									return (
										<Menu.Item
											path={mil.path}
											active={currentLink === mil.path}
											key={milIdx}
											onClick={this.handleItemClick}
										>
											{' '}
											{typeof mil.imageUrl !== 'undefined' ? (
												<div
													style={{
														padding: 1,
														width: 37,
														height: 37,
														backgroundColor: '#fff',
														borderRadius: 20,
														marginRight: 10,
													}}
												>
													<Image
														src={mil.imageUrl}
														style={{ width: 35, height: 35 }}
													/>
												</div>
											) : null}
											{mil.name}
										</Menu.Item>
									)
								})}

								<Menu.Item position="right">
									{this.props.auth.isAuthenticated ? (
										<Dropdown
											text="My Account"
											floating
											labeled
											className="icon"
										>
											<Dropdown.Menu>
												<Dropdown.Menu scrolling>
													{_.map(userRoutes, route => {
														if (!this.props.auth.account.isSuperAdmin) {
															if (route.adminOnly !== true) {
																return (
																	<Dropdown.Item
																		key={route.key}
																		text={route.name}
																		onClick={() => {
																			this.goToRoute(
																				route.path
																			)
																		}}
																	/>
																)
															}
														} else {
															return (
																<Dropdown.Item
																	key={route.key}
																	text={route.name}
																	onClick={() => {
																		this.goToRoute(route.path)
																	}}
																/>
															)
														}
													})}
													<Dropdown.Divider />
													<Dropdown.Item
														key="logout"
														text="Logout"
														onClick={this.logoutClick}
													/>
												</Dropdown.Menu>
											</Dropdown.Menu>
										</Dropdown>
									) : (
										_.map(menuItems.right, (mir, mirIdx) => {
											return (
												<Button
													key={mirIdx}
													active={currentLink === mir.path}
													inverted={!fixed}
													style={{
														marginLeft: mirIdx > 0 ? '0.5em' : '0',
													}}
													onClick={this.itemClickDirect(mir.path)}
												>
													{mir.name}
												</Button>
											)
										})
									)}
								</Menu.Item>
								<Menu.Item>
									<Icon name="cart" />
									<span>{this.props.order.activeRecord.orders? this.props.order.activeRecord.orders.length:"0"}</span>
								</Menu.Item>
							</Container>
						</Menu>
						<Confirm
							size="tiny"
							open={this.state.confirmOpen}
							content="Are you sure you want to logout?"
							onCancel={this.logoutCancel}
							onConfirm={this.logout}
						/>
					</Segment>
				</Visibility>
				{children}
			</Container>
		)
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node,
}

function mapStateToProps(state) {
	return {
		order: state.order,
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(DesktopContainer)
