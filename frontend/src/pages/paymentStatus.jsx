import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-pulse">
        <FaCheckCircle className="text-emerald-400 text-4xl" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Thank you for your purchase. Your transaction reference is:
        </p>
        <code className="block bg-white/5 border border-white/10 rounded-lg py-1 px-3 text-xs text-purple-300 font-mono w-fit mx-auto">
          {transactionId || "N/A"}
        </code>
      </div>

      <button
        onClick={() => navigate("/shopping")}
        className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentStatus;
