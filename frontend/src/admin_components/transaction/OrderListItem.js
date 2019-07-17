import React from 'react'
import { connect } from 'dva'
import { Table } from 'semantic-ui-react'

class OrderListItem extends React.Component {
	render() {
		let { order } = this.props
		return (
			<Table.Row>
				<Table.Cell>{order.fullName}</Table.Cell>
				<Table.Cell>{order.address}</Table.Cell>
				<Table.Cell>{order.contact}</Table.Cell>
				<Table.Cell>{order.tracking}</Table.Cell>
				<Table.Cell>{order.price}</Table.Cell>
				<Table.Cell>{order.status}</Table.Cell>
			</Table.Row>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(OrderListItem)
