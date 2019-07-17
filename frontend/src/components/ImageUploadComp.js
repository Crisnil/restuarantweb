import React from 'react'
import { connect } from 'dva'
import { Button, Grid, Header, Icon, Image as ImageComp, Input, Modal } from 'semantic-ui-react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { BASE_URL } from '../utils/RestClient'

class ImageUploadComp extends React.Component {
	state = {
		imgSrc:
			this.props.imgSrc ||
			`https://react.semantic-ui.com/assets/images/wireframe/square-image.png`,
		cropModal: false,
		pixelCrop: null,
	}

	selectImage = e => {
		var fileTypes = ['jpg', 'jpeg', 'png'] //acceptable file types

		var extension = e.target.files[0].name
				.split('.')
				.pop()
				.toLowerCase(), //file extension from input file
			isSuccess = fileTypes.indexOf(extension) > -1 //is extension in acceptable types

		if (isSuccess) {
			var reader = new FileReader()
			var self = this
			reader.onload = function() {
				// self.setState({
				//     imgSrc: reader.result
				// })
				// self.props.onSelectImage(reader.result, extension);
				self.setState({
					// crop: makeAspectCrop({
					//     x: 0,
					//     y: 0,
					//     aspect: 16 / 9,
					//     width: 50,
					// }, 500 / 400),
					// crop: {
					//     aspect: 16 / 9
					// },
					imgSrc: reader.result,
					cropModal: true,
					extension,
				})
			}
			reader.readAsDataURL(e.target.files[0])
			// console.log("e", e.target.files)
		}
	}

	cropImage = () => {
		this.setState({
			cropModal: true,
		})
	}

	handleCloseCrop = () => {
		this.setState({
			cropModal: false,
		})
	}

	openImageInNewTab = imgSrc => {
		return () => {
			if (imgSrc) {
				console.log('imgSrc', imgSrc)
				// var image = new Image();
				// image.src = imgSrc;

				// var w = window.open("")
				// w.document.write(image.outerHTML);
				// w.document.body.style.backgroundColor = "#0e0e0e";
				// w.document.body.style.textAlign = "center";
				// w.document.body.style.display = "flex";
				// w.document.body.style.justifyContent = "center";
				// w.document.body.style.alignItems = "center";
			} else {
				// window.open('/restapi/loaRecordDocuments/scannedimage/' + id, 'loaattachment');
			}
		}
	}

	clickOrUpload = () => {
		if (this.props.imgSrc) {
			var image = new Image()
			image.src = this.props.imgSrc

			var w = window.open('')
			w.document.write(image.outerHTML)
			w.document.body.style.backgroundColor = '#0e0e0e'
			w.document.body.style.textAlign = 'center'
			w.document.body.style.display = 'flex'
			w.document.body.style.justifyContent = 'center'
			w.document.body.style.alignItems = 'center'
		} else {
			this.fileInputRef.inputRef.click()
		}
	}

	onImageLoaded = image => {
		this.setState({
			crop: makeAspectCrop(
				{
					x: 0,
					y: 0,
					aspect: 16 / 9,
					width: 50,
				},
				image.naturalWidth / image.naturalHeight
			),
			image,
		})
	}

	onCropComplete = (crop, pixelCrop) => {
		console.log('onCropComplete, pixelCrop:', pixelCrop)
		this.setState({
			pixelCrop,
		})
	}

	onCropChange = crop => {
		this.setState({ crop })
	}

	getCroppedImg = () => {
		// let {image, pixelCrop, fileName} = this.state;
		let { imgSrc, pixelCrop } = this.state

		var image = new Image()
		image.src = imgSrc

		const canvas = document.createElement('canvas')
		canvas.width = pixelCrop.width
		canvas.height = pixelCrop.height
		const ctx = canvas.getContext('2d')

		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			pixelCrop.width,
			pixelCrop.height
		)

		// As Base64 string
		const base64Image = canvas.toDataURL('image/jpeg')

		this.setState(
			{
				imgSrc: base64Image,
				cropModal: false,
			},
			() => {
				this.props.onSelectImage(base64Image, this.state.extension)
			}
		)

		// As a blob
		// return new Promise((resolve, reject) => {
		//     canvas.toBlob(file => {
		//         file.name = fileName;
		//         resolve(file);
		//     }, 'image/jpeg');
		// });
	}

	render() {
		const Row = Grid.Row
		const Col = Grid.Column
		// const { imgSrc } = this.state;
		let imgSrc = this.props.imgSrc || `${BASE_URL}/public/empty-image.png`
		let imageContHeight = this.props.imageContHeight || 400
		return (
			<div style={{ minHeight: '80%' }}>
				<Col style={{ height: imageContHeight, textAlign: 'center', display: 'flex' }}>
					<ImageComp
						src={imgSrc}
						rounded
						style={{ margin: 'auto' }}
						onClick={this.clickOrUpload}
					/>
				</Col>
				<Col>
					<Input
						ref={ref => (this.fileInputRef = ref)}
						placeholder="Upload"
						type="file"
						accept="image/*"
						onChange={this.selectImage}
					/>
				</Col>
				<Modal
					open={this.state.cropModal}
					closeOnDimmerClick={false}
					closeOnEscape={false}
					basic
					// size='small'
				>
					<Header icon="crop" content="Crop Your Image" />
					<Modal.Content>
						<Grid container style={{ width: 500 }}>
							<Row>
								<Col textAlign="center">
									{/* <ReactCrop
                                        src={this.state.imgSrc}
                                        // crop={this.state.crop}
                                        onChange={this.onImageCrop}
                                    /> */}
									<ReactCrop
										crop={this.state.crop}
										src={this.state.imgSrc}
										onImageLoaded={this.onImageLoaded}
										onComplete={this.onCropComplete}
										onChange={this.onCropChange}
										maxHeight={100}
									/>
								</Col>
							</Row>
						</Grid>
					</Modal.Content>
					<Modal.Actions>
						<Button color="red" onClick={this.handleCloseCrop} inverted>
							<Icon name="close" /> Cancel
						</Button>
						<Button color="green" onClick={this.getCroppedImg} inverted>
							<Icon name="checkmark" /> Save
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
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
)(ImageUploadComp)
