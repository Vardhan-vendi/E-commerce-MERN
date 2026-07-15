
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/OrderApiSlice.js";
import { useGetAllProductsQuery } from "../../redux/api/ProductApiSlice.js";
import { useGetUsersQuery } from "../../redux/api/UsersApiSlice.js"; // Adjust import to your user slice
import { FaDollarSign, FaBoxes, FaUsers, FaShoppingCart, FaChartLine, FaArrowRight } from "react-icons/fa";

// Import Recharts components for real graphic visual effects
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fetch dashboard stats from backend
  const { data: ordersData = [], isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: productsResponse = {}, isLoading: productsLoading } = useGetAllProductsQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  const products = Array.isArray(productsResponse)
    ? productsResponse
    : productsResponse?.products || [];

  // Calculate stats
  const totalSales = ordersData
    .filter((order) => order.isPaid)
    .reduce((acc, order) => acc + order.totalPrice, 0);

  const totalOrders = ordersData.length;
  const totalCustomers = users.length;
  const totalProducts = products.length;

  // ── Prepare Dynamic Chart Data ──
  // Formats paid orders chronologically to plot on the area chart
  const chartData = ordersData
    .filter((order) => order.isPaid)
    .map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      Amount: Number(order.totalPrice.toFixed(2)),
    }));

  // Fallback dummy chart data if database has no orders yet (to keep visual integrity)
  const finalChartData = chartData.length > 0 ? chartData : [
    { date: "Jan", Amount: 200 },
    { date: "Feb", Amount: 450 },
    { date: "Mar", Amount: 300 },
    { date: "Apr", Amount: 800 },
    { date: "May", Amount: 600 },
    { date: "Jun", Amount: 950 },
    { date: "Jul", Amount: 1200 },
  ];

  // Custom Glassmorphic Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="text-slate-400 font-medium">{label}</p>
          <p className="text-white font-bold text-sm">
            Revenue: <span className="text-purple-400">${payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const isLoading = ordersLoading || productsLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-l-4 border-purple-500 pl-3">
          ADMIN DASHBOARD
        </h1>
        <p className="text-slate-400 text-xs mt-1">Real-time store overview, analytics, and activity monitoring</p>
      </div>

      {/* ── KPI Stats Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Sales Card */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-1 z-10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sales</p>
            <h3 className="text-2xl font-black text-white">${totalSales.toFixed(2)}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <FaDollarSign className="text-xl" />
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-1 z-10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl font-black text-white">{totalOrders}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <FaShoppingCart className="text-lg" />
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-1 z-10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customers</p>
            <h3 className="text-2xl font-black text-white">{totalCustomers}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
            <FaUsers className="text-lg" />
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-1 z-10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl font-black text-white">{totalProducts}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <FaBoxes className="text-lg" />
          </div>
        </div>

      </div>

      {/* ── Analytics Graphic Chart & Actions Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Real Dynamic Graph (Recharts AreaChart) */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FaChartLine className="text-purple-400" /> Store Sales Growth
            </h3>
            <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full font-semibold">
              Live Chart
            </span>
          </div>

          {/* Recharts Wrapper (Fully Responsive) */}
          <div className="h-64 w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={finalChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Glowing purple-to-transparent area fill gradient */}
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="Amount"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
            Quick Actions
          </h3>

          <div className="space-y-3 flex-1 pt-3">
            <Link to="/admin/product/create" className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-colors group">
              <span>Add New Product</span>
              <FaArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admin/productList" className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-colors group">
              <span>Manage Products</span>
              <FaArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admin/categoryList" className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-colors group">
              <span>Manage Categories</span>
              <FaArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

      {/* ── Recent Transactions Table ── */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Recent Orders
          </h3>
          <span className="text-xs text-slate-400">{ordersData.slice(-5).length} Pending Deliveries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3">Order ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3 text-center">Payment Status</th>
                <th className="py-3 text-center">Delivery Status</th>
                <th className="py-3 text-right">Amount</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {ordersData.slice(-5).reverse().map((order) => (
                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-purple-300 truncate max-w-[120px]">{order._id}</td>
                  <td className="py-4 font-semibold text-white">{order.user?.username || "Guest"}</td>
                  
                  <td className="py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.isPaid ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>

                  <td className="py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.isDelivered ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      {order.isDelivered ? "Delivered" : "In Transit"}
                    </span>
                  </td>

                  <td className="py-4 text-right font-bold text-white">${order.totalPrice.toFixed(2)}</td>
                  
                  <td className="py-4 text-right">
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="px-3 py-1 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600 hover:text-white rounded-lg text-xs font-semibold text-purple-400 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;