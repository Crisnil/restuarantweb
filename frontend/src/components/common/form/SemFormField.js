import React from 'react'
import _ from 'lodash'
import { Form, Input, Label, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class SemFormField extends React.Component {
	static propTypes = {
		// label: PropTypes.node.isRequired,
		value: PropTypes.any,
		fieldName: PropTypes.string,
		colLabel: PropTypes.object,
		colField: PropTypes.object,
		staticField: PropTypes.bool,
		staticFieldValue: PropTypes.node,
		customControl: PropTypes.node,
		feedback: PropTypes.bool,
	}

	static contextTypes = {
		getErrorText: PropTypes.func,
		checkIsError: PropTypes.func,
		schema: PropTypes.object,
	}

	static defaultProps = {
		colLabel: {
			sm: 2,
		},
		colField: {
			sm: 8,
		},
		feedback: true,
	}

	render() {
		let finalProps = _.assign({}, this.props)
		delete finalProps.fieldName
		delete finalProps.fluid
		delete finalProps.colLabel
		delete finalProps.colField
		delete finalProps.staticField
		delete finalProps.staticFieldValue
		delete finalProps.feedback
		delete finalProps.noValidationState
		delete finalProps.label
		delete finalProps.withErrMessage
		delete finalProps.errorType
		let As = finalProps.as || Input

		let errorMessage = this.context.getErrorText(this.props.fieldName)
		let isError = this.context.checkIsError(this.props.fieldName)
		if (this.props.customControl) {
			return this.props.customControl
		} else {
			if (this.props.errorType === 'popup') {
				return (
					<Form.Field error={isError}>
						<label>{this.props.label}</label>
						{this.props.withErrMessage && isError ? (
							<Popup trigger={<As {...finalProps} />} inverted position="bottom left">
								{errorMessage}
							</Popup>
						) : (
							<As {...finalProps} />
						)}
					</Form.Field>
				)
			} else {
				return (
					<Form.Field error={isError}>
						<label>{this.props.label}</label>
						<As {...finalProps} />
						{this.props.withErrMessage && isError ? (
							<Label basic color="red" pointing>
								{errorMessage}
							</Label>
						) : null}
					</Form.Field>
				)
			}
		}
	}
}
