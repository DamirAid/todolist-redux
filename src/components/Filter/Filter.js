import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { todoContext } from '../../contexts/TodoContexts';
const Filter = () => {
	const { filterTasks } = useContext(todoContext)
	const [active, setActive] = useState({ active: '' })
	useEffect(() => {
		if (active.active === 'all') {
			setActive({ active: '' })
		} else {
			setActive({ active: 'all' })
		}	
	}, [])
	return (
		<div style={{ marginBottom: '30px' }}>
			<Button id='all'

				variant={active.active === 'all' ? "contained" : 'outlined'}
				onClick={(e) => {
					filterTasks('/')
					const clicked = e.target.id
					if (active.active === clicked) {
						setActive({ active: '' })
					} else {
						setActive({ active: clicked })
					}
				}}
			>
				All
			</Button>
			<Button
				id='complete'
				variant={active.active === 'complete' ? "contained" : 'outlined'}
				onClick={(e) => {
					filterTasks('?status=true')
					const clicked = e.target.id
					if (active.active === clicked) {
						setActive({ active: '' })
					} else {
						setActive({ active: clicked })
					}
				}}
			>
				Complete
			</Button>
			<Button
				id='incomplete'
				variant={active.active === 'incomplete' ? "contained" : 'outlined'}
				onClick={(e) => {
					filterTasks('?status=false')
					const clicked = e.target.id
					if (active.active === clicked) {
						setActive({ active: '' })
					} else {
						setActive({ active: clicked })
					}
				}}
			>
				Incomplete
			</Button>
		</div>
	);
};

export default Filter;