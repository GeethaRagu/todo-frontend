import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// const initialState = {
//     todos: [],
   
//   };

  const todoSlice = createSlice({
    name:"todo",
    initialState:[],
    reducers:{
        savetodo :(state,action) =>{
            //state.todos = action.payload;
            return action.payload
        },
        deletetodo:(state,action)=>{
            let {id} = action.payload;
            return state.filter((todo)=>todo.id !== id);
            
        }
    }
  }) 
  export const {savetodo} = todoSlice.actions;
  export default todoSlice.reducer;