import React from 'react';
import './App.css';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import TodoContextProvider from './contexts/TodoContexts';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import Search from './components/Search/Search'
import Filter from './components/Filter/Filter';

const theme = createTheme({
  palette: {
    primary: {
			main: '#BC9C76',
		},
		secondary: {
			main: '#434346'
		}
  },
});
function App() {
	return (
		<ThemeProvider theme={theme}>
		<Container maxWidth="sm">
			<TodoContextProvider>

				<div className="App">
					<AddTodo />
					<Search/>
					<Filter/>
					<TodoList />
				</div>

			</TodoContextProvider>
		</Container>
		</ThemeProvider>
	);
}

export default App;
