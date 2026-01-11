"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/Logo";

export default function Nav() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<string>("#home");
	const { language, setLanguage, t } = useLanguage();
	const observerRef = useRef<IntersectionObserver | null>(null);
	const pathname = usePathname();

	const links = [
		{ label: t.nav.home, href: "/#home", hash: "#home" },
		{ label: t.nav.about, href: "/#about", hash: "#about" },
		{ label: t.nav.whyRise, href: "/#why-rise", hash: "#why-rise" },
		{ label: t.nav.leadership, href: "/#leadership", hash: "#leadership" },
		{ label: t.nav.wallOfFame, href: "/#wall-of-fame", hash: "#wall-of-fame" },
		{ label: t.nav.careers, href: "/#careers", hash: "#careers" },
		{ label: t.nav.contact, href: "/#contact", hash: "#contact" },
	];

	const handleLanguageChange = (lang: "en" | "es") => {
		setLanguage(lang);
	};

	// Handle smooth scroll after navigation
	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				const element = document.querySelector(hash);
				if (element) {
					const headerOffset = 80;
					const elementPosition = element.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth"
					});
				}
			}, 100);
		}
	}, [pathname]);

	// Handle click for smooth scroll when already on home page
	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
		if (pathname === "/") {
			e.preventDefault();
			const element = document.querySelector(hash);
			if (element) {
				const headerOffset = 80;
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
		}
	};

	useEffect(() => {
		// Handle active state for hash anchors on home page
		const sections = links
			.filter((l) => l.hash) // Only process links with hash anchors
			.map((l) => document.querySelector(l.hash) as HTMLElement | null)
			.filter(Boolean) as HTMLElement[];
		
		// Also include the join-our-team section for the button
		const joinSection = document.querySelector("#join-our-team") as HTMLElement | null;
		if (joinSection) sections.push(joinSection);
		
		if (observerRef.current) observerRef.current.disconnect();
		
		if (sections.length > 0) {
			observerRef.current = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setActive(`#${entry.target.id}`);
						}
					});
				},
				{ rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.3, 0.6, 1] }
			);
			sections.forEach((sec) => observerRef.current?.observe(sec));
		}
		
		return () => observerRef.current?.disconnect();
	}, [pathname]);

	return (
		<header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200/60 shadow-sm">
			<nav className="container-premium flex items-center justify-between py-4 md:py-5">
				<Link href="/#home" onClick={(e) => handleLinkClick(e, "#home")} className="flex items-center group flex-shrink-0 hover:opacity-90 transition-opacity">
					<Logo variant="nav" priority />
				</Link>
				<div className="hidden lg:flex items-center gap-1 flex-shrink-0 min-w-0 flex-1 ml-8 md:ml-12">
					{links.map((l) => {
						const isActive = pathname === l.href || (l.hash && active === l.hash);
						return (
							<Link 
								key={l.href} 
								href={l.href} 
								onClick={(e) => l.hash && handleLinkClick(e, l.hash)}
								className={`group relative px-3 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
									isActive 
										? "text-gray-900 bg-gradient-to-br from-gold-500/15 to-gold-500/5 shadow-sm" 
										: "text-gray-700 hover:text-gray-900 hover:bg-gray-50/80"
								}`}
							>
								<span className="relative z-10 block">{l.label}</span>
								{isActive && (
									<>
										<motion.div 
											className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/20"
											layoutId="activeBg"
											initial={false}
											transition={{ type: "spring", stiffness: 500, damping: 30 }}
										/>
										<motion.span 
											className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 shadow-sm shadow-gold-500/50"
											layoutId="activeIndicator"
											initial={false}
											style={{ width: "70%" }}
											transition={{ type: "spring", stiffness: 500, damping: 30 }}
										/>
									</>
								)}
							</Link>
						);
					})}
					<Link 
						href="/#join-our-team" 
						onClick={(e) => handleLinkClick(e, "#join-our-team")}
						className="ml-2 btn btn-primary text-xs font-semibold px-4 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 shadow-gold-500/20"
					>
						{t.nav.joinOurTeam}
					</Link>
					{/* Language Toggle - Positioned at right edge with spacing */}
					<div className="ml-6 mr-0 flex items-center gap-1.5 flex-shrink-0">
						<button
							onClick={() => handleLanguageChange("en")}
							className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
								language === "en"
									? "bg-gold-500 text-navy-900 shadow-sm"
									: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
							}`}
						>
							English 🇺🇸
						</button>
						<button
							onClick={() => handleLanguageChange("es")}
							className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
								language === "es"
									? "bg-gold-500 text-navy-900 shadow-sm"
									: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
							}`}
						>
							Español 🇪🇸
						</button>
					</div>
				</div>
				<button 
					className="lg:hidden p-2 rounded-lg transition-colors text-gray-900 hover:bg-gray-100"
					onClick={() => setOpen((v) => !v)} 
					aria-label="Toggle navigation"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						{open ? (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						) : (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						)}
					</svg>
				</button>
			</nav>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="lg:hidden overflow-hidden border-t border-gray-200/60 bg-white shadow-lg"
					>
						<div className="container-premium py-6 space-y-2">
							{links.map((l) => {
								const isActive = pathname === l.href || (l.hash && active === l.hash);
								return (
									<Link 
										key={l.href} 
										href={l.href} 
										onClick={(e) => {
											if (l.hash) handleLinkClick(e, l.hash);
											setOpen(false);
										}} 
										className={`group relative block px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
											isActive 
												? "text-navy-900 bg-gradient-to-br from-gold-500/15 to-gold-500/5 shadow-sm" 
												: "text-gray-700 hover:text-navy-900 hover:bg-gray-50/80"
										}`}
									>
										<span className="relative z-10">{l.label}</span>
										{isActive && (
											<motion.span 
												className="absolute bottom-0 left-0 h-1 w-1/3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600"
												layoutId="mobileActive"
												initial={false}
											/>
										)}
									</Link>
								);
							})}
							{/* Language Toggle - Mobile */}
							<div className="flex items-center gap-2 mt-4 justify-center">
								<button
									onClick={() => handleLanguageChange("en")}
									className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
										language === "en"
											? "bg-gold-500 text-navy-900 shadow-sm"
											: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									English 🇺🇸
								</button>
								<button
									onClick={() => handleLanguageChange("es")}
									className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
										language === "es"
											? "bg-gold-500 text-navy-900 shadow-sm"
											: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									Español 🇪🇸
								</button>
							</div>
							<Link 
								href="/#join-our-team" 
								onClick={(e) => {
									handleLinkClick(e, "#join-our-team");
									setOpen(false);
								}} 
								className="btn btn-primary w-full mt-4 font-semibold shadow-lg"
							>
								{t.nav.joinOurTeam}
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}


