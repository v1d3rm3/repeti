import { motion } from "framer-motion";
import { Link, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

type LoadingProps = {
  size?: number;
};

type LoadingLinkProps = {
  size?: number;
  link: string;
  textLink: string;
  style?: string;
};

export function Loading({ size }: LoadingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <Loader2 size={size} />
      </motion.div>
    </motion.div>
  );
}
