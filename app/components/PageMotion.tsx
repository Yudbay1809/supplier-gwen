"use client";

import { motion } from "framer-motion";

interface PageMotionProps {
  children: React.ReactNode;
}

export default function PageMotion({ children }: PageMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
