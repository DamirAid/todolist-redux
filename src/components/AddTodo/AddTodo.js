import React, { useState } from 'react';

import { useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import { addTask } from '../../redux/actions';
// import  Add  from '@mui/icons-material'
const AddTodo = () => {
	const [inpValue, setInpValue] = useState('')

	const dispatch = useDispatch()
	const handleAddClick = () => {
		let newTask = {
			task: inpValue,
			status: false
		}

		dispatch(addTask(newTask))
	

		
		setInpValue('')

	}
	return (
		<div>
			<Grid container spacing={2} style={{ marginBottom: '20px' }}>
				<Grid item sm={8}>
					<TextField
						id="outlined-required"
						label="Add Task"
						type="text"
						fullWidth={true}
						value={inpValue}
						onChange={(e) => setInpValue(e.target.value)}
					/>
				</Grid>
				<Grid item sm={4}>
					<Button
						variant="contained"
						endIcon={<Add />}
						fullWidth={true}
						onClick={handleAddClick}
						sx={{ color: '#fff', height: '100%' }}
					>
						Add
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};


export default AddTodo;