import React from 'react'
import { connect } from 'dva'
import { Button, Card, Divider, Form, Grid, Header, Icon, Input, TextArea } from 'semantic-ui-react'
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import ImageUploadComp from '../../components/ImageUploadComp'
import { SemForm, SemFormField } from '../common/form'
import MessageAlert from '../common/MessageAlert'

class Register extends React.Component {
	state = {
		openModal: false,
		modalMessage: false,
	}

	openModal = () => {
		this.setState({
			openModal: true,
		})
	}

	closeModal = () => {
		this.setState({
			openModal: false,
		})
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
			type: 'user/updateFormInput',
			payload,
		})
	}

	onSelectImage = (imgSrc, fileType) => {
		let payload = {
			restopic: imgSrc,
			restopicFileType: fileType,
		}

		this.updatePayload(payload)
	}

	onTrySubmit = () => {
		console.log('onTrySubmit')
		return true
	}

	onSuccess = () => {
		let finalPayload = _.clone(this.props.activeRecord)
		//console.log("finalPayload",finalPayload);
		this.props.dispatch({
			type: 'user/upsertApplicant',
			payload: finalPayload,
			callback: this.onUpsert,
		})
	}

	onUpsert = isSuccess => {
		this.setState(
			{
				modalMessage: true,
				isSuccess,
				title: isSuccess ? 'Success' : 'Error',
				message: isSuccess
					? 'Application submitted successfully!'
					: 'Error submitting application!',
			},
			() => {
				setTimeout(() => {
					if (this.state.modalMessage) {
						this.closeModalMessage()
					}
				}, 5000)
			}
		)
	}

	closeModalMessage = () => {
		this.setState(
			{
				modalMessage: false,
			},
			() => {
				this.updatePayload('clear')
				if (this.state.isSuccess) {
					this.props.dispatch(routerRedux.push('/login'))
				}
			}
		)
	}

	onError = err => {
		console.log('onError', err)
	}

	render() {
		const schema = {
			fullName: 'required',
			emailAddress: 'required|email',
			password: 'required',
			restoName: 'required',
		}
		const attributes = {
			fullName: 'Full Name',
			emailAddress: 'Email',
			restoName: 'Restaurant Name',
		}
		const message = {}

		let { activeRecord } = this.props

		let passwordError = false
		if (activeRecord.password && activeRecord.confirmpassword) {
			passwordError = activeRecord.password === activeRecord.confirmpassword ? false : true
		}

		const Col = Grid.Column
		const Row = Grid.Row
		return (
			<Grid stackable columns={1} centered>
				<Col width={15} style={{ paddingTop: '5%' }}>
					<Card raised fluid>
						<Card.Content>
							<Header as="h2" icon textAlign="center">
								<Icon name="signup" circular />
								<Header.Content>Sign Up</Header.Content>
							</Header>
							<Divider />
							<SemForm
								source={activeRecord}
								schema={schema}
								attributeNames={attributes}
								customMessage={message}
								onTrySubmit={this.onTrySubmit}
								onSuccess={this.onSuccess}
								onError={this.onError}
								style={{ padding: 10 }}
							>
								<Grid columns={3} stackable>
									<Col style={{ borderRight: '1px solid rgba(34,36,38,.15)' }}>
										<Header as="h3" dividing>
											Users Information
										</Header>
										<SemFormField
											as={Input}
											label="Full Name"
											fluid
											placeholder="First M. Last"
											fieldName="fullName"
											value={activeRecord.fullName || ''}
											onChange={this.updateInput('fullName')}
										/>
										<SemFormField
											as={Input}
											label="Email"
											fluid
											placeholder="Email"
											fieldName="emailAddress"
											value={activeRecord.emailAddress || ''}
											onChange={this.updateInput('emailAddress')}
											type="email"
										/>
										<SemFormField
											as={Input}
											label="Password"
											fluid
											placeholder="Password"
											fieldName="password"
											value={activeRecord.password || ''}
											onChange={this.updateInput('password')}
											type="password"
										/>
										<SemFormField
											fieldName="confirmpassword"
											customControl={
												<Form.Field
													control={Input}
													fluid
													label="Confirm your password"
													placeholder="Confirm Password"
													type="password"
													onChange={this.updateInput('confirmpassword')}
													error={passwordError}
													value={activeRecord.confirmpassword || ''}
												/>
											}
										/>
									</Col>
									<Col>
										<Header as="h3" dividing>
											Restaurant's Information
										</Header>
										<Grid columns={1} stackable>
											<Col>
												<SemFormField
													as={Input}
													label="Name"
													fluid
													placeholder="Name"
													fieldName="restoName"
													value={activeRecord.restoName || ''}
													onChange={this.updateInput('restoName')}
												/>
												<SemFormField
													as={TextArea}
													label="Description"
													fluid
													placeholder="Description"
													fieldName="restoDescription"
													value={activeRecord.restoDescription || ''}
													onChange={this.updateInput('restoDescription')}
												/>
												<SemFormField
													as={TextArea}
													label="Address"
													fluid
													placeholder="Address"
													fieldName="restoAddress"
													value={activeRecord.restoAddress || ''}
													onChange={this.updateInput('restoAddress')}
												/>
											</Col>
											<Col>
												<Form.Group widths="equal">
													<SemFormField
														as={Input}
														label="Tel No"
														fluid
														placeholder="Tel No"
														fieldName="restoTelNo"
														value={activeRecord.restoTelNo || ''}
														onChange={this.updateInput('restoTelNo')}
														type="tel"
													/>
												</Form.Group>
												<Form.Group widths="equal">
													<SemFormField
														as={Input}
														label="Style"
														fluid
														placeholder="Style/Cuisine"
														fieldName="restoStyle"
														value={activeRecord.restoStyle || ''}
														onChange={this.updateInput('restoStyle')}
													/>
													<SemFormField
														as={Input}
														label="Open Hours"
														fluid
														placeholder="Open Hours"
														fieldName="restoOpenHours"
														value={activeRecord.restoOpenHours || ''}
														onChange={this.updateInput(
															'restoOpenHours'
														)}
													/>
												</Form.Group>
												<Form.Group widths="equal">
													<SemFormField
														as={Input}
														label="Bank"
														fluid
														placeholder="e.g BDO or BPI"
														fieldName="bank"
														value={activeRecord.bank || ''}
														onChange={this.updateInput('bank')}
													/>
													<SemFormField
														as={Input}
														label="Account Number"
														fluid
														placeholder="#xxxxxxxxxx"
														fieldName="bankAccount"
														value={activeRecord.bankAccount || ''}
														onChange={this.updateInput('bankAccount')}
													/>
												</Form.Group>
											</Col>
										</Grid>
									</Col>
									<Col textAlign="center">
										<ImageUploadComp
											imgSrc={activeRecord.restopic}
											onSelectImage={this.onSelectImage}
										/>
									</Col>
								</Grid>
								<Grid>
									<Row>
										<Col>
											<Divider section />
											<Form.Field control={Button} fluid type="submit">
												Register
											</Form.Field>
										</Col>
									</Row>
								</Grid>
							</SemForm>
						</Card.Content>
					</Card>
				</Col>
				<MessageAlert
					show={this.state.modalMessage}
					title={this.state.title}
					message={this.state.message}
					handleClose={this.closeModalMessage}
				/>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		activeRecord: state.user.activeRecord,
	}
}

export default connect(mapStateToProps)(Register)
