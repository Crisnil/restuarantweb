import dva from 'dva'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//import { createBrowserHistory as createHistory } from 'history';
import { browserHistory } from 'dva/router'
import './index.css'
//import { createLogger } from 'redux-logger'

// 1. Initialize
let app = null
const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth', 'order'],
}

let $persistor

export function createPersistorIfNecessary(store) {
	// if (!$persistor && store) {
	//     $persistor = persistStore(store)
	//     // const rootReducer = persistReducer(persistConfig, state => state)
	//     // store.replaceReducer(rootReducer)
	//     // $persistor.dispatch({
	//     //     type: REHYDRATE,
	//     // })
	// }
	$persistor = persistStore(store)
	return $persistor
}

if (process.env.NODE_ENV !== 'production') {
	app = dva({
		onReducer: reducer => {
			return persistReducer(persistConfig, reducer)
		},
		history: browserHistory,
		// onAction: createLogger({
		// 	level: 'info',
		// 	collapsed: true,
		// }),
	})
} else {
	app = dva({
		onReducer: reducer => {
			return persistReducer(persistConfig, reducer)
		},
		history: browserHistory,
	})
}

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/auth').default)
app.model(require('./models/layout').default)
app.model(require('./models/user').default)
app.model(require('./models/restaurant').default)
app.model(require('./models/menu').default)
app.model(require('./models/order').default)
app.model(require('./models/menucategory').default)
app.model(require('./models/tag').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
