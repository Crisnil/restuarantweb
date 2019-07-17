import React from 'react'
import validation from 'react-validation-mixin'
import strategy from 'react-validatorjs-strategy'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class SemForm extends React.Component {
	state = {
		submitted: false,
	}

	static propTypes = {
		source: PropTypes.object.isRequired,
		submitOnEnter: PropTypes.bool,
		onTrySubmit: PropTypes.func, // onTrySubmit when defined will cancel submission of form when false is returned
		onError: PropTypes.func,
		onSuccess: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		customMessage: PropTypes.object,
		attributeNames: PropTypes.object,
		validationHandler: PropTypes.func,
		onAfterMountForm: PropTypes.func,
	}

	static defaultProps = {
		horizontal: false,
		customMessage: {},
		attributeNames: {},
		submitOnEnter: true,
	}

	static childContextTypes = {
		getErrorText: PropTypes.func,
		checkIsError: PropTypes.func,
		horizontal: PropTypes.bool,
		schema: PropTypes.object,
	}

	getChildContext() {
		return {
			getErrorText: this.getErrorText,
			checkIsError: this.checkIsError,
			horizontal: this.props.horizontal,
			schema: this.props.schema,
		}
	}

	// this is the object validator will look up to when validating
	// in this module, this is accessed from the store
	getValidatorData = () => {
		return this.props.source
	}

	// shows the error message on the HelpBlock
	getErrorText = field => {
		var error = this.props.errors[field]
		var forReturn = ''
		if (_.isArray(error)) {
			_.map(error, err => {
				if (forReturn !== '') {
					forReturn += '; '
				}

				forReturn += err
			})
		} else {
			forReturn = error
		}

		return forReturn
		// if (!error)
		//     return null;

		// if (Array.isArray(error)) {
		//     var message = [];

		//     message = error.map((item, i) => {
		//         return (
		//             <span key={i}>
		//                 {item}
		//                 <br />
		//             </span>
		//         )
		//     });
		//     return message;
		// }
		// else
		//     return (<span>{error || ''}</span>);
	}

	checkIsError = field => {
		if (this.state.submitted) {
			return !this.props.isValid(field)
		} else {
			return false
		}
	}

	onFormSubmit = event => {
		event.preventDefault() // will cancel default formsubmit mechanism we will use ajax

		this.setState(
			{
				submitted: true,
			},
			() => {
				if (this.props.onTrySubmit) {
					if (!this.props.onTrySubmit()) return
				}

				this.props.validate(this.onValidate)
			}
		)
	}

	resetFields = () => {
		this.setState({
			submitted: false,
		})
	}

	onValidate = error => {
		if (error) {
			if (this.props.onError) this.props.onError(error)
		} else {
			if (this.props.onSuccess) this.props.onSuccess()
		}
	}

	componentDidMount() {
		if (this.props.onAfterMountForm) {
			this.props.onAfterMountForm(this)
		}
	}

	submitForm = () => {
		this.refs.hiddenBtn.click()
	}

	checkEnter = e => {
		var txtArea = /textarea/i.test((e.target || e.srcElement).tagName)

		if (txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13) {
			return true
		} else {
			e.preventDefault()
			return false
		}
	}

	render() {
		this.validatorTypes = strategy.createSchema(
			this.props.schema,
			{
				required: 'The field :attribute is required!',
				numeric: 'The field :attribute  should be a number!',
				email: 'The field :attribute should be a valid email!',
			},
			validation => {
				validation.setAttributeNames(this.props.attributeNames)

				if (this.props.validationHandler) this.props.validationHandler(validation)
			}
		)

		return (
			<Form
				onKeyPress={!this.props.submitOnEnter ? this.checkEnter : null}
				onSubmit={this.onFormSubmit}
				style={this.props.style}
			>
				{this.props.children}
				<button style={{ display: 'none' }} type="submit" ref="hiddenBtn" />
			</Form>
		)
	}
}

export default validation(strategy)(SemForm)
