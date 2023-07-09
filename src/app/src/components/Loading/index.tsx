import { motion } from 'framer-motion'
import { Link, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

type LoadingProps = {
  size: number
  style?: string
}

export function Loading({ size, style }: LoadingProps) {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
        <Loader2 size={size} className={style} />
      </motion.div>
    </motion.div>
  )
}
