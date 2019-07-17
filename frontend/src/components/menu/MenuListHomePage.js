import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { Button, Card, Grid, Header, Image, Label } from 'semantic-ui-react'
import { BASE_URL } from '../../utils/RestClient'
import numeral from 'numeral'

class MenuListHomePage extends React.Component {
	orderMenu = () => {}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		let emptyMenuImage = `${BASE_URL}/public/empty-image.png`
		let menuList = _.map(this.props.menu.records, m => {
			m.menupic = m.menupic || emptyMenuImage
			return m
		})

		return _.isEmpty(menuList) ? null : (
			<Grid stackable style={{ width: '100%' }}>
				<Header as="h3" style={{ fontSize: '2em', width: '100%' }}>
					Menus
				</Header>
				<Row columns={'5'}>
					{_.map(menuList, (item, idx) => {
						return (
							<Col style={{ padding: 10 }} key={idx}>
								<Card fluid>
									<div
										className={'ui image'}
										style={{
											backgroundImage: `url(${item.menupic})`,
											backgroundPosition: 'center',
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'cover',
										}}
									>
										<Label as="a" color="blue" ribbon="right">
											₱{numeral(item.price || null).format('0,0.00')}
										</Label>
										<Image
											src={'/assets/empty-image.png'}
											style={{ opacity: 0 }}
										/>
									</div>
									<Card.Content>
										<Card.Header>{item.name || ' -- '}</Card.Header>
										<Card.Meta>
											{!_.isEmpty(item.category)
												? item.category.name
												: ' -- '}
										</Card.Meta>
										<Card.Description>
											{_.truncate(item.description)}
										</Card.Description>
									</Card.Content>
									<Card.Content extra style={{ textAlign: 'center' }}>
										<Button fluid basic color="teal" onClick={this.orderMenu}>
											Order
										</Button>
									</Card.Content>
								</Card>
							</Col>
						)
					})}
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		menu: state.menu,
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
)(MenuListHomePage)
