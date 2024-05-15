import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({

    name: 'counter', //DEFINIR UN NOMBRE PARA EL SLICE
    initialState:{
        value: 0
    }, //DEFINIR UN ESTADO INICIAL PARA EL SLICE, EN ESTA CASO AL SER UN CONTADOR, ES UN NUMERO PERO PUEDE SER UN STRING O BOOLEAN, ETC
    reducers:{
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -=1
        },
        incrementByAmount: (state, action) => { 
            // COMO EN ESTE CASO, LAS ACCIONES PUEDEN RECIBIR MAS 1 PARAMETRO
            state.value += action.payload
        },
        reset: state =>{
            state.value = 0
        },
    } //DEFINIR LAS ACCIONES QUE QUEREMOS QUE SE EJECUTEN EN LOS COMPONENTES
})

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

export default counterSlice.reducer