import { apiSlice } from "./apiSlice";
import { USER_URl } from "../constants.js";

export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        register : builder.mutation({
            query :(data)=>({
                url : `${USER_URl}/register`,
                method : 'POST',
                body : data,
            }),
        }),

        login : builder.mutation({
            query : (data)=>({
                url : `${USER_URl}/login`,
                method :'POST',
                body: data,
            })
        }),


    }),
});


export const {useRegisterMutation,useLoginMutation}  = userApiSlice