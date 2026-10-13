import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-15 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              <span className="text-white">TECH</span>
              <span className="text-blue-500">VAULT</span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Your trusted destination for premium electronics,
              laptops, smartphones, and accessories.
            </p>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2.5 transition hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2.5 transition hover:bg-blue-600 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2.5 transition hover:bg-blue-600 hover:text-white"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-white">
              Shop
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="/products"
                  className="transition hover:text-blue-400"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="/products"
                  className="transition hover:text-blue-400"
                >
                  Laptops
                </a>
              </li>

              <li>
                <a
                  href="/products"
                  className="transition hover:text-blue-400"
                >
                  Smartphones
                </a>
              </li>

              <li>
                <a
                  href="/products"
                  className="transition hover:text-blue-400"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-white">
              Customer Service
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  My Orders
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  Shipping Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white">
              Contact Us
            </h3>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <span>
                  Cagayan de Oro City,
                  <br />
                  Philippines
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <span>+63 900 000 0000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <span>support@techvault.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} TechVault. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition hover:text-slate-300"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-slate-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;