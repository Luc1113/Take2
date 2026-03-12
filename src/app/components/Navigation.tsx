import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import logo from "../../assets/logo.webp";

export function Navigation() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/staff", label: "Staff" },
    { path: "/media", label: "Media" },
    { path: "/intensive-packages", label: "Intensive Packages" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 ff-disable-backdrop ff-opaque-nav"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="block">
            <motion.img
              src={logo}
              alt="Take 2 Dance Studio"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          <div className="flex gap-8">
            {links.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative"
              >
                <Link
                  to={link.path}
                  className="text-white font-['Oswald'] uppercase tracking-wider text-sm hover:text-red-600 transition-colors duration-300"
                >
                  {link.label}
                </Link>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
