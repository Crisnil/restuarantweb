import React from 'react'
import { connect } from 'dva'
import { Container, Grid } from 'semantic-ui-react'
import Orders from '../components/order/Orders'
import CustomerDetailsForm from '../components/customer/CustomerDetailsForm'

class CheckoutPage extends React.Component {
	render() {
		return (
			<Container>
				<Grid stackable style={{ padding: '1em 0em' }}>
					<Grid.Column width="11">
						<CustomerDetailsForm />
					</Grid.Column>
					<Grid.Column width="5">
						<Grid>
							<Grid.Column width="16">
								<Orders activeRecord={this.props.order} />
							</Grid.Column>
						</Grid>
					</Grid.Column>
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

export default connect(mapStateToProps)(CheckoutPage)
