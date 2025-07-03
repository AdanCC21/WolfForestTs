import { motion } from 'framer-motion';
import { useScrollOpacity } from '../hooks/useScrollOpacity';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function ScrollFadeSection({ children }: Props) {
  const { ref, opacity } = useScrollOpacity(0.3);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
      className="flex flex-col mx-[20vw] items-center my-3 h-[60vh] justify-center"
    >
      {children}
    </motion.section>
  );
}
