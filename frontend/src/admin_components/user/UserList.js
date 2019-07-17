import React from 'react'
import { connect } from 'dva'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'
import UserListItem from './UserListItem'

class UserList extends React.Component {
	render() {
		return (
			<Table celled definition>
				<Table.Header fullWidth>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Email</Table.HeaderCell>
						<Table.HeaderCell>Restaurant/s</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{_.map(this.props.userList, (listItem, idx) => {
						return (
							<UserListItem
								key={idx}
								forConfirmation={this.props.forConfirmation}
								approveApplicant={this.props.approveApplicant}
								{...listItem}
							/>
						)
					})}
				</Table.Body>
			</Table>
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
)(UserList)
