import update from 'immutability-helper'

export default {
	namespace: 'layout',
	state: {
		mobile: false,
		desktop: false,
	},
	reducers: {
		updateToMobile(state) {
			return update(state, {
				mobile: {
					$set: true,
				},
				desktop: {
					$set: false,
				},
			})
		},
		updateToDesktop(state) {
			return update(state, {
				mobile: {
					$set: false,
				},
				desktop: {
					$set: true,
				},
			})
		},
	},
	effects: {
		setToMobile: [
			function*({ payload }, { call, put }) {
				yield put({ type: 'updateToMobile' })
			},
			{ type: 'takeLatest' },
		],

		setToDesktop: [
			function*({ payload }, { call, put }) {
				yield put({ type: 'updateToDesktop' })
			},
			{ type: 'takeLatest' },
		],
	},
	subscriptions: {},
}
