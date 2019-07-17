import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { Button, Dropdown, Grid, Input, Loader, Message, Modal } from 'semantic-ui-react'
import { BASE_URL } from '../../utils/RestClient'
import UpsertMenu from './UpsertMenu'
import MenuListItem from './MenuListItem'

class MenuList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			showUpsertMenuModal: false,
			menuCategories: [],
			filterMenuCategory: '',
			filterSearchText: '',
			loading: false,
		}

		this.getMenuListByRestaurant = _.debounce(this.getMenuListByRestaurant, 500)
	}

	componentDidMount() {
		this.getMenuCategory()
		this.getAllTags()
	}

	componentWillUnmount() {
		this.unmount = true
	}

	getMenuCategory = () => {
		this.props.dispatch({
			type: 'menucategory/getMenuCategoriesByRestaurant',
			restaurantId: this.props.id,
		})
	}

	getAllTags = () => {
		this.props.dispatch({
			type: 'tag/getAllTags',
		})
	}

	addMenuCategory = (newMenuCategory, callback) => {
		this.props.dispatch({
			type: 'menucategory/upsertMenuCategory',
			payload: {
				name: newMenuCategory,
				restaurant: this.props.id,
			},
			callback,
		})
	}

	openModal = name => {
		return () => {
			if (this.unmount) return
			this.setState(
				{
					[name]: true,
				},
				() => {
					this.getMenuListByRestaurant(this.props.id)
				}
			)
		}
	}

	closeModal = name => {
		return () => {
			if (this.unmount) return
			this.setState(
				{
					[name]: false,
					filterMenuCategory: '',
					filterSearchText: '',
				},
				() => {
					if (name !== 'showUpsertMenuModal') {
						this.props.dispatch({
							type: 'menucategory/getMenuCategoriesByRestaurantSuccess',
							payload: [],
						})

						this.props.dispatch({
							type: 'menu/getMenuSuccess',
							payload: [],
						})
					}
				}
			)
		}
	}

	getMenuListByRestaurant = (restoId = this.props.id) => {
		this.setState(
			{
				loading: true,
			},
			() => {
				this.props.dispatch({
					type: 'menu/getMenuByRestaurant',
					payload: {
						restoId,
						filtermenucategory: this.state.filterMenuCategory,
						filtermenu: this.state.filterSearchText,
					},
					callback: isSuccess => {
						this.setState({
							loading: false,
						})
					},
				})
			}
		)
	}

	updateState = name => {
		return (e, data) => {
			this.setState(
				{
					[name]: data.value,
				},
				() => {
					this.getMenuListByRestaurant()
				}
			)
		}
	}

	clearFilters = () => {
		this.setState(
			{
				filterMenuCategory: '',
				filterSearchText: '',
			},
			() => {
				this.getMenuListByRestaurant()
			}
		)
	}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		let emptyMenuImage = `${BASE_URL}/public/empty-image.png`
		let menuList = _.map(this.props.menuList, m => {
			m.menupic = m.menupic || emptyMenuImage
			return m
		})

		// let menuListSample = [
		//     {
		//         id: 1,
		//         name: 'Sample 1',
		//         description: 'Menu Description Here. . .',
		//         price: '300',
		//         menuImage: menuImageSample
		//     },
		//     {
		//         id: 2,
		//         name: 'Sample 2',
		//         description: 'Menu Description 2 Here. . .',
		//         price: '250',
		//         menuImage: menuImageSample
		//     },
		//     {
		//         id: 3,
		//         name: 'Sample 3',
		//         description: 'Menu Description 3 Here. . .',
		//         price: '100',
		//         menuImage: menuImageSample
		//     }
		// ]
		let menuCategoryOpts = _.map(this.props.menuCategories, (mc, mcIx) => {
			return {
				key: mc.id,
				text: mc.name,
				value: mc.id,
			}
		})

		return (
			<Modal
				open={this.state.showModal}
				onClose={this.closeModal('showModal')}
				size="fullscreen"
				trigger={
					<Button basic color="blue" onClick={this.openModal('showModal')}>
						View Menu
					</Button>
				}
				centered={false}
			>
				<Modal.Header>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>Menu List</div>
						<div style={{ fontSize: 14, display: 'flex' }}>
							<div>
								<Dropdown
									placeholder="Menu Category"
									search
									selection
									options={menuCategoryOpts}
									value={this.state.filterMenuCategory}
									onChange={this.updateState('filterMenuCategory')}
								/>
							</div>
							<div style={{ paddingLeft: 20 }}>
								<Input
									icon="search"
									placeholder="Search..."
									value={this.state.filterSearchText}
									onChange={this.updateState('filterSearchText')}
								/>
							</div>
							<div style={{ paddingLeft: 20 }}>
								<Button
									basic
									color="orange"
									disabled={
										!(
											this.state.filterMenuCategory ||
											this.state.filterSearchText
										)
									}
									onClick={this.clearFilters}
								>
									Clear Filters
								</Button>
							</div>
						</div>
					</div>
				</Modal.Header>
				<Modal.Content scrolling>
					<Grid stackable>
						<Row columns={_.isEmpty(menuList) ? '1' : '5'}>
							{this.state.loading ? <Loader active size="massive" /> : null}
							{_.isEmpty(menuList) ? (
								<Col textAlign="center">
									<Message
										error
										header="Menu is empty for this restaurant"
										content={`You can add one by clicking the 'Add Menu' button bellow`}
									/>
								</Col>
							) : (
								_.map(menuList, (ml, idx) => {
									return (
										<Col style={{ padding: 10 }} key={ml.id}>
											<MenuListItem
												dispatch={this.props.dispatch}
												openUpsertMenuModal={this.openModal(
													'showUpsertMenuModal'
												)}
												menuData={ml}
											/>
										</Col>
									)
								})
							)}
						</Row>
					</Grid>
				</Modal.Content>
				<Modal.Actions>
					<div>
						<Button onClick={this.closeModal('showModal')} basic color="red">
							Close
						</Button>
						<UpsertMenu
							showUpsertMenuModal={this.state.showUpsertMenuModal}
							restoId={this.props.id}
							getMenuListByRestaurant={this.getMenuListByRestaurant}
							openUpsertMenuModal={this.openModal('showUpsertMenuModal')}
							closeUpsertMenuModal={this.closeModal('showUpsertMenuModal')}
							getMenuCategory={this.getMenuCategory}
							addMenuCategory={this.addMenuCategory}
							getAllTags={this.getAllTags}
							{...this.props}
						/>
					</div>
				</Modal.Actions>
			</Modal>
		)
	}
}

function mapStateToProps(state) {
	return {
		menuList: state.menu.records,
		menuCategories: state.menucategory.records,
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
)(MenuList)
