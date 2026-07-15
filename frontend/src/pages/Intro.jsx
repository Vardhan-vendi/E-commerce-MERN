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
  FiLock,
  FiServer,
  FiCreditCard
} from "react-icons/fi";
import { 
  SiMongodb, 
  SiReact, 
  SiRedux, 
  SiNodedotjs, 
  SiTailwindcss 
} from "react-icons/si";

const Intro = () => {
  const { userInfo } = useSelector((state) => state.user);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const technologies = [
    {
      icon: <SiReact className="text-[#61DAFB] w-8 h-8" />,
      name: "React 19",
      role: "Frontend UI",
      desc: "Powers the user interface with fast declarative components and native React hooks."
    },
    {
      icon: <SiRedux className="text-[#764ABC] w-8 h-8" />,
      name: "Redux Toolkit",
      role: "State Management",
      desc: "Manages global cart states, wishlists, and user data queries via RTK Query caching."
    },
    {
      icon: <SiNodedotjs className="text-[#339933] w-8 h-8" />,
      name: "Node.js",
      role: "Runtime Environment",
      desc: "Handles concurrent asynchronous requests and back-end logic operations."
    },
    {
      icon: <FiServer className="text-orange-400 w-8 h-8" />,
      name: "Express 5",
      role: "API Framework",
      desc: "Provides router controllers, middleware authentications, and REST API endpoints."
    },
    {
      icon: <SiMongodb className="text-[#47A248] w-8 h-8" />,
      name: "MongoDB",
      role: "NoSQL Database",
      desc: "Stores collections for users, categories, products, and order receipts."
    },
    {
      icon: <SiTailwindcss className="text-[#06B6D4] w-8 h-8" />,
      name: "Tailwind CSS",
      role: "Styling Framework",
      desc: "Enables design systems, grid alignments, and premium dark glassmorphic themes."
    },
    {
      icon: <FiLock className="text-cyan-400 w-8 h-8" />,
      name: "JWT Auth",
      role: "Security Cookies",
      desc: "Uses secure HTTP-only cookies to handle state logins and role-based permissions."
    },
    {
      icon: <FiCreditCard className="text-pink-400 w-8 h-8" />,
      name: "Razorpay",
      role: "Payment Integration",
      desc: "Coordinates checkout workflows and callbacks for order payments."
    }
  ];

  const features = [
    {
      icon: <FiSmartphone className="text-violet-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-violet-500/20 to-purple-500/5 border-violet-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)]",
      title: "Mobile Responsive Layout",
      description: "Optimized viewport boundaries, adaptive card scaling, and dynamic stacking carousel for seamless browsing across all screens."
    },
    {
      icon: <FiSliders className="text-pink-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-pink-500/20 to-rose-500/5 border-pink-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.4)]",
      title: "Collapsible Shop Filters",
      description: "Category, Brand, and Price filters automatically collapse into mobile dropdown accordions, preserving screen space."
    },
    {
      icon: <FiCpu className="text-orange-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-orange-500/20 to-amber-500/5 border-orange-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.4)]",
      title: "Decoupled Architecture",
      description: "Separated package.json structures for backend and frontend folders to ensure a modular, clean repository codebase."
    },
    {
      icon: <FiShield className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-cyan-500/20 to-blue-500/5 border-cyan-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]",
      title: "Role-Based Security",
      description: "Protected routing and secure JWT cookie-based user authentication separating customer and administrative features."
    },
    {
      icon: <FiDatabase className="text-emerald-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)]",
      title: "High Performance ODM",
      description: "Custom Mongoose String ID mappings designed to match and fetch from cloud collections seamlessly."
    },
    {
      icon: <FiCheckCircle className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />,
      color: "from-amber-500/20 to-yellow-500/5 border-amber-500/20",
      glow: "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.4)]",
      title: "Full Admin Dashboard",
      description: "Comprehensive product CRUD, order history status tracking, user lists, and category controls."
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar bg-[#030712] text-white flex flex-col justify-between pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Premium background grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Layered vibrant neon background glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[150px] pointer-events-none" />

      {/* Header (Top Navbar on landing page) */}
      <header className="fixed top-0 inset-x-0 h-16 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 z-50 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center font-black text-sm text-white select-none shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            MV
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
            MV Store
          </span>
        </div>

        {/* Anchor Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection("features")} 
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("tech-stack")} 
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            Technologies
          </button>
          <button 
            onClick={() => scrollToSection("contact")} 
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            Developer
          </button>
        </nav>

        {/* Header CTA Button */}
        <div>
          {userInfo ? (
            <Link
              to="/store"
              className="text-xs font-bold bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-violet-600/10 px-4 py-2 rounded-lg transition-all"
            >
              Enter Store
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-xs font-bold bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-violet-600/10 px-4 py-2 rounded-lg transition-all"
            >
              Log In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-5xl w-full mx-auto flex-grow flex flex-col justify-center space-y-24 relative z-10 pt-8">
        
        {/* Top Hero Section */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          {/* Showcase Bubble */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-violet-300 shadow-inner backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
            <span>MERN Stack Portfolio Showcase</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center pt-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-[0_0_35px_rgba(139,92,246,0.35)] select-none animate-pulse" style={{ animationDuration: "3s" }}>
              MV
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-500 drop-shadow-sm leading-none pb-2">
            MV Store
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            Welcome to a premium e-commerce platform built using high-fidelity glassmorphism, responsive interface viewports, and clean decoupled structures.
          </p>

          {/* Rounded gradient CTA button */}
          <div className="pt-6 flex justify-center">
            {userInfo ? (
              <Link
                to="/store"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-extrabold px-10 py-4 rounded-full shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-105 active:scale-95 text-base overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
                ENTER STORE
                <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300 w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-extrabold px-10 py-4 rounded-full shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-105 active:scale-95 text-base overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
                GET STARTED
                <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300 w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Technologies Used Section */}
        <div id="tech-stack" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Technologies Used
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Built on a modern full-stack ecosystem for maximum scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:bg-slate-900/60 hover:border-white/10 transition-all duration-300 flex flex-col space-y-4 group hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.15)] relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <div>
                  <span className="text-[10px] text-violet-400 font-extrabold tracking-widest uppercase">
                    {tech.role}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Enhancements Features Section */}
        <div id="features" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Core Enhancements
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Optimized layout layers and modern development flows built for performance.
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
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Section */}
      <footer id="contact" className="max-w-5xl w-full mx-auto text-center border-t border-white/5 pt-8 mt-24 relative z-10 scroll-mt-24">
        <p className="text-xs text-slate-500 font-medium">
          Designed & Developed by <span className="text-slate-300 font-bold">Vardhan</span>
        </p>
        <p className="text-[11px] text-slate-600 mt-1.5">
          Contact: <a href="mailto:vardhanbabuvendi@gmail.com" className="text-violet-400/80 hover:text-violet-400 transition-colors">vardhanbabuvendi@gmail.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Intro;