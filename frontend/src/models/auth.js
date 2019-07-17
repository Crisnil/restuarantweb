import { routerRedux } from 'dva/router'
import { get } from '../utils/RestClient'

export default {
	namespace: 'auth',
	state: {
		isAuthenticated: false,
		isWrongCredentials: false,
		account: null,
		logoutSuccess: false,
		fromStart: false,
		error: null,
	},

	reducers: {
		accountReceived(state, { account, fromRefresh }) {
			return {
				...state,
				account,
				isAuthenticated: true,
				isWrongCredentials: false,
				logoutSuccess: false,
				fromStart: fromRefresh ? false : true,
				error: null,
			}
		},

		logoutSuccess(state, { targetPath }) {
			console.log('logout success ka')
			return {
				...state,
				isAuthenticated: false,
				isWrongCredentials: false,
				account: null,
				logoutSuccess: !targetPath,
				fromStart: false,
				error: null,
			}
		},

		loginFailed(state, { erorrdata }) {
			return {
				...state,
				isAuthenticated: false,
				isWrongCredentials: true,
				account: null,
				logoutSuccess: false,
				fromStart: false,
				error: erorrdata,
			}
		},
	},
	effects: {
		login: [
			function*({ loginstate, targetPath }, { call, put }) {
				try {
					const loginResponse = yield call(get, '/api/entrance/login', {
						params: loginstate,
					})

					yield put({
						type: 'loginSuccess',
						targetPath: targetPath,
						fromRefresh: false,
						loginStored: loginResponse.data,
					})
				} catch (error) {
					let erorrdata = 'Error Loggin In'
					console.log('login error', erorrdata)
					yield put({
						type: 'loginFailed',
						erorrdata: erorrdata,
					})

					yield call(get, '/api/public/ping')
				}
			},
			{ type: 'takeLatest' },
		],

		*loginSuccess(payload, { call, put }) {
			let { targetPath, fromRefresh, loginStored } = payload
			try {
				// let apiTokenResp = yield call(get, '/api/security/grant-csrf-token', {
				//     params: {
				//         _csrf: loginStored.csrfSecret
				//     }
				// });
				// localStorage.setItem("apiToken", apiTokenResp.data._csrf);

				let account = yield call(get, `/api/user/${loginStored.userId}`)
				yield put({
					type: 'accountReceived',
					account: account.data,
					fromRefresh,
				})

				if (!fromRefresh) yield put(routerRedux.push('/account/dashboard'))

				localStorage.setItem('loginStored', JSON.stringify(loginStored))
			} catch (error) {
				console.log('loginSuccess error', error)

				localStorage.removeItem('loginStored')
				// refresh CSRF
				yield call(get, '/api/public/ping')

				if (targetPath) yield put(routerRedux.push('/login?targetPath=' + targetPath))
				else {
					yield put(routerRedux.push('/login'))
				}
			}
		},

		*logout(payload, { call, put }) {
			let { targetPath } = payload

			try {
				yield call(get, '/api/account/logout', {
					headers: {
						'Content-Type': 'application/json',
					},
				})

				localStorage.removeItem('loginStored')
				yield put({
					type: 'logoutSuccess',
					targetPath: targetPath ? '?targetPath=' + targetPath : '',
				})

				yield put(
					routerRedux.push('/login' + (targetPath ? '?targetPath=' + targetPath : ''))
				)
				// yield call(get, '/api/public/ping');
			} catch (error) {
				console.log('logout error', error)

				localStorage.removeItem('loginStored')
				yield put({
					type: 'logoutSuccess',
					targetPath: targetPath ? '?targetPath=' + targetPath : '',
				})

				yield put(
					routerRedux.push('/login' + (targetPath ? '?targetPath=' + targetPath : ''))
				)
				// yield call(get, '/api/public/ping');
			}
		},

		*checkLoggedIn(payload, { call, put }) {
			try {
				let loginStored = localStorage.loginStored
					? JSON.parse(localStorage.loginStored)
					: null

				let account = yield call(get, `/api/user/${loginStored.userId}`)
				yield put({
					type: 'accountReceived',
					account: account.data,
				})

				localStorage.setItem('loginStored', JSON.stringify(loginStored))
			} catch (error) {
				localStorage.removeItem('loginStored')

				yield put({
					type: 'loginFailed',
				})
			}
		},
	},
	subscriptions: {},
}
