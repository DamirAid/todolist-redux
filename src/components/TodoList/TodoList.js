import React, { useState, useEffect, useContext } from 'react';
import { todoContext } from '../../contexts/TodoContexts';
import { useDispatch, useSelector } from 'react-redux'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField'
import { fetchTodos, deleteTask, editTask, getEditId, saveTask, changeStatus } from '../../redux/actions';

const TodoList = () => {
	const taskToEdit = useSelector(state => state.todos.taskToEdit)
	const dispatch = useDispatch()
	const todos = useSelector(state => state.todos.asyncTodos)
	const editId = useSelector(state => state.todos.editId)
	const [newEditItem, setNewEditItem] = useState(taskToEdit)
	const [show, setShow] = useState(false)


	useEffect(() => {
		dispatch(fetchTodos())
	}, [])
	useEffect(() => {
		setNewEditItem(taskToEdit)
	}, [taskToEdit])

	const handleEditInput = (e) => {
		let newTask = {
			...newEditItem,
			task: e.target.value
		}
		setNewEditItem(newTask)

	}

	return (

		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{todos.map(item => {
				return (<ListItem key={item.id}>
					<Box sx={{ width: '70%', alignItems: 'center', flexWrap: 'nowrap', display: 'flex' }} className={item.status ? 'completed' : ''}>
						<ListItemIcon>
							<Checkbox
								id={`label-${item.id}`}
								type="checkbox"
								checked={item.status}
								onChange={() => dispatch(changeStatus(item.id))}
							/>
						</ListItemIcon>


						{show && item.id === editId
							?
							newEditItem ?

								<div className="edit_block">
									<TextField

										id="demo-helper-text-aligned-no-helper"
										label='Edit Task'
										value={newEditItem.task}
										onChange={handleEditInput}
										size="small"
									/>
									<Button
										sx={{ marginLeft: '10px' }}
										variant="contained"
										color="primary"
										onClick={() => {
											dispatch(saveTask(newEditItem))
											setShow(false)
										}}
									>
										<SaveOutlined />
									</Button>
								</div> : <h1>Loading</h1>

							: <label style={{ cursor: 'pointer' }} htmlFor={`label-${item.id}`}>{item.task}</label>}
					</Box>
					<Box sx={{ width: '30%', alignItems: 'center', flexWrap: 'nowrap', display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							sx={{ marginRight: '20px' }}
							variant="outlined"
							color="secondary"
							onClick={() => {
								dispatch(editTask(item.id))
								setShow(true)
								dispatch(getEditId(item.id))
							}}
						>
							<EditOutlinedIcon />
						</Button>
						<Button
							variant="outlined"
							color="error"
							onClick={() => {
								dispatch(deleteTask(item.id))
							}}
						>
							<DeleteOutlineOutlinedIcon />
						</Button>

					</Box>
				</ListItem>

				)
			})}
		</List>
	);
};


export default TodoList