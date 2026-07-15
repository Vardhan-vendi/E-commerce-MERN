import { apiSlice } from "./apiSlice.js"
import { ORDER_URI } from "../constants.js";
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URI,
        method: "POST",
        body: order,
      }),
    }),

    // Get order details by ID
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URI}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    // Pay order (manual fallback / admin update)
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URI}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    // Get personal orders
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URI}/mine`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    // Get all orders (Admin dashboard)
    getOrders: builder.query({
      query: () => ({
        url: ORDER_URI,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    // Deliver order (Admin operation)
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URI}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    // Initiate PhonePe Payment Gateway Transaction redirect
    initiatePhonePePayment: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URI}/phonepe/initiate`,
        method: "POST",
        body: { orderId },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useInitiatePhonePePaymentMutation,
} = orderApiSlice;