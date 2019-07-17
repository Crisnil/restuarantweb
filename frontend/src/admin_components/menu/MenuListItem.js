import React from 'react'
import { connect } from 'dva'
import { Button, Card, Image, Label } from 'semantic-ui-react'
import _ from 'lodash'
import numeral from 'numeral'

class MenuListItem extends React.Component {
	constructor(props) {
		super(props)

		numeral.defaultFormat('₱ 0,0.00')
	}

	editMenu = () => {
		this.props.openUpsertMenuModal()
		this.props.dispatch({
			type: 'menu/updateFormInput',
			payload: this.props.menuData,
		})
	}

	render() {
		return (
			<Card onClick={this.goToLink}>
				<div
					className={'ui image'}
					style={{
						backgroundImage: `url(${this.props.menuData.menupic})`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<Label as="a" color="blue" ribbon="right">
						₱{numeral(this.props.menuData.price || null).format('0,0.00')}
					</Label>
					<Image src={'/assets/empty-image.png'} style={{ opacity: 0 }} />
				</div>
				<Card.Content>
					<Card.Header>{this.props.menuData.name || ' -- '}</Card.Header>
					<Card.Meta>
						{!_.isEmpty(this.props.menuData.category)
							? this.props.menuData.category.name
							: ' -- '}
					</Card.Meta>
					<Card.Description>
						{_.truncate(this.props.menuData.description)}
					</Card.Description>
				</Card.Content>
				<Card.Content extra style={{ textAlign: 'center' }}>
					<Button fluid basic color="teal" onClick={this.editMenu}>
						View/Edit
					</Button>
				</Card.Content>
			</Card>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		// : bindActionCreators(, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuListItem)
