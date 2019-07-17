import React from 'react'
import { connect } from 'dva'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'
import RestauranListItem from './RestaurantListItem'

class RestaurantList extends React.Component {
	render() {
		// const Row = Grid.Row;
		// const Col = Grid.Column;
		return (
			<Table celled definition>
				<Table.Header fullWidth>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Owner</Table.HeaderCell>
						<Table.HeaderCell>Contact No.</Table.HeaderCell>
						<Table.HeaderCell>Address</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{_.map(this.props.restaurantList, (listItem, idx) => {
						return (
							<RestauranListItem
								key={idx}
								restoInfo={listItem}
								dispatch={this.props.dispatch}
								getRestaurantList={this.props.getRestaurantList}
							/>
						)
					})}
				</Table.Body>
			</Table>
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
)(RestaurantList)
