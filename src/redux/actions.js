import axios from "axios";
import { ADD_TODO, CHANGE_STATUS, DELETE_TODO, EDIT_ID, EDIT_TODO, FETCH_TODOS, SAVE_TASK } from "./types";

export const fetchTodos = () => {
	return async dispatch => {
		const { data } = await axios('http://localhost:8000/todos')
		dispatch({ type: FETCH_TODOS, payload: data })
	}
}

export const addTask = (newObj) => {
	return async dispatch => {
		await axios.post('http://localhost:8000/todos', newObj)
		dispatch({ type: ADD_TODO })
		dispatch(fetchTodos())
	}
}

export const deleteTask = (id) => {
	return async dispatch => {
		await axios.delete(`http://localhost:8000/todos/${id}`)
		dispatch({ type: DELETE_TODO })
		dispatch(fetchTodos())

	}
}

export const editTask = (id) => {
	return async dispatch => {
		const { data } = await axios(`http://localhost:8000/todos/${id}`)
		dispatch({ type: EDIT_TODO, payload: data })
	}
}

export const getEditId = (id) => {
	return async dispatch => {
		dispatch({
			type: EDIT_ID,
			payload: id
		})
	}
}
export const saveTask = (newTask) => {
	return async dispatch => {
		await axios.patch(`http://localhost:8000/todos/${newTask.id}`, newTask)
		dispatch({ type: SAVE_TASK })
		dispatch(fetchTodos())
	}
}

export const changeStatus = (id) => {
	return async dispatch => {
		const { data } = await axios(`http://localhost:8000/todos/${id}`)
		await axios.patch(`http://localhost:8000/todos/${id}`, { status: !data.status })	
		dispatch({ type: CHANGE_STATUS })	
		dispatch(fetchTodos())
	}
}