import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Icon, Image } from 'semantic-ui-react'

/**
 * cardImage, cardTitle, cardText, buttonLabel, buttonColor, buttonLink
 * @extends React
 */
class Restaurant extends React.Component {
	goToLink = () => {
		this.props.dispatch(routerRedux.push(`/restaurants/${this.props.restaurantNameTag}`))
	}

	render() {
		let img = this.props.cardImage
			? this.props.cardImage
			: 'https://react.semantic-ui.com/images/wireframe/image-text.png'
		return (
			<Card fluid onClick={this.goToLink}>
				<Image src={img} />
				<Card.Content>
					<Card.Header>{this.props.cardTitle}</Card.Header>
					<Card.Meta>
						<span className="date">Joined in 2015</span>
					</Card.Meta>
					<Card.Description>{this.props.cardText}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<span>
						<Icon name="user" />
						22 Friends
					</span>
				</Card.Content>
				{/* <Card style={{marginTop: 20}}>
          <CardMedia
            // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
          >
            <img src={this.props.cardImage} />
          </CardMedia>
          <CardTitle>{this.props.cardTitle}</CardTitle>
          <CardText>{this.props.cardText}</CardText>
          <CardActions>
            <RaisedButton label={this.props.buttonLabel} fullWidth={true} onClick={this.goToLink} primary={true} />
          </CardActions>
        </Card> */}
			</Card>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(Restaurant)
