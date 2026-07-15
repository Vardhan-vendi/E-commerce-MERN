import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FiArrowRight, 
  FiSmartphone, 
  FiSliders, 
  FiCpu, 
  FiShield, 
  FiDatabase, 
  FiCheckCircle 
} from "react-icons/fi";

const Intro = () => {
  const { userInfo } = useSelector((state) => state.user);

  const features = [
    {
      icon: <FiSmartphone className="text-violet-400 w-6 h-6" />,
      title: "Mobile Responsive Layout",
      description: "Optimized viewport boundaries, adaptive card scaling, and dynamic stacking carousel for seamless browsing across all screens."
    },
    {
      icon: <FiSliders className="text-pink-400 w-6 h-6" />,
      title: "Collapsible Shop Filters",
      description: "Category, Brand, and Price filters automatically collapse into mobile dropdown accordions, preserving screen space."
    },
    {
      icon: <FiCpu className="text-orange-400 w-6 h-6" />,
      title: "Decoupled Architecture",
      description: "Separated package.json structures for backend and frontend folders to ensure a modular, clean repository codebase."
    },
    {
      icon: <FiShield className="text-cyan-400 w-6 h-6" />,
      title: "Role-Based Security",
      description: "Protected routing and secure JWT cookie-based user authentication separating customer and administrative features."
    },
    {
      icon: <FiDatabase className="text-emerald-400 w-6 h-6" />,
      title: "High Performance ODM",
      description: "Custom Mongoose String ID mappings designed to match and fetch from cloud collections seamlessly."
    },
    {
      icon: <FiCheckCircle className="text-amber-400 w-6 h-6" />,
      title: "Full Admin Dashboard",
      description: "Comprehensive product CRUD, order history status tracking, user lists, and category controls."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080b11] text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative gradient background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-12 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300">
            <span>MERN Stack Portfolio Project</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-pink-400">
            MV Store
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            A premium full-stack e-commerce platform built to deliver high-fidelity glassmorphic layouts, secure checkout flows, and seamless database structures.
          </p>

          <div className="pt-4 flex justify-center">
            {userInfo ? (
              <Link
                to="/store"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-violet-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                ENTER STORE
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-violet-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                GET STARTED
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-white border-b border-white/10 pb-3">
            Project Architecture
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Frontend</span>
              <p className="text-sm font-semibold text-slate-200">React 19, Redux Toolkit</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Styling System</span>
              <p className="text-sm font-semibold text-slate-200">Tailwind CSS (Vite)</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Backend Engine</span>
              <p className="text-sm font-semibold text-slate-200">Node.js, Express 5</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cloud Database</span>
              <p className="text-sm font-semibold text-slate-200">MongoDB Atlas</p>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-center text-white">
            Core Features & Enhancements
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-violet-500/30 transition-all duration-300 flex flex-col space-y-3 group"
              >
                <div className="p-3 bg-white/5 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;
