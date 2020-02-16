import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/user'
import categoriesReducer from '../reducers/category'
import notesReducer from '../reducers/note'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: usersReducer,
        categories: categoriesReducer,
        notes: notesReducer
    }),applyMiddleware(thunk))

    return store

}

export default configureStore