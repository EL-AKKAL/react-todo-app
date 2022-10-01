import React from "react";

export default function Todo({ todo, toggleTodoCheck }) {
     function handleTodoClick() {
          toggleTodoCheck(todo.id);
     }
     return (
          <div
               id={todo.id}
               className="w-full text-lg border-t-2 border-blue-500 my-2 mb-3 flex hover:text-blue-600"
          >
               <label htmlFor="Checker" className="cursor-pointer">
                    <input
                         id="Checker"
                         type="checkbox"
                         className="w-8 h-5 mt-5"
                         defaultChecked={todo.complete}
                         onChange={handleTodoClick}
                    />
                    {todo.name}
               </label>
          </div>
     );
}
