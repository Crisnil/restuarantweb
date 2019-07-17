import React from 'react'
import { connect } from 'dva'
import { Grid, Icon, Image, List, Responsive } from 'semantic-ui-react'
import numeral from 'numeral'
import { BASE_URL } from '../../utils/RestClient'

class MenuListItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedMenu: {},
			orderItems: [],
		}
	}

	render() {
		let emptyMenuImage = `${BASE_URL}/public/empty-image.png`
		let menuPic = this.props.menuItem.menupic || emptyMenuImage

		return (
			<List.Item key={this.props.menuItemIdx} style={{ padding: '1em' }}>
				<Grid as="a" onClick={this.props.onclickSelectedMenu(this.props.menuItem)}>
					<Grid.Column width={6}>
						<div
							className={'ui image'}
							style={{
								backgroundImage: `url(${menuPic})`,
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
							}}
						>
							<Image src={'/assets/empty-image.png'} style={{ opacity: 0 }} />
						</div>
					</Grid.Column>
					<Grid.Column width={10} style={{ textAlign: 'left' }}>
						<Responsive {...Responsive.onlyComputer}>
							<div style={{ float: 'right', margin: '0.5rem' }}>
								<span>₱{numeral(this.props.menuItem.price).format('0,0.00')}</span>
								<Icon name="add square" color={'red'} size={'large'} />
							</div>
						</Responsive>

						<List.Header>{this.props.menuItem.name}</List.Header>
						<List.Description>{this.props.menuItem.description}</List.Description>

						<Responsive {...Responsive.onlyMobile}>
							<div style={{ float: 'right', marginTop: '0.5rem' }}>
								<span>₱{numeral(this.props.menuItem.price).format('0,0.00')}</span>
								<Icon name="add square" color={'red'} size={'large'} />
							</div>
						</Responsive>
					</Grid.Column>
				</Grid>
			</List.Item>
		)
	}
}

function mapStateToProps(state) {
	return {
		order: state.order.activeRecord,
	}
}

export default connect(mapStateToProps)(MenuListItem)
