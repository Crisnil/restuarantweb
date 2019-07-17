import React from 'react'
import { connect } from 'dva'
import { Accordion, Grid, Header, Icon, Label } from 'semantic-ui-react'
import _ from 'lodash'

import OrderList from './OrderList'

class Orders extends React.Component {
	state = {
		activeIndex: 0,
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeIndex } = this.state
		const newIndex = activeIndex === index ? -1 : index

		this.setState({ activeIndex: newIndex })
	}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		// let { allRestaurantOrders } = this.props;
		let allRestaurantOrders = [
			{
				restaurant: 'Sariling Hain',
				orders: [],
			},
			{
				restaurant: 'The Best Eatery',
				orders: [],
			},
		]
		let { activeIndex } = this.state
		return (
			<Grid stackable container>
				<Row>
					<Col>
						<Accordion styled fluid>

							{_.map(allRestaurantOrders, (resto, idx) => {
								return [
									<Accordion.Title
										key={`title${idx}`}
										active={activeIndex === idx}
										index={idx}
										onClick={this.handleClick}
									>
										<Label color="orange" ribbon="right">
											{resto.orders.length} Orders
										</Label>
										<Header>
											<Icon name="dropdown" />
											{resto.restaurant}
										</Header>
									</Accordion.Title>,
									<Accordion.Content
										key={`content${idx}`}
										active={activeIndex === idx}
									>
										<OrderList orderList={resto.orders} />
									</Accordion.Content>,
								]
							})}
						</Accordion>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(Orders)
