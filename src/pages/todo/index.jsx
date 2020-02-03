import React from 'react';
import AddTodo from 'pages/todo/containers/addTodo';
import VisibleTodoList from 'pages/todo/containers/visibleTodoList';
import Footer from './footer';

export const Todo = () => (  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div> )
  

export default Todo