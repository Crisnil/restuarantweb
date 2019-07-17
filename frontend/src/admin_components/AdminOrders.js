import React from 'react'
import { connect } from 'dva'
import { Grid } from 'semantic-ui-react'

import Orders from './transaction/Orders'

class AdminOrders extends React.Component {
	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		return (
			<Grid stackable>
				<Row>
					<Col>
						<h4>To be implemented...</h4>

						<Orders {...this.props} />
					</Col>
				</Row>
			</Grid>
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
)(AdminOrders)
