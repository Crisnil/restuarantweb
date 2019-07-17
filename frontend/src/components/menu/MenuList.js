import React from 'react'
import { connect } from 'dva'
import { List } from 'semantic-ui-react'
import MenuListItem from './MenuListItem'
import _ from 'lodash'

class MenuList extends React.Component {
	render() {
		return (
			<List divided>
				{_.map(this.props.list, (menuItem, menuItemIdx) => {
					return (
						<MenuListItem
							key={menuItemIdx}
							menuItem={menuItem}
							onclickSelectedMenu={this.props.onclickSelectedMenu}
						/>
					)
				})}
			</List>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(MenuList)
