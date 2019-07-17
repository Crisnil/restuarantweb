import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import RestaurantList from '../components/restaurant/RestaurantList'
import MenuListHomepage from '../components/menu/MenuListHomePage'
import Footer from '../components/common/Footer'
import HomepageHeading from '../components/common/HomepageHeading'

import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'

class HomePage extends React.Component {
	componentDidMount() {
		this.getFeaturedRestaurants()
	}

	getFeaturedRestaurants = () => {
		this.props.dispatch({
			type: `restaurant/getFeaturedRestaurants`,
		})
	}

	getRestaurantsByTag = tag => {
		this.props.dispatch({
			type: `restaurant/getRestaurantsByTag`,
			payload: {
				tag,
			},
		})
	}

	getMenuByName = filter => {
		this.props.dispatch({
			type: 'menu/getMenuByName',
			payload: {
				filtermenu: filter,
			},
		})
	}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column

		return (
			<div>
				<HomepageHeading
					children={PropTypes.node}
					getRestaurantsByTag={this.getRestaurantsByTag}
					getMenuByName={this.getMenuByName}
				/>
				<Grid container style={{ padding: '4em 0em' }}>
					<RestaurantList />
					<MenuListHomepage />
				</Grid>
				<Segment style={{ padding: '4em 0em' }} vertical>
					<Grid container stackable verticalAlign="middle">
						<Row>
							<Col width={8}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									We Help Companies and Companions
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									We can give your company superpowers to do things that they
									never thought possible. Let us delight your customers and
									empower your needs... through pure data analytics.
								</p>
								<Header as="h3" style={{ fontSize: '2em' }}>
									We Make Bananas That Can Dance
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									"Yes that's right, you thought it was the stuff of dreams, but
									even bananas can be bioengineered"
								</p>
							</Col>
							<Col floated="right" width={6}>
								<Image
									bordered
									rounded
									size="large"
									src="http://static.asiawebdirect.com/m/kl/portals/kuala-lumpur-ws/homepage/magazine/melur-thyme/allParagraphs/BucketComponent/ListingContainer/202/BucketList/0/image2/melur-and-thyme-chicken-wings-satay.jpg"
								/>
							</Col>
						</Row>
						<Row>
							<Col textAlign="center">
								<Button size="huge">Join Us</Button>
							</Col>
						</Row>
					</Grid>
				</Segment>
				<Segment inverted vertical style={{ padding: '0em' }}>
					<Grid celled="internally" columns="equal" stackable>
						<Row textAlign="center">
							<Col style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								<Header inverted as="h3" style={{ fontSize: '2em' }}>
									"What a Company"
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									That is what they all say about us
								</p>
							</Col>
							<Col style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								<Header inverted as="h3" style={{ fontSize: '2em' }}>
									"I shouldn't have gone with their competitor."
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									<Image
										avatar
										src="http://www.summertomato.com/wp-content/themes/grainandmortar/images/darya2.png"
									/>
									<b>Nan</b> Chief Fun Officer Acme Toys
								</p>
							</Col>
						</Row>
					</Grid>
				</Segment>
				<Segment style={{ padding: '8em 0em' }} vertical>
					<Container text>
						<Header as="h3" style={{ fontSize: '2em' }}>
							Breaking The Grid, Grabs Your Attention
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							Instead of focusing on content creation and hard work, we have learned
							how to master the art of doing nothing by providing massive amounts of
							whitespace and generic content that can seem massive, monolithic and
							worth your attention.
						</p>
						<Button as="a" size="large">
							Read More
						</Button>
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}
						>
							<p>Case Studies</p>
						</Divider>
						<Header as="h3" style={{ fontSize: '2em' }}>
							Did We Tell You About Our Bananas?
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							Yes I know you probably disregarded the earlier boasts as non-sequitur
							filler content, but it is really true. It took years of gene splicing
							and combinatory DNA research, but our bananas can really dance.
						</p>
						<Button as="a" size="large">
							I am Still Quite Interested
						</Button>
					</Container>
				</Segment>
				<Footer />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		layout: state.layout,
	}
}

export default connect(mapStateToProps)(HomePage)
