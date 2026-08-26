import { motion } from "motion/react";
import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-black px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-['Bebas_Neue'] text-[9rem] leading-none tracking-wider text-red-600 md:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 font-['Bebas_Neue'] text-4xl tracking-wider text-white md:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Looks like this move isn't part of the routine. The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block h-12 border border-red-600 bg-red-600 px-8 pt-3 font-['Oswald'] text-sm uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-red-700"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
