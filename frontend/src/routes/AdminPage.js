import React from 'react'
import { connect } from 'dva'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
// import { routerRedux } from 'dva/router'
import _ from 'lodash'
import RouteWithSubRoutes from '../routes/RoutesWithSubRoutes'

class AdminPage extends React.Component {
	state = {
		visible: true,
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	handleItemClick = (e, { name }) => {
		console.log('this.props', this.props)
		this.props.history.push(`/account/${name}`)
		// this.props.dispatch(routerRedux.push(`/account/${name}`));
	}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		let activeItem = this.props.location.pathname.replace('/account/', '')
		// const { visible } = this.state;

		return (
			<Container>
				<Grid stackable style={{ padding: 10 }}>
					{/* <Row>
                        <Col>
                            <Sidebar.Pushable as={Grid} stackable>
                                <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
                                    <Menu.Item name='home'>
                                        <Icon name='home' />
                                        Home
                                    </Menu.Item>
                                    <Menu.Item name='gamepad'>
                                        <Icon name='gamepad' />
                                        Games
                                    </Menu.Item>
                                    <Menu.Item name='camera'>
                                        <Icon name='camera' />
                                        Channels
                                    </Menu.Item>
                                </Sidebar>
                                <Sidebar.Pusher>
                                    <Container style={{ minHeight: '700px' }}>
                                        {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}
                                            menustate={this.state.visible}
                                        />)}
                                    </Container>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Col>
                    </Row> */}
					{/* <Col width={4} >
                        <Menu fluid tabular vertical>
                            <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
                            <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
                            <Menu.Item name='restaurants' active={activeItem === 'restaurants'} onClick={this.handleItemClick} />
                            <Menu.Item name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick} />
                        </Menu>
                    </Col> */}
					<Col width={16}>
						<Grid stackable>
							<Row>
								<Col>
									<Header as="h3" attached="top" block>
										{_.upperFirst(activeItem)}
									</Header>
									<Segment attached>
										{this.props.routes.map((route, i) => (
											<RouteWithSubRoutes
												key={i}
												{...route}
												menustate={this.state.visible}
											/>
										))}
									</Segment>
								</Col>
							</Row>
						</Grid>
					</Col>
				</Grid>
			</Container>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		// : bindActionCreators(, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminPage)
