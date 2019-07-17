import { _delete, get, post } from '../utils/RestClient'
import update from 'immutability-helper'

export default {
	namespace: 'menucategory',
	state: {
		records: [],
		activeRecord: {},
	},
	reducers: {
		getMenuCategoriesByRestaurantSuccess(state, { payload }) {
			return update(state, {
				records: {
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
		getMenuCategoriesByRestaurant: [
			function*({ restaurantId, callback = null }, { call, put }) {
				let menuCategories = []
				yield get(`/api/menuCategory?restaurant=${restaurantId}`).then(response => {
					menuCategories = response.data
				})

				yield put({ type: 'getMenuCategoriesByRestaurantSuccess', payload: menuCategories })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		upsertMenuCategory: [
			function*({ payload, callback = null }) {
				yield post('/api/menuCategory', payload)
					.then(response => {
						if (callback) callback(true, response.data)
					})
					.catch(err => {
						console.log('error here', err)
						if (callback) callback(false)
					})
			},
			{ type: 'takeLatest' },
		],

		*deleteMenuCategory({ menuCategoryId, callback }, { call, put }) {
			yield _delete('/api/menuCategory/' + menuCategoryId)
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
