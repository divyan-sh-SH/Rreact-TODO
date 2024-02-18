import React, {useState} from 'react'
import { ToDoForm } from './ToDoForm'
import { ToDo } from './ToDo';
import {v4 as uuidv4} from 'uuid'
import { EditToDoForm } from './EditToDoForm';
uuidv4();


export const ToDoWrapper = () => {
    const [todos, setTodos] = useState([])
    const addToDo = todo => {
        setTodos([...todos, {id: uuidv4(), 
            task: todo, completed: false, isEditing: false}])
    }

    const toggleComplete = id => {
        setTodos(todos.map( todo =>
            id === todo.id ? {...todo, completed: !todo.completed} : todo
        ))
    }

    const deleteToDo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editToDo = id => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, isEditing: true} : todo))
    }

    const editTask = (value,id) => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, task: value, isEditing: false} : todo))
    }
    return (
        <div className='TodoWrapper'>
            <h1>Getting things done !!</h1>
            <ToDoForm addToDo={addToDo}/>
            { todos.map((todo, index) => (
                todo.isEditing ? 
                <EditToDoForm editTask={editTask} task={todo} key={index}/> : 
                <ToDo task={todo} key={index} 
                toggleComplete={toggleComplete} 
                deleteToDo={deleteToDo}
                editToDo={editToDo} />
            ))}
        </div>
    )
}