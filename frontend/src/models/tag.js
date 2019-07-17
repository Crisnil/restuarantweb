import { _delete, get, post } from '../utils/RestClient'
import update from 'immutability-helper'

export default {
	namespace: 'tag',
	state: {
		records: [],
		activeRecord: {},
	},
	reducers: {
		getAllTagsSuccess(state, { payload }) {
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
		getAllTags: [
			function*({ callback = null }, { call, put }) {
				let tags = []
				yield get(`/api/tags`).then(response => {
					tags = response.data
				})

				yield put({ type: 'getAllTagsSuccess', payload: tags })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		getTagsByFilter: [
			function*({ filter, callback = null }, { call, put }) {
				let tags = []
				yield get(`/api/tags?filter=${filter}`).then(response => {
					tags = response.data
				})

				yield put({ type: 'getAllTagsSuccess', payload: tags })

				if (callback) callback(true)
			},
			{ type: 'takeLatest' },
		],

		upsertTag: [
			function*({ payload, callback = null }) {
				yield post('/api/tags', payload)
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

		*deleteTag({ tagId, callback }, { call, put }) {
			yield _delete('/api/tags/' + tagId)
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
