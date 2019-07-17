import React from 'react'
import { connect } from 'dva'
import { Button, Grid, Header, Label, Modal, Segment, Table } from 'semantic-ui-react'
import _ from 'lodash'

import UserRestoInfo from './UserRestoInfo'

class ViewUserApplication extends React.Component {
	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		let forApproval = this.props.forConfirmation
		return (
			<Modal
				trigger={
					<Button color="blue" basic>
						View
					</Button>
				}
				centered={false}
				closeIcon
			>
				<Modal.Header>
					{forApproval ? `View Application` : `User & Restaurant / s Information`}
				</Modal.Header>
				<Modal.Content>
					<Segment>
						<Header dividing>User Info</Header>
						<Grid container>
							{this.props.isSuperAdmin ? (
								<Label color="red" ribbon="right">
									Admin
								</Label>
							) : null}
							<Row>
								<Col>
									<Table celled>
										<Table.Body>
											<Table.Row>
												<Table.Cell>
													<b>Name:</b>
												</Table.Cell>
												<Table.Cell>{this.props.fullName}</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>
													<b>Email Address:</b>
												</Table.Cell>
												<Table.Cell>{this.props.emailAddress}</Table.Cell>
											</Table.Row>
										</Table.Body>
									</Table>
								</Col>
							</Row>
						</Grid>
					</Segment>
					<Segment>
						<Header dividing>Restaurant/s</Header>
						{forApproval ? (
							<UserRestoInfo
								restoInfo={{
									name: this.props.restoName,
									restopic: this.props.restopic,
									description: this.props.description,
									forApproval,
								}}
								confirmApprove={this.props.confirmApprove}
							/>
						) : (
							_.map(this.props.restaurants, (resto, idx) => {
								return <UserRestoInfo key={idx} restoInfo={resto} />
							})
						)}
					</Segment>
				</Modal.Content>
			</Modal>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(ViewUserApplication)
