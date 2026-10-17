
import { motion } from "framer-motion";
import { Cpu, ShieldCheck } from "lucide-react";

const LoginLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center
        bg-[#05070c]/95 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center text-center">

        {/* Animated glowing rings */}
        <div className="relative mb-10 flex h-28 w-28 items-center justify-center">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-transparent
              border-t-blue-400 border-r-cyan-300"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-3 rounded-full border border-blue-500/30
              border-b-cyan-300"
          />

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              boxShadow: [
                "0 0 15px rgba(59,130,246,0.2)",
                "0 0 40px rgba(59,130,246,0.6)",
                "0 0 15px rgba(59,130,246,0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-16 w-16 items-center justify-center
              rounded-2xl border border-blue-400/30 bg-blue-500/10"
          >
            <Cpu size={30} className="text-cyan-300" />
          </motion.div>
        </div>

        {/* Brand */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-semibold tracking-[0.3em] text-white"
        >
          TECH<span className="text-blue-400">VAULT</span>
        </motion.h2>

        <p className="mt-3 text-sm tracking-wide text-gray-400">
          Securely connecting your experience
        </p>

        {/* Loading indicator */}
        <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-gradient-to-r
              from-transparent via-cyan-300 to-blue-500"
          />
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck size={14} className="text-cyan-400" />
          AUTHENTICATING
        </div>
      </div>
    </motion.div>
  );
};

export default LoginLoader;
