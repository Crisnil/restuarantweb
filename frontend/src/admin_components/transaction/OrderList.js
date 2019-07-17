import React from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'
import _ from 'lodash'
import OrderListItem from './OrderListItem'

class OrderList extends React.Component {
	render() {
		return (
			<Table celled definition>
				<Table.Header fullWidth>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Datetime Ordered</Table.HeaderCell>
						<Table.HeaderCell>Address</Table.HeaderCell>
						<Table.HeaderCell>Contact number</Table.HeaderCell>
						<Table.HeaderCell>Order Status</Table.HeaderCell>
						<Table.HeaderCell>Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{_.map(this.props.orderList, (order, idx) => {
						return <OrderListItem key={idx} order={order} />
					})}
				</Table.Body>

				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Button floated="right" icon labelPosition="left" primary size="small">
								<Icon name="food" /> Add Order
							</Button>
							{/* <Button size='small'>Approve</Button>
              <Button disabled size='small'>Approve All</Button> */}
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		)
	}
}

export default OrderList
