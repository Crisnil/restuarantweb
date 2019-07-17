import React from 'react'
import { Menu } from 'semantic-ui-react'
import _ from 'lodash'

class HeaderMenu extends React.Component {
	componentDidMount() {
		//pwede ani get sa list sa menu based sa resto or ipasa ra sa props from RestaurantPage
	}

	render() {
		return (
			<div>
				{_.map(this.props.list, (menuItem, menuItemIdx) => {
					return (
						<Menu.Item key={menuItemIdx} as="a">
							{menuItem.name}
						</Menu.Item>
					)
				})}
			</div>
		)
	}
}

export default HeaderMenu
