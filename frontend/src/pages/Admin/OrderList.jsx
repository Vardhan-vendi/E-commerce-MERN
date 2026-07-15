import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrdersQuery,
  useDeliverOrderMutation,
} from "../../redux/api/orderApiSlice.js";
import { FaCheckCircle, FaTimesCircle, FaTruck, FaReceipt } from "react-icons/fa";

const OrderList = () => {
  const navigate = useNavigate();

  // Fetch all orders
  const { data: orders = [], isLoading, refetch } = useGetOrdersQuery();
  
  // Deliver mutation
  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();

  const handleDeliver = async (orderId) => {
    try {
      await deliverOrder(orderId).unwrap();
      toast.success("Order marked as delivered successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to update delivery status");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight flex items-center flex-wrap gap-3">
          <span>Order Management Dashboard</span>
          <span className="text-sm font-bold border border-white/45 text-white bg-white/5 px-2.5 py-1 rounded-lg">
            {orders.length} Orders
          </span>
        </h2>
      </div>

      {/* Orders List Container */}
      <div className="flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
        {orders.length > 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-white/5">
                    <th className="py-4 px-5">Order ID</th>
                    <th className="py-4 px-5">Customer</th>
                    <th className="py-4 px-5">Date Placed</th>
                    <th className="py-4 px-5 text-center">Payment Status</th>
                    <th className="py-4 px-5 text-center">Delivery Status</th>
                    <th className="py-4 px-5 text-right">Amount Charged</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {orders.slice().reverse().map((order) => (
                    <tr key={order._id} className="hover:bg-white/5 transition-colors">
                      {/* ID */}
                      <td className="py-4 px-5 font-mono text-purple-300 truncate max-w-[120px]">
                        {order._id}
                      </td>

                      {/* Customer Username */}
                      <td className="py-4 px-5 font-semibold text-white">
                        {order.user?.username || "Guest Customer"}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5 text-slate-400 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      {/* Payment Status */}
                      <td className="py-4 px-5 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                          order.isPaid 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}>
                          {order.isPaid ? <FaCheckCircle /> : <FaTimesCircle />}
                          <span>{order.isPaid ? "Paid" : "Pending"}</span>
                        </span>
                      </td>

                      {/* Delivery Status */}
                      <td className="py-4 px-5 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                          order.isDelivered 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}>
                          {order.isDelivered ? <FaCheckCircle /> : <FaTimesCircle />}
                          <span>{order.isDelivered ? "Delivered" : "In Transit"}</span>
                        </span>
                      </td>

                      {/* Total Price */}
                      <td className="py-4 px-5 text-right font-bold text-white">
                        ${order.totalPrice.toFixed(2)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Invoice Detail link */}
                          <button
                            onClick={() => navigate(`/order/${order._id}`)}
                            className="p-2 rounded-lg bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 active:scale-95"
                            title="View Invoice"
                          >
                            <FaReceipt />
                            <span className="hidden md:inline">Invoice</span>
                          </button>

                          {/* Quick Deliver Toggle */}
                          {order.isPaid && !order.isDelivered && (
                            <button
                              onClick={() => handleDeliver(order._id)}
                              disabled={isDelivering}
                              className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 active:scale-95"
                              title="Mark as Delivered"
                            >
                              <FaTruck />
                              <span className="hidden md:inline">Deliver</span>
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full text-center py-20 border border-dashed border-purple-500/20 rounded-3xl bg-purple-950/5">
            <p className="text-slate-400 text-sm">No orders placed on the store yet.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default OrderList;