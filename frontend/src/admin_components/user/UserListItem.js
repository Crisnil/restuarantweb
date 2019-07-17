import React from 'react'
import { connect } from 'dva'
import { Button, Confirm, Table } from 'semantic-ui-react'
import ViewUserApplication from './ViewUserApplication'
import _ from 'lodash'

class UserListItem extends React.Component {
	state = {
		confirmOpen: false,
	}

	approve = () => {
		this.setState(
			{
				confirmOpen: false,
			},
			() => {
				this.props.approveApplicant(this.props.id)
			}
		)
	}

	confirmApprove = () => {
		this.setState({
			confirmOpen: true,
		})
	}

	closeConfirm = () => {
		this.setState({
			confirmOpen: false,
		})
	}

	viewApplication = () => {}

	render() {
		return (
			<Table.Row>
				<Table.Cell>{_.toUpper(this.props.fullName)}</Table.Cell>
				<Table.Cell>{this.props.emailAddress}</Table.Cell>
				<Table.Cell>
					{_.map(this.props.restaurants, (resto, idx) => (
						<div key={idx}>{resto.name}</div>
					))}
				</Table.Cell>
				<Table.Cell textAlign="center">
					<div>
						{this.props.forConfirmation ? (
							<div>
								<ViewUserApplication
									{...this.props}
									forConfirmation={true}
									confirmApprove={this.confirmApprove}
								/>
								<Confirm
									open={this.state.confirmOpen}
									onCancel={this.closeConfirm}
									onConfirm={this.approve}
									content="Are you sure you want to approve this applicant?"
									size="tiny"
								/>
								<Button color="blue" onClick={this.confirmApprove}>
									Approve
								</Button>
							</div>
						) : (
							<ViewUserApplication {...this.props} />
						)}
					</div>
				</Table.Cell>
			</Table.Row>
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
)(UserListItem)
