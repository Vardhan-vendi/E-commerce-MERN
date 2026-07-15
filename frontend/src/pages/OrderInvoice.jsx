import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../redux/api/OrderApiSlice.js";
import {
  FaPrint,
  FaArrowLeft,
  FaReceipt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const OrderInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch order details from RTK Query
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

  const handlePrint = () => {
    window.print(); // Triggers native browser print dialog
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">Error loading invoice details.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-purple-400 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] bg-[#0b0c10] print:bg-white print:p-0 print:text-black">
      {/* ── Print Specific CSS Overrides ── */}
      <style>{`
        @media print {
          /* Hide everything else on the screen */
          body * {
            visibility: hidden;
          }
          /* Only make the invoice card and its contents visible */
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          /* Reset margins, borders, and backgrounds for clean print paper */
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* ── Top Bar Controls (Hidden during Printing) ── */}
      <div className="flex justify-between items-center print:hidden pb-4 border-b border-white/10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <FaArrowLeft /> Go Back
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95"
        >
          <FaPrint /> Print Invoice
        </button>
      </div>

      {/* ── Printable Invoice Card ── */}
      <div
        id="printable-invoice"
        className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl print:border-none print:shadow-none print:p-0 print:text-black print:bg-white relative overflow-hidden"
      >
        {/* ── Print Background Watermark (Only visible when printing) ── */}
        <div className="hidden print:flex absolute inset-0 items-center justify-center pointer-events-none opacity-[0.04] select-none z-0">
          <span className="text-[90px] sm:text-[130px] font-black tracking-[0.25em] -rotate-45 text-black">
            VARDHAN
          </span>
        </div>

        {/* Wrapper to force content on top of watermark */}
        <div className="relative z-10 space-y-8">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-white/10 print:border-black/10 pt-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 select-none">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center border border-white/20 print:bg-black print:border-black">
                <span className="text-white font-black text-2xl tracking-tighter">
                  MV
                </span>
              </div>
              <div className="flex flex-col text-left">
                <h1 className="text-xl font-black tracking-[0.18em] text-white print:text-black leading-none">
                  MV{" "}
                  <span className="text-purple-400 print:text-black font-light">
                    STORE
                  </span>
                </h1>
                <span className="text-[8px] uppercase tracking-[0.35em] text-slate-400 print:text-slate-600 mt-1.5 font-bold">
                  EST. 2026
                </span>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="text-left sm:text-right space-y-1">
              <h2 className="text-lg font-bold text-white print:text-black tracking-wider flex items-center gap-2 sm:justify-end">
                <FaReceipt className="text-purple-400 print:text-black text-sm" />{" "}
                INVOICE
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600 font-mono">
                ID: {order._id}
              </p>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Billing & Address Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-white/10 print:border-black/10">
            {/* Client Details */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-purple-400 print:text-black uppercase tracking-wider">
                Bill To
              </h3>
              <div className="text-sm text-slate-300 print:text-black space-y-1">
                <p className="font-bold text-white print:text-black">
                  {order.user?.username || "Customer"}
                </p>
                <p className="text-xs text-slate-400 print:text-slate-600">
                  {order.user?.email}
                </p>
                <p className="text-xs text-slate-400 print:text-slate-600 mt-2">
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city}, <br />
                  {order.shippingAddress?.postalCode},{" "}
                  {order.shippingAddress?.country}
                </p>
              </div>
            </div>

            {/* Payment & Order Summary */}
            <div className="space-y-3 md:text-right">
              <h3 className="text-xs font-bold text-pink-400 print:text-black uppercase tracking-wider">
                Payment Information
              </h3>
              <div className="text-xs text-slate-300 print:text-black space-y-1.5">
                <p>
                  Method:{" "}
                  <span className="font-semibold text-white print:text-black">
                    {order.paymentMethod}
                  </span>
                </p>

                <div className="flex items-center gap-1.5 md:justify-end">
                  <span>Payment Status:</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      order.isPaid
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 print:text-emerald-700 print:border-emerald-500"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30 print:text-amber-700 print:border-amber-500"
                    }`}
                  >
                    {order.isPaid ? <FaCheck /> : <FaTimes />}
                    {order.isPaid ? "PAID" : "UNPAID"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 md:justify-end">
                  <span>Delivery Status:</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      order.isDelivered
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 print:text-emerald-700 print:border-emerald-500"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30 print:text-blue-700 print:border-blue-500"
                    }`}
                  >
                    {order.isDelivered ? <FaCheck /> : <FaTimes />}
                    {order.isDelivered ? "DELIVERED" : "IN TRANSIT"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm print:text-black">
              <thead>
                <tr className="border-b border-white/10 print:border-black/10 text-slate-400 print:text-black font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3">Product Item</th>
                  <th className="py-3 text-center">Unit Price</th>
                  <th className="py-3 text-center">Quantity</th>
                  <th className="py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print:divide-black/5 text-slate-300 print:text-black font-medium">
                {order.orderItems.map((item) => (
                  <tr key={item._id}>
                    <td className="py-4 font-semibold text-white print:text-black">
                      {item.name}
                    </td>
                    <td className="py-4 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-4 text-center">{item.qty}</td>
                    <td className="py-4 text-right font-bold text-white print:text-black">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Subtotal summary */}
          <div className="flex justify-end pt-4">
            <div className="w-full sm:w-72 space-y-3 text-xs sm:text-sm text-slate-400 print:text-black">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white print:text-black font-semibold">
                  ${order.itemsPrice?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="text-white print:text-black font-semibold">
                  ${order.shippingPrice?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (15%):</span>
                <span className="text-white print:text-black font-semibold">
                  ${order.taxPrice?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 print:border-black/10 pt-3 text-base">
                <span className="font-bold text-purple-400 print:text-black uppercase">
                  Grand Total:
                </span>
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 print:text-black print:bg-none print:font-black text-lg">
                  ${order.totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
