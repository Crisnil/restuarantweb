import React from 'react'
import { connect } from 'dva'
import { Button, Form, Grid, Header, Input, Message, Modal, TextArea } from 'semantic-ui-react'
import _ from 'lodash'

import ImageUploadComp from '../../components/ImageUploadComp'
import { SemForm, SemFormField } from '../../components/common/form'
import MessageAlert from '../../components/common/MessageAlert'

class UpsertRestaurant extends React.Component {
	state = {
		showModal: false,
		isSuccess: false,
	}

	openModal = () => {
		this.setState(
			{
				showModal: true,
			},
			() => {
				this.updatePayload(this.props.restoInfo)
			}
		)
	}

	closeModal = () => {
		console.log('close Modal')
		this.setState(
			{
				showModal: false,
			},
			() => {
				this.updatePayload('clear')
			}
		)
	}

	updateStateVal = (name, value) => {
		let payload = {
			[name]: value,
		}

		this.updatePayload(payload)
	}

	updateStateInput = name => {
		return e => {
			let payload = {
				[name]: e.target.value,
			}

			this.updatePayload(payload)
		}
	}

	onSelectImage = (imgSrc, fileType) => {
		let payload = {
			restopic: imgSrc,
			restopicFileType: fileType,
		}

		this.updatePayload(payload)
	}

	updatePayload = payload => {
		this.props.dispatch({
			type: 'restaurant/updateFormInput',
			payload,
		})
	}

	onTrySubmit = () => {
		console.log('onTrySubmit')
		return true
	}

	onSuccess = () => {
		let finalPayload = _.clone(this.props.activeRecord)
		finalPayload.restoId = this.props.restoId
		this.props.dispatch({
			type: 'restaurant/upsertRestaurant',
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
				message: isSuccess ? 'Restaurant saved successfully!' : 'Error saving restaurant!',
			},
			() => {
				this.props.getRestaurantList()
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
				this.closeModal()
				if (this.state.isSuccess) {
					// this.props.getMenuListByRestaurant(this.props.restoId)
				}
			}
		)
	}

	onError = err => {
		console.log('onError', err)
	}

	saveRestaurantChanges = () => {
		this.form.refs.component.submitForm()
	}

	render() {
		const schema = {
			name: 'required',
			description: 'required',
		}
		const attributes = {
			name: 'Name',
			description: 'Description',
		}
		const message = {}

		const Row = Grid.Row
		const Col = Grid.Column

		let activeRecord = this.props.activeRecord
		console.log('activeRecord', activeRecord)
		return (
			<Modal
				open={this.state.showModal}
				onClose={this.closeModal}
				trigger={
					<Button basic color="red" onClick={this.openModal}>
						Edit
					</Button>
				}
			>
				<Modal.Header>Edit Restaurant Info</Modal.Header>
				<Modal.Content scrolling>
					<SemForm
						ref={ref => (this.form = ref)}
						source={activeRecord}
						schema={schema}
						attributeNames={attributes}
						customMessage={message}
						onTrySubmit={this.onTrySubmit}
						onSuccess={this.onSuccess}
						onError={this.onError}
						style={{ padding: 10 }}
					>
						<Grid stackable>
							<Row>
								<Col width={8}>
									<SemFormField
										as={Input}
										label="Name"
										fluid
										placeholder="Name"
										fieldName="name"
										value={activeRecord.name || ''}
										onChange={this.updateStateInput('name')}
										withErrMessage
										errorType="popup"
									/>
									<SemFormField
										as={TextArea}
										label="Description"
										fluid
										placeholder="Description"
										fieldName="description"
										value={activeRecord.description || ''}
										onChange={this.updateStateInput('description')}
										withErrMessage
										errorType="popup"
									/>
									<SemFormField
										as={TextArea}
										label="Address"
										fluid
										placeholder="Address"
										fieldName="address"
										value={activeRecord.address || ''}
										onChange={this.updateStateInput('address')}
										withErrMessage
										errorType="popup"
									/>
									<Header as="h5">Owner</Header>
									<Message visible>
										{!_.isEmpty(activeRecord.owner)
											? activeRecord.owner.fullName
											: ''}
									</Message>
									{/* <SemFormField
                                        as={Input}
                                        label="Owner"
                                        fluid
                                        placeholder="Owner"
                                        fieldName="owner"
                                        disabled
                                        value={!_.isEmpty(activeRecord.owner) ? activeRecord.owner.fullName : ''}
                                        onChange={this.updateStateInput('owner')}
                                        withErrMessage
                                        errorType="popup"
                                    /> */}
									{/* <SemFormField
                                        as={Select}
                                        label="Owner"
                                        fluid
                                        placeholder="Owner"
                                        fieldName="owner"
                                        value={activeRecord.owner || ''}
                                        onChange={this.updateStateInput('owner')}
                                        withErrMessage
                                        errorType="popup"
                                    /> */}
								</Col>
								<Col width={8} textAlign="center">
									<ImageUploadComp
										imgSrc={activeRecord.restopic}
										onSelectImage={this.onSelectImage}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group widths="equal">
										<SemFormField
											as={Input}
											label="Tel No"
											fluid
											placeholder="Tel No"
											fieldName="tel_no"
											type="tel"
											value={activeRecord.tel_no || ''}
											onChange={this.updateStateInput('tel_no')}
											withErrMessage
											errorType="popup"
										/>
										<SemFormField
											as={Input}
											label="Email"
											fluid
											placeholder="Email"
											fieldName="email"
											type="email"
											value={activeRecord.email || ''}
											onChange={this.updateStateInput('email')}
											withErrMessage
											errorType="popup"
										/>
									</Form.Group>
									<Form.Group widths="equal">
										<SemFormField
											as={Input}
											label="Style"
											fluid
											placeholder="Style/Cuisine"
											fieldName="cuisine"
											value={activeRecord.cuisine || ''}
											onChange={this.updateStateInput('cuisine')}
											withErrMessage
											errorType="popup"
										/>
										<SemFormField
											as={Input}
											label="Open Hours"
											fluid
											placeholder="Open Hours"
											fieldName="open_hours"
											value={activeRecord.open_hours || ''}
											onChange={this.updateStateInput('open_hours')}
											withErrMessage
											errorType="popup"
										/>
									</Form.Group>
								</Col>
							</Row>
						</Grid>
					</SemForm>
					<MessageAlert
						show={this.state.modalMessage}
						title={this.state.title}
						message={this.state.message}
						handleClose={this.closeModalMessage}
					/>
				</Modal.Content>
				<Modal.Actions>
					<div>
						<Button onClick={this.closeModal} negative>
							Cancel
						</Button>
						<Button onClick={this.saveRestaurantChanges} primary>
							Submit
						</Button>
					</div>
				</Modal.Actions>
			</Modal>
		)
	}
}

function mapStateToProps(state) {
	return {
		activeRecord: state.restaurant.activeRecord,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// : bindActionCreators(, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpsertRestaurant)
