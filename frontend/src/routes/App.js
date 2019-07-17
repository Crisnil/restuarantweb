import React from 'react'
// import styles from './App.css';
import { connect } from 'dva'
import HomepageLayout from './HomepageLayout'
// import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
	state = {}

	render() {
		return (
			<div>
				{/**<Layout {...this.props} />**/}
				<HomepageLayout {...this.props} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { auth: state.auth }
}

export default connect(mapStateToProps)(App)
