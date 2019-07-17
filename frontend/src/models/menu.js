import { _delete, get, post } from '../utils/RestClient'
import update from 'immutability-helper'

export default {
	namespace: 'menu',
	state: {
		records: [],
		activeRecord: {},
	},
	reducers: {
		getMenuSuccess(state, { payload }) {
			return update(state, {
				records: {
					$set: payload,
				},
			})
		},
		getRestuarantwithMenuSuccess(state, { payload }) {
			return update(state, {
				activeRecord: {
					$set: payload,
				},
			})
		},
		updateFormInputSuccess(state, { payload }) {
			if (payload === 'clear') {
				return update(state, {
					activeRecord: {
						$set: {},
					},
				})
			} else {
				return update(state, {
					activeRecord: {
						$merge: payload,
					},
				})
			}
		},
	},
	effects: {
		getMenuByRestaurant: [
			function*({ payload, callback = null }, { call, put }) {
				let menu = []
				let isSuccess = false
				yield get('/api/public/find-menu-by-restaurant', {
					params: payload,
				})
					.then(response => {
						menu = response.data
						isSuccess = true
					})
					.catch(err => {
						isSuccess = false
					})

				yield put({ type: 'getMenuSuccess', payload: menu })
				if (callback) callback(isSuccess)
			},
			{ type: 'takeLatest' },
		],

		getMenuByName: [
			function*({ payload, callback = null }, { call, put }) {
				let menu = []
				let isSuccess = false
				if (payload.filtermenu !== '') {
					yield get('/api/public/findmenubyname', {
						params: payload,
					})
						.then(response => {
							menu = response.data
							isSuccess = true
						})
						.catch(err => {
							isSuccess = false
						})
				}

				yield put({ type: 'getMenuSuccess', payload: menu })
				if (callback) callback(isSuccess)
			},
			{ type: 'takeLatest' },
		],

		getRestuarantwithMenuByNameTag: [
			function*({ payload, callback = null }, { call, put }) {
				let data = {}
				yield get('/api/public/findmenubynametag', {
					params: payload,
				}).then(response => {
					console.log("menus",response.data)
					data = response.data
				})

				yield put({ type: 'getRestuarantwithMenuSuccess', payload: data })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		upsertMenu: [
			function*({ payload, callback = null }) {
				yield post('/api/owner/upsert-menu', payload)
					.then(response => {
						if (callback) callback(true)
					})
					.catch(err => {
						console.log('error here', err)
						if (callback) callback(false)
					})
			},
			{ type: 'takeLatest' },
		],

		*deleteMenu({ menuId, callback }, { call, put }) {
			yield _delete('/api/menu/' + menuId)
				.then(response => {
					if (callback) callback(true)
				})
				.catch(err => {
					if (callback) callback(false)
				})
		},

		updateFormInput: [
			function*({ payload }, { call, put }) {
				yield put({ type: 'updateFormInputSuccess', payload })
			},
			{ type: 'takeLatest' },
		],
	},
	subscriptions: {},
}
