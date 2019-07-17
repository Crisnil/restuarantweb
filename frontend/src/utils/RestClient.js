import axios from 'axios'
import _ from 'lodash'
// import { getHost } from '../config'
// import { BASE_URL } from '../../app.config'
//const BASE_URL = "http://localhost:3000"
export const BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'http://sitneat.design4web.dk:3000'

function assignInstance() {
	let apiToken = localStorage.getItem('apiToken')
	if (apiToken) {
		// Object.assign(instance.defaults, { headers: { 'X-CSRF-Token': apiToken } });
	}
}

const defaultConfig = {}

var instance = axios.create({
	baseURL: BASE_URL,
	// headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	withCredentials: true,
})

export let get = (path, body, config, track = false) => {
	if (!config) config = {}

	config = _.assign({}, defaultConfig, config)

	config.track = track

	assignInstance()

	return instance.get(path, body || {}, config)
}

export let post = (path, body, config, track = true) => {
	if (!config) config = {}

	config = _.assign({}, defaultConfig, config)

	config.track = track

	assignInstance()

	return instance.post(path, body || {}, config)
}

export let _put = (path, body, config, track = true) => {
	if (!config) config = {}

	config = _.assign({}, defaultConfig, config)

	config.track = track

	assignInstance()

	return instance.put(path, body || {}, config)
}

export let patch = (path, body, config, track = true) => {
	if (!config) config = {}

	config = _.assign({}, defaultConfig, config)
	config.track = track

	assignInstance()
	return instance.patch(path, body || {}, config)
}

export let _delete = (path, config) => {
	if (!config) config = {}

	config = _.assign({}, defaultConfig, config)

	assignInstance()
	return instance.delete(path, config)
}
