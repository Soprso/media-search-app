import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    items:JSON.parse(localStorage.getItem('collection')) || []
}

const collectionSlice = createSlice({
    name:'collection',
    initialState,
    reducers:{
        addCollection:(state,action)=>{
            const alreadyExists = state.items.find(
                item => item.id == action.payload.id
            )
            if(!alreadyExists){
                state.items.push(action.payload)
            localStorage.setItem('collection',JSON.stringify(state.items))
            }
        },
        removeCollection:(state,action)=>{
            state.items = state.items.filter(
                item=> item.id !=action.payload
            )
        },
        clearCollection:(state,action)=>{

        }
    }
})