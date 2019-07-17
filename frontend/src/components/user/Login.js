import React from 'react'
import { connect } from 'dva'
import { Button, Card, Divider, Form, Grid, Header, Icon, Input, Message } from 'semantic-ui-react'
import _ from 'lodash'

class Login extends React.Component {
	state = {
		email: '',
		password: '',
	}

	updateField = (e, { name, value }) => {
		this.setState({
			[name]: value,
		})
	}

	handleSubmit = () => {
		const { email, password } = this.state
		this.props.dispatch({
			type: 'auth/login',
			loginstate: {
				emailAddress: email,
				password,
			},
		})
	}

	render() {
		let auth = this.props.auth
		const Col = Grid.Column
		const { email, password } = this.state
		return (
			<Grid stackable columns={1} centered>
				<Col width={4} style={{ paddingTop: '5%' }}>
					{_.isUndefined(auth.error) || _.isNull(auth.error) ? (
						''
					) : (
						<Message negative>
							<Message.Header>Login Failed</Message.Header>
							<p>{auth.error}</p>
						</Message>
					)}
					<Card raised fluid>
						<Card.Content>
							<Header as="h2" icon textAlign="center">
								<Icon name="user" circular />
								<Header.Content>Sign In</Header.Content>
							</Header>
							<Form style={{ padding: 10 }} onSubmit={this.handleSubmit}>
								<Form.Field
									control={Input}
									fluid
									label="Type your email"
									placeholder="Email"
									type="email"
									name="email"
									value={email}
									onChange={this.updateField}
								/>
								<Form.Field
									control={Input}
									fluid
									label="Type your password"
									placeholder="Password"
									type="password"
									name="password"
									value={password}
									onChange={this.updateField}
								/>
								<Divider section />
								<Form.Field control={Button} fluid type="submit">
									Login
								</Form.Field>
							</Form>
						</Card.Content>
					</Card>
				</Col>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Login)
