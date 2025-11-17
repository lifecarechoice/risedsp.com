"use client";
import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
	delay?: number;
	y?: number;
}>;

export default function Reveal({ children, delay = 0, y = 16 }: RevealProps) {
	const prefersReduced = useReducedMotion();
	return (
		<motion.div
			initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
		>
			{children}
		</motion.div>
	);
}


