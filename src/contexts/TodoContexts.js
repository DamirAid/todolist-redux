import React, { useReducer, useEffect } from "react";
import axios from "axios";
export const todoContext = React.createContext()

const INIT_STATE = {
	todos: [],
	taskToEdit: null,
	editId: null,

}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case 'GET_TODOS_DATA':
			return { ...state, todos: action.payload }
		case 'EDIT_TODO':
			return { ...state, taskToEdit: action.payload }
		case 'EDIT_ID':
			return { ...state, editId: action.payload }
		case 'SEARCH_TODOS_DATA':
			return { ...state, todos: action.payload }
		case 'FILTER_TODOS_DATA':
			return {...state, todos: action.payload}
		default: return state
	}
}




const TodoContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)
	useEffect(() => {
		getTask()
	
	}, [])
	const getTask = async () => {
		const { data } = await axios('http://localhost:8000/todos')
		dispatch({
			type: "GET_TODOS_DATA",
			payload: data
		})

	}
	const postTask = async (newObj) => {
		await axios.post('http://localhost:8000/todos', newObj)
		getTask()
	}
	const deleteTask = async (id) => {
		await axios.delete(`http://localhost:8000/todos/${id}`)
		getTask()
	}
	const changeStatus = async (id) => {
		let { data } = await axios(`http://localhost:8000/todos/${id}`)
		await axios.patch(`http://localhost:8000/todos/${id}`, { status: !data.status })
		getTask()
	}

	const editTask = async (id) => {

		let { data } = await axios(`http://localhost:8000/todos/${id}`)
		dispatch({
			type: "EDIT_TODO",
			payload: data
		})

	}


	const getEditId = (id) => {
		dispatch({
			type: "EDIT_ID",
			payload: id
		})

	}
	const saveTask = async (newTask) => {
		await axios.patch(`http://localhost:8000/todos/${newTask.id}`, newTask)
		getTask()
	}

	const searchTask = async (searchValue) => {
		const { data } = await axios(`http://localhost:8000/todos/?q=${searchValue}`)
		dispatch({
			type: "SEARCH_TODOS_DATA",
			payload: data
		})
	}

	const filterTasks = async (endpoint) => {
		let {data} = await axios(`http://localhost:8000/todos${endpoint}`)
		dispatch({
			type: "FILTER_TODOS_DATA",
			payload: data
		})
	}


	return (
		<todoContext.Provider value={{
			todos: state.todos,
			taskToEdit: state.taskToEdit,
			editId: state.editId,
			postTask,
			deleteTask,
			changeStatus,
			editTask,
			getEditId,
			saveTask,
			searchTask,
			filterTasks
		}}>
			{children}
		</todoContext.Provider>
	)
}
export default TodoContextProvider