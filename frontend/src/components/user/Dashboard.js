import { connect } from 'dva'
import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import RouteWithSubRoutes from '../../routes/RoutesWithSubRoutes'

class Dashboard extends React.Component {
	state = { activeItem: 'dashboard' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={3}>
						<Menu pointing secondary vertical>
							<Menu.Item
								name="dashboard"
								active={activeItem === 'dashboard'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name="orders"
								active={activeItem === 'orders'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name="menus"
								active={activeItem === 'menus'}
								onClick={this.handleItemClick}
							/>
						</Menu>
					</Grid.Column>
					<Grid.Column width={13}>
						{this.props.routes.map((route, i) => {
							return <RouteWithSubRoutes key={i} {...route} />
						})}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(Dashboard)
