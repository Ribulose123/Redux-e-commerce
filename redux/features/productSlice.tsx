import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
    
}

interface ProductState{
    items:Product[];
    loading: boolean;
    error: string | null;
}

const initialState : ProductState ={
        items:[],
        loading:false,
        error: null
}

export const fetchProduct = createAsyncThunk('products/fetchProducts', async()=>{
    const res = await axios.get<Product[]>('https://fakestoreapi.com/products')
    return res.data
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchProduct.pending, (state)=>{
            state.loading=true
            state.error = null
            
        })
        .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.loading = false;
          })

        .addCase(fetchProduct.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch products'
        })  
    },

})

export default productSlice.reducer


