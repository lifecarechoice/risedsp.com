import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

type LogoProps = {
	variant?: "nav" | "footer";
	className?: string;
	priority?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt">;

export default function Logo({
	variant = "nav",
	className = "",
	priority = false,
	...props
}: LogoProps) {
	// Logo-3 for navigation (header), Logo-4 for footer
	const logoPath = variant === "footer" ? "/logos/rise-logo-4.png" : "/logos/rise-logo-3.png";
	
	// Larger sizes for better visibility
	const heightClass = variant === "footer" ? "h-16 md:h-20 lg:h-24" : "h-12 md:h-14 lg:h-[78px]";

	if (variant === "footer") {
		// Footer: Logo aligned perfectly to left edge matching text
		// Simple, clean approach - double size, left-aligned container, natural positioning
		return (
			<div className="block" style={{ margin: 0, padding: 0, lineHeight: 0 }}>
				<Image
					src={logoPath}
					alt="RISE Operations LLC"
					width={400}
					height={400}
					className={`${heightClass} w-auto object-contain ${className}`}
					priority={priority}
					style={{ 
						objectPosition: 'left center', // Show left portion of image
						transform: 'scale(2)',
						transformOrigin: 'left center', // Scale from left to maintain left alignment
						display: 'block',
						margin: 0,
						padding: 0
					}}
					{...props}
				/>
			</div>
		);
	}

	// Navigation: Centered logo
	return (
		<div className={`${heightClass} flex items-center justify-center`} style={{ width: 'auto', overflow: 'visible' }}>
			<Image
				src={logoPath}
				alt="RISE Operations LLC"
				width={200}
				height={200}
				className={`${heightClass} w-auto object-contain ${className}`}
				priority={priority}
				style={{ 
					objectPosition: 'center center',
					transform: 'scale(2)',
					transformOrigin: 'center center',
					display: 'block'
				}}
				{...props}
			/>
		</div>
	);
}
