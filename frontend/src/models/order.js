import { _delete, get, patch, post } from '../utils/RestClient'
import update from 'immutability-helper'
import {routerRedux} from "dva/router";

export default {
	namespace: 'order',
	state: {
		records: [],
		activeRecord: {
			customer: {},
			orders: [],
		},
	},
	reducers: {
		setOrderActiveRecord(state, { payload }) {
			return update(state, {
				activeRecord: {
					$set: payload,
				},
			})
		},
		getOrdersSuccess(state, { payload }) {
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
		setOrders: [
			function*({ payload, callback = null }, { call, put }) {
				let orderItems = payload
				yield put({ type: 'setOrderActiveRecord', payload: orderItems })
				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		getOrders: [
			function*({ payload, callback = null }, { call, put }) {
				let orders = []
				yield get('/api/order').then(response => {
					orders = response.data
				})

				yield put({ type: 'getOrdersSuccess', payload: orders })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		upsertOrder: [
			function*({ payload, callback = null }, { call, put }) {
					//console.log("payload",payload);
				try {
					if (payload.id) {
						yield patch('/api/order/' + payload.id, payload)
							.then(response => {
								if (callback) callback(true)
							})
							.catch(err => {
								if (callback) callback(false)
							})
					} else {
						yield post('/api/public/createorder/',payload)

							.then(response => {
								if (callback) callback(true)
							})
							.catch(err => {
								if (callback) callback(false)
							})
					}

					// yield put({
					// 	type: 'mailSender',
					// 	payload: payload
					// })

				}catch (error) {
					console.log('login error', error)
				}
				yield put(routerRedux.push('/'))
			},
			{ type: 'takeLatest' },
		],

		updateFormInput: [
			function*({ payload, callback = null}, { call, put }) {
				yield put({ type: 'updateFormInputSuccess', payload })
				if(callback) {
					callback()
				}
			},
			{ type: 'takeLatest' },
		],

		// *mailSender(payload, { call, put }) {
		// 	console.log("mailsender",payload)
		// 	try {
		// 		yield post('/api/public/checkout-mail-sender/', {
		// 			orderId: 1,
		// 			orders: payload.orders,
		// 			details: {},
		// 			data:payload.date,
		// 			time:payload.time,
		// 			emailAddress: payload.emailAddress
		// 		})
		// 	} catch (error) {
        //
		// 			yield put(routerRedux.push('/'))
		// 	}
		// },

		*deleteOrder({ orderId, callback }, { call, put }) {
			yield _delete('/api/order/' + orderId)
				.then(response => {
					if (callback) callback(true)
				})
				.catch(err => {
					if (callback) callback(false)
				})
		},

		// *updateFormInput({ payload }, { call, put }) {
		//     yield put({ type: 'updateFormInputSuccess', payload });
		// }
	},
	subscriptions: {},
}
