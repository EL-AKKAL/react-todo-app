// --------------------------app imports--------------------------
// use ref allows us to reference elements inside our html
// useEffect to do something anytime the second parameter channged
// use effect with empty array means the function runs once when the page load
import React, { useState, useRef, useEffect } from "react";
// generate random id
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import TodoList from "./TodoList";
import background from "./background.jpg";

// ---------------------------------------------------------------

// local storage key to save our data
const LocalStorageKey = "TodosApplication";
// ____________________________Main Function_____________________________
function App() {
     //  useState always accepts an array
     const [todos, setTodos] = useState([]);
     // assign the reference to our variable
     const TodoInputRef = useRef();

     useEffect(() => {
          const storedData = JSON.parse(localStorage.getItem(LocalStorageKey));
          if (storedData) setTodos(storedData);
     }, []);

     useEffect(() => {
          if (todos.length !== 0)
               localStorage.setItem(LocalStorageKey, JSON.stringify(todos));
     }, [todos]);

     function toggleTodoCheck(TodoId) {
          const newTodos = [...todos];
          const todo = newTodos.find((todo) => todo.id === TodoId);
          todo.complete = !todo.complete;
          setTodos(newTodos);
     }
     // *********************the function for adding a todo to the list*******
     function UpdateTodos(event) {
          const TodoName = TodoInputRef.current.value;
          if (TodoName === "") return;

          // add todo
          setTodos((prevTodos) => {
               return [
                    ...prevTodos,
                    { id: uuidv4(), name: TodoName, complete: false },
               ];
          });
          TodoInputRef.current.value = null;
     }
     function ClearTodos() {
          const newUnfinishedListTodos = todos.filter((todo) => !todo.complete);
          setTodos(newUnfinishedListTodos);
     }
     // ******************************************************************

     // ##########################Return results for main function##############
     return (
          <div className=" w-full bg-[#f1cffc] h-screen flex items-center justify-center flex-col">
               <div className="shadow-2xl  w-[480px] h-52 rounded-t-3xl overflow-hidden">
                    <img src={background} alt="Todo" />
               </div>
               <div className="bg-slate-200 w-[480px] flex items-center justify-center flex-col rounded-b-2xl">
                    <div className="flex items-center justify-center w-full p-4">
                         <input
                              ref={TodoInputRef}
                              type="text"
                              className="w-4/6 py-2 border-2 border-blue-500 rounded-lg shadow-md"
                         />
                         <button
                              onClick={UpdateTodos}
                              className="transition ease-in duration-150 w-9 leading-6 capitalize bg-blue-400 text-white p-4 py-1 font-bold rounded-full ml-2 hover:bg-blue-500 flex items-center justify-center"
                         >
                              +
                         </button>
                    </div>
                    <div className="my-4 overflow-x-hidden overflow-y-auto !h-[300px] mx-3 w-3/4 ">
                         <TodoList
                              todos={todos}
                              toggleTodoCheck={toggleTodoCheck}
                         />
                    </div>
                    <div className="flex my-3 mb-4 items-center justify-between w-3/4">
                         <div className="font-bold text-[#af7eeb] flex items-center justify-center">
                              {todos.filter((todo) => !todo.complete).length}{" "}
                              left todos
                         </div>
                         <button
                              onClick={ClearTodos}
                              className="capitalize transition ease-in duration-150 bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 font-bold rounded-lg"
                         >
                              clear completed
                         </button>
                    </div>
               </div>
          </div>
     );
     //#########################################################################
}
// _____________________________________________________________________

// export the main function
export default App;
