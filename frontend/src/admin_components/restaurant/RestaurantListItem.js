import React from 'react'
import { connect } from 'dva'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'

import MenuList from '../menu/MenuList'
import UpsertRestaurant from './UpsertRestaurant'

class RestaurantListItem extends React.Component {
	state = {
		showMenu: false,
	}

	render() {
		console.log('this.props', this.props)
		// const Row = Grid.Row;
		// const Col = Grid.Column;
		return (
			<Table.Row>
				<Table.Cell>{this.props.restoInfo.name}</Table.Cell>
				<Table.Cell>
					{!_.isEmpty(this.props.restoInfo.owner)
						? this.props.restoInfo.owner.fullName
						: ''}
				</Table.Cell>
				<Table.Cell>{this.props.restoInfo.contact_no}</Table.Cell>
				<Table.Cell>{this.props.restoInfo.address}</Table.Cell>
				<Table.Cell textAlign="center">
					<UpsertRestaurant
						restoInfo={this.props.restoInfo}
						dispatch={this.props.dispatch}
						getRestaurantList={this.props.getRestaurantList}
					/>
					<MenuList {...this.props.restoInfo} dispatch={this.props.dispatch} />
				</Table.Cell>
			</Table.Row>
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
)(RestaurantListItem)
