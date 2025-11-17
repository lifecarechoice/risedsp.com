"use client";
import { motion } from "framer-motion";

// Van SVG component - boxy delivery van with wheels
function VanIcon() {
	return (
		<g>
			{/* Van body (boxy cube shape) */}
			<rect x="-18" y="-10" width="36" height="20" rx="2" fill="rgba(255,255,255,0.2)" stroke="rgba(217,164,65,0.5)" strokeWidth="1.5" />
			{/* Van cab (front section) */}
			<rect x="-18" y="-10" width="14" height="10" rx="1.5" fill="rgba(255,255,255,0.15)" stroke="rgba(217,164,65,0.4)" strokeWidth="1" />
			{/* Windshield */}
			<rect x="-16" y="-8" width="10" height="3" rx="0.5" fill="rgba(217,164,65,0.25)" />
			{/* Side window */}
			<rect x="2" y="-6" width="8" height="4" rx="0.5" fill="rgba(217,164,65,0.2)" />
			{/* Wheels/Tires - back */}
			<circle cx="-10" cy="12" r="5" fill="rgba(0,0,0,0.4)" stroke="rgba(217,164,65,0.6)" strokeWidth="1.5" />
			{/* Wheels/Tires - front */}
			<circle cx="10" cy="12" r="5" fill="rgba(0,0,0,0.4)" stroke="rgba(217,164,65,0.6)" strokeWidth="1.5" />
			{/* Wheel rims */}
			<circle cx="-10" cy="12" r="2.5" fill="rgba(255,255,255,0.25)" />
			<circle cx="10" cy="12" r="2.5" fill="rgba(255,255,255,0.25)" />
		</g>
	);
}

export default function AnimatedVans() {
	// Define multiple routes with keyframe positions for smooth animation
	const routes = [
		{
			keyframes: [
				{ x: -100, y: 200, rotate: -10 },
				{ x: 200, y: 140, rotate: 5 },
				{ x: 520, y: 180, rotate: -5 },
				{ x: 900, y: 160, rotate: 3 },
				{ x: 1400, y: 200, rotate: 0 },
			],
			duration: 12,
			delay: 0,
		},
		{
			keyframes: [
				{ x: -50, y: 420, rotate: 0 },
				{ x: 180, y: 420, rotate: -8 },
				{ x: 580, y: 420, rotate: 8 },
				{ x: 980, y: 500, rotate: -5 },
				{ x: 1500, y: 460, rotate: 3 },
			],
			duration: 14,
			delay: 0,
		},
		{
			keyframes: [
				{ x: -80, y: 320, rotate: -5 },
				{ x: 150, y: 280, rotate: 10 },
				{ x: 550, y: 300, rotate: -8 },
				{ x: 850, y: 280, rotate: 5 },
				{ x: 1300, y: 320, rotate: -2 },
			],
			duration: 13,
			delay: 0,
		},
		{
			keyframes: [
				{ x: -120, y: 500, rotate: 3 },
				{ x: 220, y: 480, rotate: -6 },
				{ x: 620, y: 480, rotate: 4 },
				{ x: 1000, y: 460, rotate: -3 },
				{ x: 1400, y: 500, rotate: 2 },
			],
			duration: 15,
			delay: 0,
		},
	];

	return (
		<svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice">
			<defs>
				<linearGradient id="routeGradient" x1="0" x2="1" y1="0" y2="0">
					<stop offset="0%" stopColor="rgba(217,164,65,0.0)" />
					<stop offset="30%" stopColor="rgba(217,164,65,0.35)" />
					<stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
					<stop offset="100%" stopColor="rgba(217,164,65,0.0)" />
				</linearGradient>
				<filter id="vanGlow">
					<feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* Draw route paths (dashed lines) */}
			{routes.map((route, idx) => {
				const pathData = `M ${route.keyframes[0].x},${route.keyframes[0].y} ${route.keyframes.slice(1).map((kf) => `L ${kf.x},${kf.y}`).join(' ')}`;
				return (
					<motion.path
						key={`route-${idx}`}
						d={pathData}
						fill="none"
						stroke="url(#routeGradient)"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeDasharray="5 10"
						initial={{ pathLength: 0, opacity: 0.4 }}
						animate={{ pathLength: 1, opacity: 0.6 }}
						transition={{ duration: 2.5, ease: "easeInOut", delay: 0 }}
					/>
				);
			})}

			{/* Animated vans moving along paths */}
			{routes.map((route, idx) => (
				<motion.g
					key={`van-${idx}`}
					initial={{ 
						x: route.keyframes[0].x, 
						y: route.keyframes[0].y, 
						rotate: route.keyframes[0].rotate,
						opacity: 1 
					}}
					animate={{
						x: route.keyframes.map((kf) => kf.x),
						y: route.keyframes.map((kf) => kf.y),
						rotate: route.keyframes.map((kf) => kf.rotate),
						opacity: 1,
					}}
					transition={{
						duration: route.duration,
						delay: 0,
						repeat: Infinity,
						ease: "linear",
					}}
					style={{ filter: "url(#vanGlow)" }}
				>
					<VanIcon />
				</motion.g>
			))}
		</svg>
	);
}

