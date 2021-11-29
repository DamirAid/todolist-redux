import { EDIT_ID, EDIT_TODO, FETCH_TODOS } from "./types"

const INIT_STATE = {
	todos: [],
	asyncTodos: [],
	taskToEdit: {},
	editId: null

}

export const todosReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case FETCH_TODOS:
			return { ...state, asyncTodos: action.payload }
		case EDIT_TODO:
			return { ...state, taskToEdit: action.payload }
		case EDIT_ID:
			return { ...state, editId: action.payload }
		default: return state
	}
}