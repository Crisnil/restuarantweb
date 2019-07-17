import React, { Component } from 'react'
import { Container, Header, Input, Segment } from 'semantic-ui-react'
import { connect } from 'dva'

class HomepageHeading extends Component {
	state = {
		searchFilter: '',
	}

	onSearchByTag = (e, data) => {
		this.changeFilter(data.value)
	}

	onClickIcon = () => {
		if (this.state.searchFilter) {
			this.changeFilter('')
		}
	}

	changeFilter = (value = '') => {
		this.setState(
			{
				searchFilter: value,
			},
			() => {
				this.props.getRestaurantsByTag(this.state.searchFilter)
				this.props.getMenuByName(this.state.searchFilter)
			}
		)
	}

	render() {
		let { mobile } = this.props.layout

		return (
			<Segment
				textAlign="center"
				vertical
				style={{
					backgroundImage: 'url(/assets/home-banner.jpg)',
					backgroundPositionX: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<Container text style={{ textShadow: '0px 2px 18px rgba(150, 150, 150, 1)' }}>
					<Header
						as="h1"
						content="It's the food you love at your convenience"
						inverted
						style={{
							fontSize: mobile ? '2em' : '4em',
							fontWeight: 'normal',
							marginBottom: 0,
							marginTop: mobile ? '1.5em' : '2em',
							textShadow: 'rgb(0, 0, 0) -15px -10px 15px',
						}}
					/>
					<Header
						as="h2"
						content="Just Sit, Relax and Eat."
						inverted
						style={{
							fontSize: mobile ? '1.5em' : '1.7em',
							fontWeight: 'normal',
							marginTop: mobile ? '0.5em' : '1em',
							textShadow: 'rgb(0, 0, 0) -15px -10px 15px',
						}}
					/>
					<Input
						size="huge"
						fluid
						icon={{
							name: this.state.searchFilter ? 'close' : 'search',
							link: true,
							onClick: this.onClickIcon,
						}}
						style={{
							fontSize: mobile ? '1em' : '1.5em',
							marginTop: mobile ? '1.5em' : '2em',
							marginBottom: mobile ? '1.5em' : '2em',
							boxShadow: '0 0 30px rgb(0,0,0)',
						}}
						placeholder="Search for your favorite dish. . ."
						value={this.state.searchFilter}
						onChange={this.onSearchByTag}
					/>
				</Container>
			</Segment>
		)
	}
}

function mapStateToProps(state) {
	return {
		layout: state.layout,
	}
}

export default connect(mapStateToProps)(HomepageHeading)
