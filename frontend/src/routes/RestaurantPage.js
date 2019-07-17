import React from 'react'
import { connect } from 'dva'
import { Container, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'
import MenuList from '../components/menu/MenuList'
import OrderForm from '../components/order/OrderForm'

class RestaurantPage extends React.Component {
	state = {
		menuListHere: [
			{
				name: 'Menu 1',
				imgSrc:
					'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=burrito-chicken-close-up-461198.jpg',
			},
			{
				name: 'Menu 2',
				imgSrc:
					'https://images.pexels.com/photos/36768/food-salmon-teriyaki-cooking.jpg?cs=srgb&dl=dinner-dish-fish-36768.jpg&fm=jpg',
			},
			{
				name: 'Menu 3',
				imgSrc:
					'https://images.pexels.com/photos/236781/pexels-photo-236781.jpeg?cs=srgb&dl=chicken-dinner-dish-236781.jpg&fm=jpg',
			},
			{
				name: 'Menu 4',
				imgSrc:
					'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?cs=srgb&dl=barbecue-bbq-chicken-106343.jpg&fm=jpg',
			},
		],
		orderItems: [],
		total:0

	}

	constructor(props){
		super(props);

		this.doneInit = false
	}

	componentDidMount() {
		this.getRestuarantwithMenuByNameTag()
			}

	componentDidUpdate(nextProps){
		if(this.doneInit === false && !_.isEmpty(this.props.menu)){
			this.doneInit = true;
					this.beforeOnclickSelectedMenu()
		}
	}

	getRestuarantwithMenuByNameTag = () => {

		this.props.dispatch({
			type: `menu/getRestuarantwithMenuByNameTag`,
			payload: {
				nameTag: this.props.match.params.nameTag,
			},
		})
	}
	setMenu = () => {
		let payload = {}
		payload.orders = _.clone(this.state.orderItems)
		payload.totalPrice=this.state.total
		this.props.dispatch({
			type: `order/setOrders`,
			payload: payload,
		})
	}

	calcTotal=()=>{
		let orderlist = _.clone(this.state.orderItems)
		let subTotal = _.sumBy(orderlist, orderItem => {
			return parseFloat(orderItem.cost)
		})
		let deliveryFee = 0
		let calctotal = deliveryFee + subTotal
		this.setState({
			total:calctotal.toString()
		},()=> {
			this.setMenu()})
	}

	beforeOnclickSelectedMenu =()=>{
		let orders = this.props.order.orders
		let menu = this.props.menu.menus? this.props.menu.menus[0]:{}
		//console.log("menus",menu)
		//return () => {

			let itemIdx = _.findIndex(orders, it => {
				return it.restaurant !== menu.restaurant
			})
			if (itemIdx > -1) {
				this.props.dispatch({
					type: `order/updateFormInput`,
					payload: "clear",
				})
			}
		//}
	}

	onclickSelectedMenu = data => {
		let orders = this.props.order.orders? this.props.order.orders :[]
		let orderItem = _.clone(data)
		return () => {

			let itemIdx = _.findIndex(orders, it => {
				return it.id === orderItem.id
			})
			if (itemIdx > -1) {
				orders[itemIdx].pcs += 1
				orders[itemIdx].cost = orders[itemIdx].pcs * orders[itemIdx].price
				this.setState(
					{
						orderItems: orders,
					},
					() => {

						this.calcTotal()
					}
				)
			} else {

				orderItem.pcs = 1
				orderItem.cost = orderItem.price
				orders.push(orderItem)
				this.setState(
					{
						orderItems: orders,
					},
					() => {
						this.calcTotal()
					}
				)
			}
		}
	}

	render() {

		const Col = Grid.Column
		let activemenus = []
		if (_.isArray(this.props.menu.menus)) {
			activemenus = _.clone(this.props.menu.menus)
		}

		return (
			<Container>
				<Grid stackable style={{ padding: '1em 0em' }}>
					<Col width="11">
						<Header as="h3" style={{ fontSize: '2em', width: '100%' }}>
							{this.props.menu.name}
						</Header>
						<MenuList
							list={activemenus}
							onclickSelectedMenu={this.onclickSelectedMenu}
						/>
					</Col>
					<Col width="5">
						<Grid>
							<Col width="16">
								<OrderForm activeRecord={this.props.order} />
							</Col>
						</Grid>
					</Col>
				</Grid>
			</Container>
		)
	}
}

function mapStateToProps(state) {
	return {
		menu: state.menu.activeRecord,
		order: state.order.activeRecord,
	}
}

export default connect(mapStateToProps)(RestaurantPage)
