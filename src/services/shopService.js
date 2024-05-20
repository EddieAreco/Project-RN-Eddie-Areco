import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../databases/realtimeDatabase'

export const shopApi = createApi({

    reducerPath: "shopApi",
    //SE LE ASIGNA UN NOMBRE A LA API PARA EVITAR CONFLICTOS AL TENER MAS DE 1 API

    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['profileImageGet', 'locationGet', 'ordersGet'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
            // TRAEMOS LAS CATEGORIAS
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            // HACEMOS EL FILTRO EN BASE A LA CATEGORIA
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                return responseTransformed
            },
            //DEBIDO A QUE REAL TIME DATABASE NOS DEVUELVE LOS VALORES, AL HACER UN FILTRO, COMO UN OBJETO, TENEMOS QUE TRANSFORMAR ESO EN UN ARRAY USANDO OBJECT.
        }),
        getProductsById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            // HACEMOS EL FILTRO EN BASE AL ID
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)

                console.log('responseTransformed', responseTransformed)
                if (responseTransformed.length) return responseTransformed[0]

                return responseTransformed
            },
        }),
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
                url: 'orders.json',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['ordersGet']
        }),
        //ESTE ES EL ENDPOINT PARA CREAR LA ORDEN, Y SE HACE UNA MUTATION PORQUE SE VAN A ALTERAR DATOS DENTRO DE LA DATABASE(db)
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image,
                },
            }),
            invalidatesTags: ['profileImageGet']
        }),
        //EN ESTE ENDPOINT LO QUE SE HACE, ES USAR EL METODO PUT PARA QUE NO SE GENERE UN NUEVO ID EN RTDB YA QUE VAMOS A USAR UNO GENERADO POR NOSOTROS
        getLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            providesTags: ['locationGet']
        }),
        postLocation: builder.mutation({
            query: ({ location, localId }) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    dateLocation: location.dateLocation,
                    user: location.user,
                },
            }),
            invalidatesTags: ['locationGet']
        }),
        getOrders: builder.query({
            query: () => `orders.json`,
            providesTags: ['ordersGet']
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductsByIdQuery,
    usePostOrderMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetLocationQuery,
    usePostLocationMutation,
    useGetOrdersQuery,
} = shopApi
// HACEMOS LA EXPORTACION EN FOMRA DE HOOKS