import React from 'react'
import { connect } from 'dva'
import { Button, Divider, Form, Grid, Image, List } from 'semantic-ui-react'
//import { DateInput, TimeInput } from 'semantic-ui-calendar-react'
import _ from 'lodash'
import numeral from 'numeral'
import * as routerRedux from 'react-router-redux'

class OrderForm extends React.Component {
	goToLink = () => {
		this.props.dispatch(routerRedux.push(`/checkout`))
	}

	render() {
		let subTotal = _.sumBy(this.props.order.orders, orderItem => {
			return parseFloat(orderItem.cost)
		})
		let deliveryFee = 0
		let total = deliveryFee + subTotal

		let activeOrder = _.map(this.props.order.orders, (orderitem, x) => {
			return (
				<List.Item key={x}>
					<List.Content floated="right">
						<span style={{ paddingTop: 8 }}>
							{`₱${numeral(orderitem.cost).format('0,0.00')}`}
						</span>
					</List.Content>
					<List.Content>
						<Image
							avatar
							style={{
								backgroundImage: `url(${orderitem.menupic})`,
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
							}}
						/>
						<span style={{ paddingTop: 8, paddingLeft: 8 }}>{orderitem.pcs}</span>
						<span style={{ paddingTop: 8, paddingLeft: 8 }}>x</span>
						<span style={{ paddingTop: 8, paddingLeft: 8, wordBreak: 'break-word' }}>
							{orderitem.name}
						</span>
					</List.Content>
				</List.Item>
			)
		})
		return (
			<Form>
				<Grid centered>
					<Grid.Row>
						<div>
							<h3>Hello Someone!</h3>
						</div>
					</Grid.Row>
				</Grid>
				<Divider horizontal>Order Summary</Divider>
				<List relaxed>{activeOrder}</List>
				<Divider />
				<List relaxed>
					<List.Item>
						<List.Content floated="right">
							<span style={{ paddingTop: 8 }}>
								{`₱${numeral(subTotal).format('0,0.00')}`}
							</span>
						</List.Content>
						<List.Content>
							<span style={{ paddingTop: 8 }}>Subtotal</span>
						</List.Content>
					</List.Item>
					<List.Item>
						<List.Content floated="right">
							<span style={{ paddingTop: 8 }}>
								{`₱${numeral(deliveryFee).format('0,0.00')}`}
							</span>
						</List.Content>
						<List.Content>
							<span style={{ paddingTop: 8 }}>Delivery fee</span>
						</List.Content>
					</List.Item>
					<List.Item>
						<List.Content floated="right">
							<span
								style={{
									paddingTop: 8,
									fontWeight: 'bold',
									fontSize: '1.5em',
								}}
							>
								{`₱${numeral(total).format('0,0.00')}`}
							</span>
						</List.Content>
						<List.Content>
							<span
								style={{
									paddingTop: 8,
									fontWeight: 'bold',
									fontSize: '1.5em',
								}}
							>
								Total
								<em
									style={{
										fontSize: '1rem',
										fontWeight: 300,
										fontStyle: 'normal',
									}}
								>
									{' '}
									(Incl. VAT)
								</em>
							</span>
						</List.Content>
					</List.Item>
				</List>
				<Button primary fluid onClick={this.goToLink} disabled={_.isEmpty(activeOrder)}>
					Checkout
				</Button>
			</Form>
		)
	}
}

function mapStateToProps(state) {
	return {
		order: state.order.activeRecord,
	}
}

export default connect(mapStateToProps)(OrderForm)
