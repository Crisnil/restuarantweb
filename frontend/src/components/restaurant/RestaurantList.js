import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Restaurant from './Restaurant'
import { Grid, Header } from 'semantic-ui-react'
import { BASE_URL } from '../../utils/RestClient'

class RestaurantList extends React.Component {
	render() {
		let restaurants1 = [
			{
				cardTitle: 'Sample 1',
				cardImage: `https://www.yourhealthyjourney.org/wp-content/uploads/2017/09/Z-healthy-eating-clean-quotes-2.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-1',
			},
			{
				cardTitle: 'Sample 2',
				cardImage: `https://media-cdn.tripadvisor.com/media/photo-s/12/1b/b5/8d/photo4jpg.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-2',
			},
			{
				cardTitle: 'Sample 3',
				cardImage: `http://331mrnu3ylm2k3db3s1xd1hg.wpengine.netdna-cdn.com/wp-content/uploads/2017/08/TCC5_newshop_dining1_jones-1200x800.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-3',
			},
			{
				cardTitle: 'Sample 4',
				cardImage: `https://mdbootstrap.com/img/Photos/Others/men.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-4',
			},
			{
				cardTitle: 'Sample 1',
				cardImage: `https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-5',
			},
			{
				cardTitle: 'Sample 2',
				cardImage: `https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-6',
			},
			{
				cardTitle: 'Sample 3',
				cardImage: `https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-7',
			},
			{
				cardTitle: 'Sample 4',
				cardImage: `https://mdbootstrap.com/img/Photos/Others/men.jpg`,
				cardText: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: 'test-8',
			},
		]

		let restaurantList = _.map(this.props.restaurant.records, (resto, x) => {
			resto.restopic = resto.restopic || emptyRestaurantImage
			return {
				cardTitle: resto.name,
				cardImage: resto.restopic,
				cardText: resto.description,
				buttonLabel: 'Button',
				buttonColor: 'deep-purple',
				restaurantNameTag: resto.nameTag,
				id: resto.id,
			}
		})
		let restoData = !_.isEmpty(restaurantList) ? restaurantList : restaurants1
		const Row = Grid.Row
		const Col = Grid.Column
		let emptyRestaurantImage = `${BASE_URL}/public/empty-image.png`

		return (
			<Grid stackable>
				<Header as="h3" style={{ fontSize: '2em', width: '100%' }}>
					{this.props.restaurant.featured ? 'Our Popular Restaurants' : 'Restaurants'}
				</Header>
				<Row>
					{_.map(restoData, (resto, rIdx) => {
						return (
							<Col width={4} style={{ padding: 10 }} key={rIdx}>
								<Restaurant {...resto} />
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
		restaurant: state.restaurant,
	}
}

export default connect(mapStateToProps)(RestaurantList)
