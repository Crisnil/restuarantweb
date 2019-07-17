import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class MessageAlert extends React.Component {
	render() {
		return (
			<Modal
				open={this.props.show}
				onClose={this.handleClose}
				size={this.props.size || 'tiny'}
			>
				<Header icon={this.props.headerIcon} content={this.props.title} />
				<Modal.Content>
					<h3>{this.props.message}</h3>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={this.props.handleClose}>
						<Icon name="close" /> Close
					</Button>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default MessageAlert
