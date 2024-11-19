import {configureStore} from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import  basketReducer from './features/BasketSlices'
import authReducer from './features/AuthSlice'
import orderReducer from './features/OrderSlice'
export const store = configureStore({
        reducer:{
            products:productReducer,
            basket: basketReducer,
            auth: authReducer,
            order: orderReducer
        }

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
