import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import shopReducer from '../features/shop/shopSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/user/userSlice'

import { shopApi } from '../services/shopService'
import { authenticatorApi } from '../services/authenticatorService'

import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore ({
    reducer:{
        shopReducer,
        cartReducer,
        authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authenticatorApi.reducerPath]: authenticatorApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authenticatorApi.middleware)
    //   EL MIDDLEWARE SIRVE PARA ACOPLAR AL MIDDLEWARE POR DEFECTO NUESTRA API PARA QUE SE PUEDAN REALIZAR LOS LLAMADOS ASINCRONOS
})

setupListeners( store.dispatch )

export default store