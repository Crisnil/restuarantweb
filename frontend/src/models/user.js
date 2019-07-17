import { _delete, get, post } from '../utils/RestClient'
import update from 'immutability-helper'

export default {
	namespace: 'user',
	state: {
		records: [],
		activeRecord: {},
	},
	reducers: {
		getUsersSuccess(state, { payload }) {
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
		getUsers: [
			function*({ payload, callback = null }, { call, put }) {
				let users = []
				yield get('/api/user').then(response => {
					users = response.data
				})

				yield put({ type: 'getUsersSuccess', payload: users })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		getApplicants: [
			function*({ payload, callback = null }, { call, put }) {
				let users = []
				yield get('/api/applicant').then(response => {
					users = response.data
				})

				yield put({ type: 'getUsersSuccess', payload: users })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		upsertApplicant: [
			function*({ payload, callback = null }, { call, put }) {
				yield post('/api/entrance/register', payload)
					.then(response => {
						if (callback) callback(true)
					})
					.catch(err => {
						if (callback) callback(false)
					})
			},
			{ type: 'takeLatest' },
		],

		*deleteUser({ userId, callback }, { call, put }) {
			yield _delete('/api/user/' + userId)
				.then(response => {
					if (callback) callback(true)
				})
				.catch(err => {
					if (callback) callback(false)
				})
		},

		approveApplicant: [
			function*({ id, callback = null }, { call, put }) {
				yield get(`/api/admin/approve?id=${id}`)
					.then(response => {
						if (callback) callback(true)
					})
					.catch(err => {
						if (callback) callback(false)
					})
			},
			{ type: 'takeLatest' },
		],

		updateFormInput: [
			function*({ payload }, { call, put }) {
				yield put({ type: 'updateFormInputSuccess', payload })
			},
			{ type: 'takeLatest' },
		],
	},
	subscriptions: {},
}
