import React from 'react'
import { connect } from 'dva'
import { Button, Checkbox, Divider, Form, Grid, Input, Modal, TextArea } from 'semantic-ui-react'
import _ from 'lodash'
import ImageUploadComp from '../../components/ImageUploadComp'

import { SemForm, SemFormField } from '../../components/common/form'
import MessageAlert from '../../components/common/MessageAlert'

class UpsertMenu extends React.Component {
	state = {
		showModal: this.props.showUpsertMenuModal || false,
		modalMessage: false,
		modalCategory: false,
	}

	componentDidMount() {
		if (_.isEmpty(this.props.menuCategories)) this.props.getMenuCategory()
		if (_.isEmpty(this.props.tags)) this.props.getAllTags()
	}

	updatePayloadInput = name => {
		return (e, data) => {
			let value = _.isUndefined(data.checked) ? data.value : data.checked
			if (name === 'category' && value === 'Add Category') {
				this.setState({
					modalCategory: true,
				})
			} else if (name === 'menuTags') {
				let hasNew = false
				_.map(value, t => {
					if (
						_.findIndex(this.props.tagRecords, tr => {
							return tr.id === t
						}) === -1
					) {
						hasNew = true
						this.props.dispatch({
							type: 'tag/upsertTag',
							payload: {
								name: t,
							},
							callback: (isSuccess, data) => {
								let menuTags = _.clone(value)
								menuTags.push(data.id)
								let payload = {
									[name]: menuTags,
								}

								this.updatePayload(payload)
								this.props.getAllTags()
							},
						})
					}
				})

				if (!hasNew) {
					let payload = {
						[name]: value,
					}

					this.updatePayload(payload)
				}
			} else {
				let payload = {
					[name]: value,
				}

				this.updatePayload(payload)
			}
		}
	}

	onSelectImage = (imgSrc, fileType) => {
		let payload = {
			menupic: imgSrc,
			menupicFileType: fileType,
		}

		this.updatePayload(payload)
	}

	updatePayload = payload => {
		// const newState = update(this.state, {
		//     activeRecord: {
		//         $merge: payload
		//     }
		// })

		// this.setState(newState)
		this.props.dispatch({
			type: 'menu/updateFormInput',
			payload,
		})
	}

	updateStateInput = name => {
		return (e, data) => {
			let value = data.value
			this.setState({
				[name]: value,
			})
		}
	}

	onTrySubmit = () => {
		console.log('onTrySubmit')
		return true
	}

	onSuccess = () => {
		let finalPayload = _.clone(this.props.activeRecord)
		finalPayload.restoId = this.props.restoId
		finalPayload.category = _.isObject(finalPayload.category)
			? finalPayload.category.id
			: finalPayload.category
		this.props.dispatch({
			type: 'menu/upsertMenu',
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
				message: isSuccess ? 'Menu saved successfully!' : 'Error saving menu!',
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

	onError = err => {
		console.log('onError', err)
	}

	saveMenuChanges = () => {
		this.form.refs.component.submitForm()
	}

	closeModalMessage = () => {
		this.setState(
			{
				modalMessage: false,
			},
			() => {
				this.updatePayload('clear')
				this.props.closeUpsertMenuModal()
				if (this.state.isSuccess) {
					this.props.getMenuListByRestaurant(this.props.restoId)
				}
			}
		)
	}

	cancelUpsertMenu = () => {
		this.updatePayload('clear')
		this.props.closeUpsertMenuModal()
	}

	deleteMenu = () => {
		this.props.dispatch({
			type: 'menu/deleteMenu',
			menuId: this.props.activeRecord.id,
			callback: () => {
				this.updatePayload('clear')
				this.props.closeUpsertMenuModal()
				this.props.getMenuListByRestaurant(this.props.restoId)
			},
		})
	}

	closeModalCategory = () => {
		this.setState({
			modalCategory: false,
		})
	}

	addMenuCategory = () => {
		this.props.addMenuCategory(this.state.newMenuCategory, (isSuccess, mcData) => {
			if (isSuccess) {
				this.setState(
					{
						modalCategory: false,
					},
					() => {
						this.updatePayload({
							category: mcData,
						})
						this.props.getMenuCategory()
					}
				)
			}
		})
	}

	render() {
		const schema = {
			name: 'required',
			description: 'required',
			price: 'required|numeric',
		}
		const attributes = {
			name: 'Name',
			description: 'Description',
			price: 'Price',
		}
		const message = {}

		const Row = Grid.Row
		const Col = Grid.Column
		let { activeRecord, menuCategories, tagRecords } = this.props
		let { newMenuCategory } = this.state
		let menuCategoryOpts = _.map(menuCategories, (mc, mcIx) => {
			return {
				key: mc.id,
				text: mc.name,
				value: mc.id,
			}
		})

		let tagOpts = _.map(tagRecords, (t, tIdx) => {
			return {
				key: t.id,
				text: t.name,
				value: t.id,
			}
		})

		if (_.findIndex(menuCategoryOpts, { key: 'addCategory' }) === -1) {
			menuCategoryOpts.push({
				key: 'addCategory',
				text: ' --- Add Category ---- ',
				value: 'Add Category',
			})
		}

		let menuTagsSelected = _.map(activeRecord.menuTags, mt => {
			if (_.isObject(mt)) {
				return mt.tag
			} else {
				return mt
			}
		})

		return (
			<Modal
				open={this.props.showUpsertMenuModal}
				onClose={this.props.closeUpsertMenuModal}
				centered={false}
				size="small"
				trigger={
					<Button onClick={this.props.openUpsertMenuModal} basic color="blue">
						Add Menu
					</Button>
				}
			>
				<Modal.Header>{activeRecord.id ? `Update` : `Add`} Menu</Modal.Header>
				<Modal.Content>
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
						<Grid>
							<Row>
								<Col width={10}>
									<SemFormField
										as={Input}
										label="Name"
										fluid
										placeholder="Menu Name"
										fieldName="name"
										value={activeRecord.name || ''}
										onChange={this.updatePayloadInput('name')}
										withErrMessage
										errorType="popup"
									/>
									<SemFormField
										as={TextArea}
										label="Description"
										fluid
										placeholder="Menu Description"
										fieldName="description"
										value={activeRecord.description || ''}
										onChange={this.updatePayloadInput('description')}
										withErrMessage
										errorType="popup"
									/>
									<SemFormField
										as={Input}
										label="Price"
										fluid
										placeholder="Menu Price"
										fieldName="price"
										value={activeRecord.price || ''}
										onChange={this.updatePayloadInput('price')}
										withErrMessage
										errorType="popup"
									/>
									<Form.Dropdown
										fluid
										label="Category"
										placeholder="Menu Category"
										search
										selection
										options={menuCategoryOpts}
										value={
											_.isObject(activeRecord.category)
												? activeRecord.category.id
												: activeRecord.category || ''
										}
										onChange={this.updatePayloadInput('category')}
									/>
								</Col>
								<Col width={6} textAlign="center">
									<ImageUploadComp
										imgSrc={activeRecord.menupic}
										onSelectImage={this.onSelectImage}
										imageContHeight={280}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Dropdown
										fluid
										label="Tags"
										placeholder="Menu Tags"
										search
										multiple
										selection
										allowAdditions
										options={tagOpts}
										value={menuTagsSelected || []}
										onChange={this.updatePayloadInput('menuTags')}
									/>
								</Col>
							</Row>

							{activeRecord.id ? (
								<Row>
									<Divider horizontal style={{ color: '#f00' }}>
										Danger
									</Divider>
									<Button
										fluid
										animated="fade"
										negative
										type={'button'}
										onClick={this.deleteMenu}
									>
										<Button.Content visible>
											Delete Menu Permanently
										</Button.Content>
										<Button.Content hidden>
											Are you sure? It cannot be reversed!
										</Button.Content>
									</Button>
								</Row>
							) : null}
						</Grid>
					</SemForm>
					<MessageAlert
						show={this.state.modalMessage}
						title={this.state.title}
						message={this.state.message}
						handleClose={this.closeModalMessage}
					/>
					<Modal
						open={this.state.modalCategory}
						onClose={this.closeModalCategory}
						size="tiny"
						closeIcon
					>
						<Modal.Content>
							{/* <Input type='text' placeholder='Category Name Here' action value={newMenuCategory}
                                onChange={this.updateStateInput('newMenuCategory')}>
                            <input/>
                            <Button type='submit'>Category Name Here</Button>
                        </Input> */}
							<Input
								fluid
								action={{
									color: 'blue',
									labelPosition: 'right',
									icon: 'plus',
									content: 'Add Menu Category',
									onClick: this.addMenuCategory,
								}}
								placeholder="Category Name Here"
								value={newMenuCategory}
								onChange={this.updateStateInput('newMenuCategory')}
							/>
						</Modal.Content>
					</Modal>
				</Modal.Content>
				<Modal.Actions>
					<Checkbox
						checked={_.get(activeRecord, 'available', true)}
						toggle
						style={{ float: 'left' }}
						label="Available"
						onChange={this.updatePayloadInput('available')}
					/>
					<div>
						<Button onClick={this.cancelUpsertMenu} negative>
							Cancel
						</Button>
						<Button onClick={this.saveMenuChanges} primary>
							Save
						</Button>
					</div>
				</Modal.Actions>
			</Modal>
		)
	}
}

function mapStateToProps(state) {
	return {
		activeRecord: state.menu.activeRecord,
		menuCategories: state.menucategory.records,
		tagRecords: state.tag.records,
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
)(UpsertMenu)
