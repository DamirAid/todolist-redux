import React, { useContext, useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { todoContext } from '../../contexts/TodoContexts';



const Search = () => {
	const {searchTask} = useContext(todoContext)
	const [value, setValue] = useState('')
	useEffect(() => {
	
		searchTask(value)
	}, [value])	
	
	return (
		<div style={{marginBottom: '30px'}}>
			<TextField
				onChange={(e) => setValue(e.target.value)}
				fullWidth={true}
				label="Search task"
				InputProps={{
					type: 'search',
				}}
			/>

		</div>
	);
};

export default Search;