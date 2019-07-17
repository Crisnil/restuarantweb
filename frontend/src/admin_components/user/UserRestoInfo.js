import React from 'react'
import { connect } from 'dva'
import { Button, Grid, Icon, Image, Table } from 'semantic-ui-react'
import { BASE_URL } from '../../utils/RestClient'

class UserRestoInfo extends React.Component {
	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		let resto = this.props.restoInfo
		let { forApproval } = resto

		return (
			<Grid container>
				<Row>
					<Col width={6}>
						<Image
							label={{
								as: 'a',
								color: forApproval ? 'red' : 'green',
								size: 'large',
								content: forApproval ? 'Unapproved' : 'Approved',
								ribbon: true,
							}}
							wrapped
							size="medium"
							src={resto.restopic || `${BASE_URL}/public/empty-image.png`}
						/>
					</Col>
					<Col width={10}>
						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										<b>Name:</b>
									</Table.HeaderCell>
									<Table.HeaderCell>{resto.name}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell>
										<b>Description:</b>
									</Table.Cell>
									<Table.Cell>{resto.description}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>
										<b>Address:</b>
									</Table.Cell>
									<Table.Cell>{resto.address}</Table.Cell>
								</Table.Row>
							</Table.Body>
							{forApproval ? (
								<Table.Footer fullWidth>
									<Table.Row>
										<Table.HeaderCell colSpan="2">
											<Button
												floated="right"
												icon
												labelPosition="left"
												primary
												size="small"
												onClick={this.props.confirmApprove}
											>
												<Icon name="checkmark" /> Approve
											</Button>
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							) : null}
						</Table>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(UserRestoInfo)
