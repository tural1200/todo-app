import React, { useState } from 'react'
import uuid from '../node_modules/uuid/dist/v4'
import './style.css'

function TodoApp() {

    const [todo, setTodo] = useState('')
    const handleChange = e => {
        setTodo(e.target.value)
    }

    const [todoList, setTodoList] = useState([]);
    
    const handleSubmit = e => {
        e.preventDefault();
        if (todo !== "") {
            const newTodo = {
                id: uuid(),
                value: todo,
                complated: false
            }

            setTodoList([...todoList, newTodo])
        }

        setTodo('')
    }

    const removeTodo = id => {
        setTodoList(todoList.filter((t) => t.id !== id))
        
    }

    const IsComplated = (id) => {
        
        const element = todoList.findIndex(item => item.id === id)
        
        const newTodoList = [...todoList];
        newTodoList[element] = {
            ...newTodoList[element], complated: true
        }

        setTodoList(newTodoList);
    }
    
    

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input 
                value={todo}
                onChange={handleChange}
                />
                <button>ADD</button>
            </form>
            <h1>Your todos:</h1>
            {todoList !== [] ? (
                <ul>
                {todoList.map(item => 
                    <li className={item.complated ? 'complated' : 'not-complated'} key={item.id}>
                        {item.value}
                        <div className="buttons">
                            <button onClick={() => removeTodo(item.id)}>remove</button>
                            <button onClick={() => IsComplated(item.id)}><i className={item.complated ? 'fas fa-check' : 'far fa-circle'}></i></button>
                        </div>
                    </li>)}
                </ul>
            )
            :null
            }


        </div>
    )
}

export default TodoApp
