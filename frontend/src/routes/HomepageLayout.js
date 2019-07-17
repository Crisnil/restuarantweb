import PropTypes from 'prop-types'
import React from 'react'
import RouteWithSubRoutes from './RoutesWithSubRoutes'
import { connect } from 'dva'
import DesktopContainer from '../components/container/DekstopContainer'
import MobileContainer from '../components/container/MobileContainer'
import { Responsive } from 'semantic-ui-react'

const ResponsiveContainer = ({ children }) => (
	<div>
		<Responsive {...Responsive.onlyComputer}>
			<DesktopContainer children={children} />
		</Responsive>
		<Responsive {...Responsive.onlyMobile}>
			<MobileContainer children={children} />
		</Responsive>
	</div>
)

ResponsiveContainer.propTypes = {
	children: PropTypes.node,
}

class HomepageLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmOpen: false,
		}
	}

	render() {
		return (
			<ResponsiveContainer>
				{this.props.routes.map((route, i) => {
					return <RouteWithSubRoutes key={i} {...route} />
				})}
			</ResponsiveContainer>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(HomepageLayout)
