import {PRODUCT_URI,UPLOAD_URI} from '../constants.js';
import {apiSlice }from './apiSlice.js';



export const productApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder)=>({
        getProducts :builder.query({
            query :({keyword})=>({
                url : `${PRODUCT_URI}`,
                params :{keyword},
                method :'GET'
            }),
            keepUnusedDataFor :5,
            providesTags :["Product"]
        }),
        getProductById :builder.query({
            query : (productId)=>({
                url : `${PRODUCT_URI}${productId}`,
                method :'GET'
            }),providesTags :(result,error,productId)=>[

                {type :"Product",idn:productId},
            ]
            
        }),
        getAllProducts : builder.query({
            query :()=>({
                url :`${PRODUCT_URI}/allproducts`,
                method :'GET'
            }),
            providesTags: ["Product"],

        }),
        getProductDetails : builder.query({
            query : (productId)=>({
                url : `${PRODUCT_URI}/${productId}`,
                method :'GET'
            }),
            keepUnusedDataFor : 5,
        }),

        createProduct : builder.mutation({
            query : (productData)=>({
                url : `${PRODUCT_URI}`,
                method :'POST',
                body : productData
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct : builder.mutation({
            query : ({productId,formData})=>({
                url : `${PRODUCT_URI}/${productId}`,
                method : 'PUT',
                body : formData,
            }),
             invalidatesTags: ["Product"],
        }) , 

        deleteProduct : builder.mutation({
            query : (productId)=>({
                url: `${PRODUCT_URI}/${productId}`,
                method: 'DELETE',
        
            }),
           invalidatesTags: ["Product"],
        }),


        createReview : builder.mutation({
            query :(data)=>({
                url :`${PRODUCT_URI}/${data.productId}/reviews`,
                method : 'POST',
                body : data
            }),

        }),

        getTopProducts : builder.query({
            query :()=>({
                url : `${PRODUCT_URI}/topProducts`,
                method :'GET'
            }),
            keepUnusedDataFor: 5,
        }),
        getNewProducts : builder.query({
            query :()=>({
                url : `${PRODUCT_URI}/newProducts`,
                method :'GET'
            }),
            keepUnusedDataFor : 5
        }),

        uploadProductImage : builder.mutation({
            query: (data)=>({
                url :`${UPLOAD_URI}`,
                method :'POST',
                body :data
            })
        })

    })
})



export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImageMutation
} = productApiSlice