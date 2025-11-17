"use client";
import { motion } from "framer-motion";

export default function RouteLines() {
	return (
		<svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
			<defs>
				<linearGradient id="routeGradient" x1="0" x2="1" y1="0" y2="0">
					<stop offset="0%" stopColor="rgba(217,164,65,0.0)" />
					<stop offset="30%" stopColor="rgba(217,164,65,0.45)" />
					<stop offset="70%" stopColor="rgba(255,255,255,0.35)" />
					<stop offset="100%" stopColor="rgba(217,164,65,0.0)" />
				</linearGradient>
				<linearGradient id="dotGradient" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
					<stop offset="100%" stopColor="rgba(217,164,65,0.9)" />
				</linearGradient>
			</defs>
			<motion.path
				d="M -100,200 C 200,140 260,220 520,180 S 900,160 1200,200"
				fill="none"
				stroke="url(#routeGradient)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeDasharray="6 10"
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 2, ease: "easeInOut" }}
			/>
			<motion.circle
				r="3"
				fill="url(#dotGradient)"
				initial={{ cx: -100, cy: 200 }}
				animate={{ cx: [ -100, 1200 ], cy: [ 200, 200 ] }}
				transition={{ duration: 6, ease: "linear", repeat: Infinity }}
			/>
			<motion.path
				d="M -50,420 C 180,420 340,360 580,420 S 980,500 1300,460"
				fill="none"
				stroke="url(#routeGradient)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeDasharray="6 10"
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 2.2, ease: "easeInOut" }}
			/>
			<motion.circle
				r="3"
				fill="url(#dotGradient)"
				initial={{ cx: -50, cy: 420 }}
				animate={{ cx: [ -50, 1300 ], cy: [ 420, 460 ] }}
				transition={{ duration: 7, ease: "linear", repeat: Infinity }}
			/>
		</svg>
	);
}


