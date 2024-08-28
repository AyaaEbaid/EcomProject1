import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
   brands:[],
   
}
export let getBrands=createAsyncThunk("brands/getBrands",
    async function(){
      let{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      return data;
    }
)



let productSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        increament: (state) => {
            state.counter++
        },
        decreament: (state) => {
            state.counter--;
        },
        increamentByValue: (state,action) => {
            state.counter+=action.payload;
        },
        
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getBrands.fulfilled ,(state,action)=>{
            state.brands=action.payload;

        })
        // builder.addCase(getCategory.fulfilled ,(state,action)=>{
        //     state.cat=action.payload;

        // })
      

    }
})
export let {increament,decreament,increamentByValue}=productSlice.actions;
 
export let productReducer=productSlice.reducer;