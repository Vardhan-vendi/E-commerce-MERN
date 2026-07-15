import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FiArrowRight, 
  FiSmartphone, 
  FiSliders, 
  FiCpu, 
  FiShield, 
  FiDatabase, 
  FiCheckCircle, 
  FiCreditCard, 
  FiPrinter,
  FiActivity
} from "react-icons/fi";

const Intro = () => {
  const { userInfo } = useSelector((state) => state.user);

  const features = [
    {
      icon: <FiSmartphone className="text-violet-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-violet-500/20 to-purple-500/5 border-violet-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)]",
      title: "Mobile Responsive Layout",
      description: "Optimized viewport boundaries, adaptive card scaling, and dynamic scrollbars for seamless browsing across all screen sizes."
    },
    {
      icon: <FiSliders className="text-pink-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-pink-500/20 to-rose-500/5 border-pink-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.4)]",
      title: "Collapsible Shop Filters",
      description: "Category, Brand, and Price filters automatically collapse into mobile dropdown panels, preserving precious screen space."
    },
    {
      icon: <FiCreditCard className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-amber-500/20 to-yellow-500/5 border-amber-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.4)]",
      title: "Paytm Payment Gateway",
      description: "Simulated sandbox payment environment featuring automatic transaction status checking and instant invoice generation."
    },
    {
      icon: <FiPrinter className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-cyan-500/20 to-blue-500/5 border-cyan-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]",
      title: "Watermarked Print Invoices",
      description: "Print-optimized invoices that hide UI elements when printing, featuring a custom VARDHAN background watermark."
    },
    {
      icon: <FiCheckCircle className="text-emerald-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)]",
      title: "Admin Dashboard Control",
      description: "Comprehensive product CRUD, category management, user profiles control, and order delivery status dispatching."
    },
    {
      icon: <FiCpu className="text-orange-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-orange-500/20 to-amber-500/5 border-orange-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.4)]",
      title: "Decoupled Architecture",
      description: "Separated package structures for backend routes and frontend viewports to ensure modular, clean directory structures."
    }
  ];

  const stats = [
    { value: "< 150ms", label: "Query Latency", desc: "Optimized indexing" },
    { value: "100%", label: "Mobile Optimized", desc: "Fluid layouts" },
    { value: "Zero", label: "Transaction Fees", desc: "Mock integration" },
    { value: "JWT", label: "Secure Auth", desc: "HttpOnly Cookies" }
  ];

  const techStack = [
    { label: "Frontend State", value: "React 19 & Redux Toolkit", accent: "border-violet-500/30 text-violet-300", status: "Live" },
    { label: "Styling System", value: "Tailwind CSS & Glassmorphism", accent: "border-pink-500/30 text-pink-300", status: "Active" },
    { label: "Backend Core", value: "Node.js & Express 5", accent: "border-orange-500/30 text-orange-300", status: "Connected" },
    { label: "Cloud Database", value: "MongoDB Atlas Cloud", accent: "border-cyan-500/30 text-cyan-300", status: "Online" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium background grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Layered vibrant neon background glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-20 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-violet-300 shadow-inner backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
            <span>MERN Stack Portfolio Showcase</span>
          </div>

          {/* Glowing Brand Monogram */}
          <div className="flex justify-center pt-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center border border-white/20 shadow-xl shadow-purple-500/20 select-none">
              <span className="text-white font-black text-3xl tracking-tighter">MV</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-500 drop-shadow-sm leading-none pb-2">
            MV Store
          </h1>

          <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            Welcome to a premium e-commerce platform built using high-fidelity glassmorphism, responsive interface viewports, and clean decoupled structures.
          </p>

          {/* CTA Buttons */}
          <div className="pt-6 flex justify-center">
            {userInfo ? (
              <Link
                to="/shopping" // Corrected redirect target path
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-extrabold px-10 py-4 rounded-2xl shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-105 active:scale-95 text-base overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
                ENTER STORE
                <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300 w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-extrabold px-10 py-4 rounded-2xl shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-105 active:scale-95 text-base overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
                GET STARTED
                <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300 w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* ── Key Performance Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center space-y-1 shadow-lg backdrop-blur-xl"
            >
              <h4 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {stat.value}
              </h4>
              <p className="text-xs font-bold text-white uppercase tracking-wider">{stat.label}</p>
              <p className="text-[10px] text-slate-500">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Project Architecture Grid */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase text-center sm:text-left flex items-center gap-2">
            <FiActivity className="text-purple-400" /> Technology Infrastructure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 hover:bg-slate-900/60 transition-all duration-300"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 uppercase tracking-wider font-semibold">
                    {tech.label}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {tech.status}
                  </span>
                </div>
                <p className={`text-sm sm:text-base font-bold mt-2.5 ${tech.accent}`}>
                  {tech.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Core Enhancements
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Optimized layouts and custom backend flows built for premium user performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:bg-slate-900/30 hover:border-white/10 transition-all duration-300 flex flex-col space-y-4 group hover:-translate-y-1.5 ${feature.glow}`}
              >
                <div className={`p-3 bg-gradient-to-br ${feature.color} border rounded-xl w-fit transition-all duration-300`}>
                  {feature.icon}
                </div>
                <div className="space-y-1.5 flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;