import { HTMLAttributes, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedOnScrollProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  hiddenX: number;
  hiddenY: number;
  duration?: number;
  delay?: number;
  count?: number;
}

interface AnimatedOnScrollState {
  isVisible: boolean;
}

export function AnimatedOnScroll({
  id,
  hiddenX,
  hiddenY,
  children,
  duration = 0.5,
  delay = 0,
  count = 1,
}: AnimatedOnScrollProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const textVariants = {
    hidden: {
      opacity: 0,
      y: hiddenY,
      x: hiddenX,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut",
          repeat: count - 1,
          repeatType: "mirror",
        },
      });
    }
  }, [controls, inView, duration, delay, count]);

  return (
    <motion.div
      id={id}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={textVariants}
    >
      {children}
    </motion.div>
  );
}
