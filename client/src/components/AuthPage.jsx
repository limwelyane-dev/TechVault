import { ShieldCheck, Truck, Headphones, Star } from "lucide-react";

function Feature({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center gap-3 border-r border-gray-600 last:border-none">
      <div className="text-blue-400 font-bold">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold text-white">
          {title}
        </p>

        <p className="text-xs text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

      <section className="relative hidden min-h-screen overflow-hidden lg:block">

        <img
          src="/authBackground.avif"
          alt="Modern computer workstation"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/75" />

        {/* Blue glow */}
        <div className="absolute -left-32 top-1/3 h-60 w-96 rounded-full bg-blue-800/30 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2">

              <div className="flex h-11 w-11 items-center logo1 justify-center rounded-xl text-4xl font-bold text-white">
                T <span className="text-4xl">{"<"}</span>
              </div>

              <span className="text-md font-['Montserrat'] font-extrabold tracking-widest text-white">
                TECH<span className="text-blue-500">VAULT</span>
              </span>

            </div>
          </div>

          {/* Main text */}
          <div className="max-w-xl -mt-10">

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Electronics Store
            </p>

            <h1 className="text-4xl font-bold leading-12 text-white xl:text-6xl">
              Power Your
              <span className="block ml-4 text-blue-500">
                Digital World.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-md leading-5 text-slate-300">
              Discover premium electronics, powerful devices,
              and the latest technology built for work, gaming,
              and everything in between.
            </p>

          </div>

          {/* Features */}
          <div className="grid grid-cols-4 gap-4">

            <Feature
              icon={<ShieldCheck size={21} />}
              title="Authentic"
              text="Products"
              
            />

            <Feature
              icon={<Truck size={21} />}
              title="Fast & Secure"
              text="Delivery"
            />

            <Feature
              icon={<Headphones size={21} />}
              title="Dedicated"
              text="Support"
            />

            <Feature
              icon={<Star size={21} />}
              title="Trusted"
              text="Store"
            />

          </div>

        </div>
      </section>

      {/* ================= RIGHT SIDE ================= */}
      <section className="flex min-h-screen flex-col">

        <div className="flex flex-1 items-center justify-center px-6 py-6 sm:px-10">

          <div className="w-full max-w-md">
            {children}
          </div>

        </div>

      </section>

    </div>
  );
}