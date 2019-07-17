import React from 'react'
import { connect } from 'dva'
import { Grid, Menu, Tab } from 'semantic-ui-react'
import _ from 'lodash'
import UserList from './user/UserList'

import MessageAlert from '../components/common/MessageAlert'

class AdminUsers extends React.Component {
	state = {
		activeIndex: 0,
		loading: false,
		tabs: ['For Registration', 'Active', 'All'],
		userList: [],
		confirmOpen: false,
		modalOpen: false,
	}

	componentDidMount() {
		this.getUserListData()
	}

	handleTabChange = (e, props) => {
		const { activeIndex } = props
		this.setState(
			{
				activeIndex,
			},
			() => {
				this.getUserListData()
			}
		)
	}

	getUserListData = () => {
		//get here
		// let url = '/api/user'
		// if (this.state.activeIndex === 0){
		//     url = '/api/applicant'
		// }
		// this.setState({
		//     loading: true
		// }, () => {
		//     get(url).then(response => {
		//         this.setState({
		//             loading: false,
		//             userList: response.data
		//         })
		//     }).catch(err => {
		//         console.log("error at getUserListData", err);
		//         this.setState({
		//             loading: false,
		//             userList: []
		//         })
		//     })
		// })

		let getUserAction = this.state.activeIndex === 0 ? 'getApplicants' : 'getUsers'
		this.props.dispatch({
			type: `user/${getUserAction}`,
		})
	}

	approveApplicant = id => {
		this.props.dispatch({
			type: 'user/approveApplicant',
			id: id,
			callback: isApproved => {
				this.setState(
					{
						openModal: true,
						title: isApproved ? 'Success' : 'Error',
						message: isApproved
							? 'Applicant has been approved!'
							: 'Error approving applicant!',
					},
					() => {
						if (isApproved) {
							this.getUserListData()
						}
						setTimeout(() => {
							this.setState({
								openModal: false,
							})
						}, 5000)
					}
				)
			},
		})
	}

	closeModal = () => {
		this.setState({
			openModal: false,
		})
	}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		const { tabs, activeIndex, loading } = this.state
		const panes = _.map(tabs, (tab, idx) => {
			let forConfirmation = tab === 'For Registration' ? true : false
			return {
				// menuItem: <Menu.Item key={`messages${idx}`}>{tab}<Label>{this.props.users.length}</Label></Menu.Item>,
				menuItem: <Menu.Item key={`messages${idx}`}>{tab}</Menu.Item>,
				render: () => (
					<Tab.Pane loading={loading}>
						<UserList
							userList={this.props.users}
							forConfirmation={forConfirmation}
							approveApplicant={this.approveApplicant}
						/>
					</Tab.Pane>
				),
			}
		})

		return (
			<Grid stackable>
				<Row>
					<Col>
						<Tab
							panes={panes}
							activeIndex={activeIndex}
							onTabChange={this.handleTabChange}
						/>
						<MessageAlert
							show={this.state.openModal}
							title={this.state.title}
							message={this.state.message}
							handleClose={this.closeModal}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		users: state.user.records,
	}
}

export default connect(mapStateToProps)(AdminUsers)
