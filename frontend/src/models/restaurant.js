import { _delete, get, post } from '../utils/RestClient'
import update from 'immutability-helper'

export default {
	namespace: 'restaurant',
	state: {
		records: [],
		activeRecord: {},
		featured: false,
	},

	reducers: {
		featuredRestaurants(state, { payload }) {
			return update(state, {
				records: {
					$set: payload,
				},
				featured: {
					$set: true,
				},
			})
		},
		getRestaurantsSuccess(state, { payload }) {
			return update(state, {
				records: {
					$set: payload,
				},
				featured: {
					$set: false,
				},
			})
		},
		getRestaurantByNameTagSuccess(state, { payload }) {
			return update(state, {
				activeRecord: {
					$set: payload,
				},
				featured: {
					$set: false,
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
		getFeaturedRestaurants: [
			function*({ payload, callback = null }, { call, put }) {
				let featured = []
				yield get('/api/public/restaurantlist').then(response => {
					featured = response.data
				})

				yield put({ type: 'featuredRestaurants', payload: featured })
				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		getRestaurants: [
			function*({ payload, callback = null }, { call, put }) {
				let restaurants = []
				if (payload.isSuperAdmin) {
					yield get('/api/restaurant').then(response => {
						restaurants = response.data
					})
				} else {
					yield get('/api/restaurant?owner=' + payload.id).then(response => {
						restaurants = response.data
					})
				}

				yield put({ type: 'getRestaurantsSuccess', payload: restaurants })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		getRestaurantsByTag: [
			function*({ payload, callback = null }, { call, put }) {
			console.log("payload",payload)
				let restaurants = {}
				yield get('/api/public/find-restaurants-by-tag?tag=' + payload.tag).then(
					response => {
						console.log(response);
						restaurants = response.data
					}
				)

				yield put({ type: 'getRestaurantByNameTagSuccess', payload: restaurants })
				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		upsertRestaurant: [
			function*({ payload, callback = null }, { call, put }) {
				yield post('/api/owner/upsert-restaurant', payload)
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

		*deleteRestaurant({ restaurantId, callback }, { call, put }) {
			yield _delete('/api/restaurant/' + restaurantId)
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
