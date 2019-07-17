import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { Grid } from 'semantic-ui-react'
import RestaurantList from './restaurant/RestaurantList'

class AdminRestaurants extends React.Component {
	state = {
		restaurantList: [],
		loading: false,
	}

	componentDidMount() {
		this.getRestaurantList()
		this.getLogin()
	}

	getLogin = () => {
		this.props.dispatch({
			type: 'auth/checkLoggedIn',
		})
	}

	getRestaurantList = () => {
		// this.setState({
		//     loading: true
		// }, () => {
		//     get('/api/restaurant').then(response => {
		//         this.setState({
		//             loading: false,
		//             restaurantList: response.data
		//         })
		//     }).catch(err => {
		//         console.log("error at getRestaurantList", err)
		//         this.setState({
		//             loading: false,
		//         })
		//     })
		// })
		let finalPayload = _.clone(this.props.auth.account)
		this.props.dispatch({
			type: `restaurant/getRestaurants`,
			payload: finalPayload,
		})
	}

	render() {
		//  console.log("stateprops",this.props.auth);

		const Row = Grid.Row
		const Col = Grid.Column
		const { loading } = this.state
		return (
			<Grid stackable>
				<Row>
					<Col width={16}>
						<RestaurantList
							restaurantList={this.props.restaurants}
							loading={loading}
							dispatch={this.props.dispatch}
							getRestaurantList={this.getRestaurantList}
						/>
					</Col>
				</Row>
				{/* <Row>
                    <Col width={16} >
                        <UpsertRestaurant />
                    </Col>
                </Row> */}
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		restaurants: state.restaurant.records,
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(AdminRestaurants)
