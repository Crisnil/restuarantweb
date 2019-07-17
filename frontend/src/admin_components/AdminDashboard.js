import React from 'react'
import { connect } from 'dva'
import { Grid } from 'semantic-ui-react'

class Dashboard extends React.Component {
	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		return (
			<Grid stackable>
				<Row>
					<Col width={16}>
						<h4>Admin Dashboard here</h4>
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
)(Dashboard)
