"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LogisticsBG() {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 600], [0, 40]);

	return (
		<motion.svg
			className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
			aria-hidden="true"
			style={{ y }}
			viewBox="0 0 1200 800"
		>
			<defs>
				<linearGradient id="vanStroke" x1="0" x2="1" y1="0" y2="1">
					<stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
					<stop offset="100%" stopColor="#D9A441" stopOpacity="0.6" />
				</linearGradient>
			</defs>
			{[0, 1, 2, 3, 4].map((i) => {
				const x = 80 + i * 220;
				const y = 150 + (i % 2 === 0 ? 0 : 60);
				return (
					<g key={i} transform={`translate(${x}, ${y}) scale(1.1)`} stroke="url(#vanStroke)" fill="none" strokeWidth="2">
						<rect x="0" y="16" rx="6" ry="6" width="120" height="48" />
						<rect x="12" y="0" rx="6" ry="6" width="70" height="22" />
						<circle cx="30" cy="70" r="8" />
						<circle cx="100" cy="70" r="8" />
						<path d="M0 40 H-20" />
						<path d="M120 40 H140" />
					</g>
				);
			})}
		</motion.svg>
	);
}


