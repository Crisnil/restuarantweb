import React from 'react'
import RouteWithSubRoutes from './RoutesWithSubRoutes'
import { Confirm, Dropdown, Grid, Menu, Segment } from 'semantic-ui-react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import _ from 'lodash'

// import logo from '../assets/logo.png'

class Layout extends React.Component {
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
	}

	handleItemClick = (e, props) => {
		// this.setState({ activeItem: name })
		this.goToRoute(props.path)
	}

	goToRoute = route => {
		this.props.dispatch(routerRedux.push(route))
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
		// const Row = Grid.Row;
		const Col = Grid.Column
		const { activeItem } = this.state

		let accountRoutes = [
			{
				key: 'dashboard',
				text: 'Dashboard',
			},
			{
				key: 'users',
				text: 'Users',
			},
			{
				key: 'restaurants',
				text: 'Restaurants',
			},
			{
				key: 'orders',
				text: 'Orders',
			},
		]
		return (
			<Grid centered stackable verticalAlign="middle">
				<Col width={16}>
					<Segment inverted style={{ borderRadius: 0 }}>
						<Menu secondary inverted size="large" fluid>
							<Menu.Item
								key="home"
								path="/"
								active={activeItem === 'home'}
								onClick={this.handleItemClick}
							>
								Home
								{/* <Image src={logo} size='tiny' verticalAlign='middle' /> <span>Home</span> */}
							</Menu.Item>
							{/* <Menu.Item name='contact us' active={activeItem === 'contact us'} onClick={this.handleItemClick} />
                            <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} /> */}
							<Menu.Menu position="right">
								{/* <Menu.Item>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item> */}
								{this.props.auth.isAuthenticated ? (
									<Menu.Item key="logout-menu" active={activeItem === 'logout'}>
										<Dropdown
											text="My Account"
											floating
											labeled
											className="icon"
										>
											<Dropdown.Menu>
												<Dropdown.Menu scrolling>
													{_.map(accountRoutes, (route, idx) => {
														return (
															<Dropdown.Item
																key={route.key}
																text={route.text}
																onClick={() => {
																	this.goToRoute(
																		`/account/${route.key}`
																	)
																}}
															/>
														)
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
									</Menu.Item>
								) : (
									<Menu.Item
										name="login"
										path="/account/dashboard"
										active={activeItem === 'login'}
										onClick={this.handleItemClick}
									/>
								)}
							</Menu.Menu>
						</Menu>
						<Confirm
							size="tiny"
							open={this.state.confirmOpen}
							content="Are you sure you want to logout?"
							onCancel={this.logoutCancel}
							onConfirm={this.logout}
						/>
					</Segment>
				</Col>
				<Col width={16}>
					{this.props.routes.map((route, i) => {
						return <RouteWithSubRoutes key={i} {...route} />
					})}
				</Col>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Layout)
