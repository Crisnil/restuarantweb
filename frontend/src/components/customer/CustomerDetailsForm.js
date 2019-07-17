import React from 'react'
import { connect } from 'dva'
import {Button, Grid, Header, Icon, Input, Segment} from 'semantic-ui-react'
import { SemForm, SemFormField } from '../common/form'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react'
import _ from 'lodash'
import moment from 'moment'

class CustomerDetailsForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			orderItems: [],
			showPersonalDetailsSection: false,
			showPaymentOptions: false,
		}
	}

	componentDidMount() {
		this.updateInput('date')(null, { value: moment(new Date()).format('dddd, MMMM DD') })
		this.updateInput('time')(null, { value: moment(new Date()).format('hh:mm A') })
	}

	updateInput = name => {
		return (e, data) => {
			let value = data.value

			let payload = {
				[name]: value,
				// [errorField]: errorFieldVal
			}

			this.updatePayload(payload)
		}
	}

	updatePayload = payload => {
		this.props.dispatch({
			type: 'order/updateFormInput',
			payload,
		})
	}

	onTrySubmit = (e) => {
		console.log(e)
		return true
	}

	onSuccess = total => {
		return () => {
			let finalPayload = _.clone(this.props.activeRecord)
			console.log("resto",this.props.menu);
			finalPayload.restaurant = this.props.menu.name
			finalPayload.ownerMail = this.props.menu.ownerMail
			finalPayload.restaurantId = this.props.menu.id
			this.props.dispatch({
				type: 'order/upsertOrder',
				payload: finalPayload,
				callback: this.afterSuccessPost,
			})
		}
	}

	afterSuccessPost = () => {
		let payload = {}
		payload.orders = _.clone(this.state.orderItems)
		this.props.dispatch({
			type: 'order/setOrderActiveRecord',
			payload: payload,
			callback: this.props.onClose,
		})
	}

	render() {
		const schema = {
			date: 'required',
			time: 'required',
			address: 'required',
			houseNo: 'required',
			emailAddress: 'required|email',
			firstName: 'required',
			lastName: 'required',
			mobileNumber: 'required',
		}
		const attributes = {
			date: 'date',
			time: 'time',
			address: 'address',
			houseNo: 'houseNo',
			emailAddress: 'emailAddress',
			firstName: 'firstName',
			lastName: 'lastName',
			mobileNumber: 'mobileNumber',
		}
		const message = {}

		let { activeRecord } = this.props
		return (
			<SemForm
				source={activeRecord}
				schema={schema}
				attributeNames={attributes}
				customMessage={message}
				onTrySubmit={this.onTrySubmit}
				onSuccess={this.onSuccess}
				onError={this.onError}
			>
				<Grid style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)', margin: '24px 0' }}>
					<Grid.Row>
						<Grid.Column>
							<Header as="h3">
								<span
									style={{
										color: '#fff',
										backgroundColor: '#1b1c1d',
										height: 32,
										width: 32,
										textAlign: 'center',
										lineHeight: '32px',
										fontSize: 16,
										display: 'inline-block',
									}}
								>
									1
								</span>
								<span
									style={{
										verticalAlign: 'middle',
										marginLeft: 16,
										fontSize: '1.5rem',
									}}
								>
									Delivery Details
								</span>
							</Header>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={16}>
							<span>Delivery time</span>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ padding: 0 }}>
						<Grid.Column width={8}>
							<SemFormField
								as={DateInput}
								fieldName="date"
								placeholder="Date"
								value={activeRecord.date}
								minDate={moment(new Date()).format('dddd, MMMM DD')}
								maxDate={moment(new Date())
									.add(2, 'days')
									.format('dddd, MMMM DD')}
								dateFormat={'dddd, MMMM DD'}
								closeOnMouseLeave={false}
								iconPosition="left"
								onChange={this.updateInput('date')}
							/>
						</Grid.Column>
						<Grid.Column width={8}>
							<SemFormField
								as={TimeInput}
								fieldName="time"
								placeholder="Time"
								value={activeRecord.time}
								timeFormat={'AMPM'}
								closeOnMouseLeave={false}
								iconPosition="left"
								onChange={this.updateInput('time')}
							/>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={16}>
							<span>Delivery address</span>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ padding: 0 }}>
						<Grid.Column width={16}>
							<SemFormField
								as={Input}
								fluid
								placeholder="Address"
								fieldName="address"
								value={activeRecord.address || ''}
								onChange={this.updateInput('address')}
								type="text"
							/>
							<SemFormField
								as={Input}
								fluid
								placeholder="House number/Building name"
								fieldName="houseNo"
								value={activeRecord.houseNo || ''}
								onChange={this.updateInput('houseNo')}
								type="text"
							/>
							<SemFormField
								as={Input}
								fluid
								placeholder="(Optional) Floor/Unit/Room #"
								fieldName="roomNo"
								value={activeRecord.roomNo || ''}
								onChange={this.updateInput('roomNo')}
								type="text"
							/>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={16}>
							<span>Special note</span>
							<em style={{ fontSize: '1rem', fontWeight: 300 }}> (Optional)</em>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ paddingTop: 0 }}>
						<Grid.Column width={16}>
							<SemFormField
								as={Input}
								fluid
								placeholder="(Optional) Do you require change or have any special delivery instruction for us?"
								fieldName="specialNote"
								value={activeRecord.specialNote || ''}
								onChange={this.updateInput('specialNote')}
								type="textarea"
							/>
						</Grid.Column>
					</Grid.Row>
					{activeRecord.date &&
					activeRecord.time &&
					activeRecord.address &&
					activeRecord.houseNo &&
					!this.state.showPersonalDetailsSection ? (
						<Grid.Row>
							<Grid.Column width={16}>
								<Button
									primary
									fluid
									type={'button'}
									onClick={() =>
										this.setState({ showPersonalDetailsSection: true }, () => {
											window.scrollTo(0, document.body.scrollHeight)
										})
									}
								>
									PROCEED
								</Button>
							</Grid.Column>
						</Grid.Row>
					) : null}
				</Grid>

				{this.state.showPersonalDetailsSection ? (
					<Grid style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)', margin: '24px 0' }}>
						<Grid.Row>
							<Grid.Column>
								<Header as="h3">
									<span
										style={{
											color: '#fff',
											backgroundColor: '#1b1c1d',
											height: 32,
											width: 32,
											textAlign: 'center',
											lineHeight: '32px',
											fontSize: 16,
											display: 'inline-block',
										}}
									>
										2
									</span>
									<span
										style={{
											verticalAlign: 'middle',
											marginLeft: 16,
											fontSize: '1.5rem',
										}}
									>
										Personal Details
									</span>
								</Header>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column width={16}>
								<span>Email</span>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ padding: 0 }}>
							<Grid.Column width={16}>
								<SemFormField
									as={Input}
									fluid
									placeholder="Email"
									fieldName="emailAddress"
									value={activeRecord.emailAddress || ''}
									onChange={this.updateInput('emailAddress')}
									type="email"
								/>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column width={16}>
								<span>Full name</span>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ padding: 0 }}>
							<Grid.Column width={8}>
								<SemFormField
									as={Input}
									fluid
									placeholder="First name"
									fieldName="firstName"
									value={activeRecord.firstName || ''}
									onChange={this.updateInput('firstName')}
									type="text"
								/>
							</Grid.Column>
							<Grid.Column width={8}>
								<SemFormField
									as={Input}
									fluid
									placeholder="Last name"
									fieldName="lastName"
									value={activeRecord.lastName || ''}
									onChange={this.updateInput('lastName')}
									type="text"
								/>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column width={16}>
								<span>Mobile number</span>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ paddingTop: 0 }}>
							<Grid.Column width={16}>
								<SemFormField
									as={Input}
									fluid
									label="+63"
									placeholder="Mobile number: e.g +639876543212"
									fieldName="mobileNumber"
									value={activeRecord.mobileNumber || ''}
									onChange={this.updateInput('mobileNumber')}
									type="text"
								/>
							</Grid.Column>
						</Grid.Row>

						{activeRecord.emailAddress &&
						activeRecord.firstName &&
						activeRecord.lastName &&
						activeRecord.mobileNumber &&
						!this.state.showPaymentOptions ? (
							<Grid.Row>
								<Grid.Column width={16}>
									<Button
										primary
										fluid
										type={'button'}
										onClick={() =>
											this.setState({ showPaymentOptions: true }, () => {
												window.scrollTo(0, document.body.scrollHeight)
											})
										}
									>
										PROCEED
									</Button>
								</Grid.Column>
							</Grid.Row>
						) : null}
					</Grid>
				) : null}

				{this.state.showPaymentOptions ? (
					<Grid style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)', margin: '24px 0' }}>
						<Grid.Row>
							<Grid.Column>
								<Header as="h3">
									<span
										style={{
											color: '#fff',
											backgroundColor: '#1b1c1d',
											height: 32,
											width: 32,
											textAlign: 'center',
											lineHeight: '32px',
											fontSize: 16,
											display: 'inline-block',
										}}
									>
										3
									</span>
									<span
										style={{
											verticalAlign: 'middle',
											marginLeft: 16,
											fontSize: '1.5rem',
										}}
									>
										Payment
									</span>
								</Header>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
								<Segment.Group horizontal>
									<Segment inverted color='blue'><Icon name='check' />Cash on Delivery</Segment>
									<Segment>Paypal</Segment>
									<Segment>Bank Transfer</Segment>
								</Segment.Group>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column width={16}>
								<span>Cash on Delivery</span>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ paddingTop: 0 }}>
							<Grid.Column width={16}>
								<span>
									Simply pay the driver, when he delivers the food to your
									doorstep.
								</span>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column>
								<Button primary fluid onClick={this.onSuccess()}>
									FINISH AND PAY
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				) : null}

				{/*				<Button primary type={'button'} onClick={this.onSuccess(total)}>
					Proceed <Icon name="chevron right" />
				</Button>*/}
			</SemForm>
		)
	}
}

function mapStateToProps(state) {
	return {
		activeRecord: state.order.activeRecord,
		menu: state.menu.activeRecord,
	}
}

export default connect(mapStateToProps)(CustomerDetailsForm)
