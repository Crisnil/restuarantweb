import React from 'react'
import { connect } from 'dva'
import { Grid, List } from 'semantic-ui-react'

class RestoMenu extends React.Component {
	render() {
		return (
			<Grid stackable>
				<List divided verticalAlign="middle" />
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
)(RestoMenu)
