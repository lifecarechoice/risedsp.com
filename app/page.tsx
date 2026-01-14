/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useMemo, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Reveal from "@/components/Reveal";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import RouteLines from "@/components/RouteLines";
import AnimatedVans from "@/components/AnimatedVans";
import CountUp from "@/components/CountUp";
import LogisticsBG from "@/components/LogisticsBG";
import { useLanguage } from "@/contexts/LanguageContext";

type JoinForm = {
	name: string;
	email: string;
	phone: string;
	age: string;
	license: string;
	outdoor: string;
	message: string;
};

export default function HomePage() {
	const { t, language } = useLanguage();
	// Hero parallax
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const translate = useMotionTemplate`translate3d(${mouseX}px, ${mouseY}px, 0)`;

	// Join Our Team form state
	const [joinForm, setJoinForm] = useState<JoinForm>({
		name: "",
		email: "",
		phone: "",
		age: "Select",
		license: "No",
		outdoor: "Yes",
		message: "",
	});
	const [joinOpen, setJoinOpen] = useState(false);
	const [errors, setErrors] = useState<Partial<Record<keyof JoinForm, string>>>({});
	const [touched, setTouched] = useState<Partial<Record<keyof JoinForm, boolean>>>({});

	// Persist forms locally
	useEffect(() => {
		try {
			const saved = localStorage.getItem("rise-join-form");
			if (saved) setJoinForm(JSON.parse(saved));
		} catch {}
	}, []);

	useEffect(() => {
		try {
			// Store formatted phone number (not normalized) so it displays correctly on reload
			localStorage.setItem("rise-join-form", JSON.stringify(joinForm));
		} catch {}
	}, [joinForm]);

	const metrics = useMemo(
		() => [
			{ label: "On-time Target", value: "98%+" },
			{ label: "Safety Goal", value: "Zero-incident" },
			{ label: "Culture", value: "Leadership-driven" },
		],
		[]
	);

	// Normalize phone number to digits only for storage
	function normalizePhone(phone: string): string {
		return phone.replace(/\D/g, '');
	}

	// Format phone number for display
	function formatPhone(phone: string): string {
		const digits = normalizePhone(phone);
		if (digits.length === 0) return '';
		if (digits.length <= 3) return `(${digits}`;
		if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
	}

	// Validation functions
	function validateName(name: string): string | undefined {
		if (!name.trim()) {
			return "Full Name is required";
		}
		if (name.trim().length < 2) {
			return "Full Name must be at least 2 characters";
		}
		return undefined;
	}

	function validateEmail(email: string): string | undefined {
		if (!email.trim()) {
			return "Email is required";
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return "Please enter a valid email address";
		}
		return undefined;
	}

	function validatePhone(phone: string): string | undefined {
		const digits = normalizePhone(phone);
		if (digits.length === 0) {
			return "Phone is required";
		}
		if (digits.length < 10) {
			return "Please enter a valid phone number";
		}
		return undefined;
	}

	function validateDropdown(value: string, fieldName: string, defaultOption: string): string | undefined {
		if (!value || value === defaultOption || value === "Select") {
			return `${fieldName} is required`;
		}
		return undefined;
	}

	// Validate all fields
	function validateForm(form: JoinForm): Partial<Record<keyof JoinForm, string>> {
		const newErrors: Partial<Record<keyof JoinForm, string>> = {};
		
		const nameError = validateName(form.name);
		if (nameError) newErrors.name = nameError;
		
		const emailError = validateEmail(form.email);
		if (emailError) newErrors.email = emailError;
		
		const phoneError = validatePhone(form.phone);
		if (phoneError) newErrors.phone = phoneError;
		
		const ageError = validateDropdown(form.age, "Age", "Select");
		if (ageError) newErrors.age = ageError;
		
		// License and outdoor always have values (no "Select" option), so they don't need validation
		// But we validate they're not empty just to be safe
		if (!form.license || form.license.trim() === "") {
			newErrors.license = "License question is required";
		}
		if (!form.outdoor || form.outdoor.trim() === "") {
			newErrors.outdoor = "Outdoor question is required";
		}
		
		return newErrors;
	}

	// Handle field blur
	function handleBlur(fieldName: keyof JoinForm) {
		setTouched({ ...touched, [fieldName]: true });
		const fieldErrors = validateForm(joinForm);
		if (fieldErrors[fieldName]) {
			setErrors({ ...errors, [fieldName]: fieldErrors[fieldName] });
		} else {
			const newErrors = { ...errors };
			delete newErrors[fieldName];
			setErrors(newErrors);
		}
	}

	function handleJoinSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		
		// Mark all fields as touched
		const allTouched = {
			name: true,
			email: true,
			phone: true,
			age: true,
			license: true,
			outdoor: true,
			message: true,
		};
		setTouched(allTouched);
		
		// Validate form
		const formErrors = validateForm(joinForm);
		setErrors(formErrors);
		
		// If there are errors, don't submit
		if (Object.keys(formErrors).length > 0) {
			return;
		}
		
		// Store normalized phone number
		const normalizedForm = {
			...joinForm,
			phone: normalizePhone(joinForm.phone),
		};
		
		setJoinOpen(true);
		// keep local storage as-is for demo (with normalized phone)
	}

	function handleScrollToJoinTeam(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		const element = document.querySelector("#join-our-team");
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

	return (
		<>
			<section
				id="home"
				className="relative min-h-screen bg-navy-900 hero-grid overflow-hidden"
				onMouseMove={(e) => {
					const { innerWidth, innerHeight } = window;
					const x = ((e.clientX - innerWidth / 2) / innerWidth) * 12;
					const y = ((e.clientY - innerHeight / 2) / innerHeight) * 12;
					mouseX.set(x);
					mouseY.set(y);
				}}
			>
				<div className="absolute inset-0 pointer-events-none">
					{/* Background image with subtle filter effect */}
					<div 
						className="absolute inset-0"
						style={{
							backgroundImage: 'url("/RISE Cover.png")',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							filter: 'brightness(0.7) contrast(1.15) blur(0.5px)',
							WebkitFilter: 'brightness(0.7) contrast(1.15) blur(0.5px)'
						}}
					/>
					{/* Dark gradient overlay for text readability - subtle and elegant */}
					<div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/50 to-navy-900/65" />
					{/* Additional subtle overlay layer for depth */}
					<div className="absolute inset-0 bg-black/10" />
					<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
					<AnimatedVans />
					<LogisticsBG />
				</div>
				<Nav />
				<div className="container-premium pt-32 md:pt-40 pb-20 md:pb-32">
					<motion.div className="max-w-3xl" style={{ transform: translate }}>
						<Reveal>
							<span className="pill text-xs md:text-sm">{t.hero.location}</span>
						</Reveal>
						<Reveal delay={0.06}>
							<h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] text-white text-glow tracking-tight">
								<span className="block">{t.hero.title}</span>
								<span className="block whitespace-nowrap">{t.hero.subtitle}</span>
							</h1>
						</Reveal>
						<Reveal delay={0.12}>
							<p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white text-glow leading-tight font-bold italic">
								{t.hero.mission}
							</p>
						</Reveal>
						<Reveal delay={0.18}>
							<p className="mt-6 text-lg md:text-xl text-white/90 text-glow leading-relaxed">
								{t.hero.description}
							</p>
						</Reveal>
						<Reveal delay={0.24}>
							<div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
								<a href="#join-our-team" className="btn btn-primary text-base px-8 py-4 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
									{t.hero.joinTeam}
								</a>
								<a href="#contact" className="btn btn-outline text-base px-8 py-4 font-semibold border-2 hover:bg-white/15 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
									{t.hero.vendorPartnerships}
								</a>
							</div>
						</Reveal>
					</motion.div>
				</div>
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
					<div className="flex flex-col items-center gap-2 text-white/70 text-xs">
						<span>{language === "en" ? "Scroll" : "Desplazar"}</span>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</div>
				</div>
			</section>

			<section id="about" className="section-dark">
				<div className="container-premium">
					<Reveal>
						<div className="max-w-4xl">
							<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">{t.about.title}</h2>
							<div className="space-y-6">
								<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
									{t.about.paragraph1}
								</p>
								<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
									{t.about.paragraph2}
								</p>
							</div>
						</div>
					</Reveal>
					<div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-6 md:gap-8">
						<Reveal>
							<div className="rise-card">
								<div className="flex flex-col items-center mb-6">
									<img 
										src="/ach-headshot.JPG" 
										alt="Achraf Bousmah - Founder & Chief Operating Officer" 
										className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gold-500/30 shadow-lg"
									/>
									<h2 className="text-2xl md:text-3xl font-bold text-navy-900 mt-4 text-center">Achraf Bousmah</h2>
									<h3 className="text-lg md:text-xl font-semibold text-gold-600 mt-2 text-center">{t.about.ownerTitle}</h3>
								</div>
								<p className="text-gray-700 flex-grow">
									{t.about.ownerIntro}
								</p>
								<ul className="flex-grow">
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.ownerBullet1}</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.ownerBullet2}</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.ownerBullet3}</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.ownerBullet4}</span>
									</li>
								</ul>
							</div>
						</Reveal>
						<Reveal delay={0.08}>
							<div className="rise-card">
								<div className="flex flex-col items-center mb-6">
									<img 
										src="/logos/rise-logo-1.png" 
										alt="RISE Operations LLC" 
										className="w-32 h-32 md:w-40 md:h-40 object-contain"
									/>
									<h3 className="text-xl md:text-2xl font-bold text-navy-900 mt-4 text-center">{t.about.deliverTitle}</h3>
								</div>
								<p className="text-gray-700 flex-grow">
									{t.about.deliverIntro}
								</p>
								<ul className="flex-grow">
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.deliverBullet1}</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.deliverBullet2}</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.deliverBullet3}</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1.5 flex-shrink-0">•</span>
										<span>{t.about.deliverBullet4}</span>
									</li>
								</ul>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<section id="why-rise" className="section-dark-alt">
				<div className="container-premium">
					<Reveal>
						<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">{t.whyRise.title}</h2>
					</Reveal>
					<Reveal delay={0.06}>
						<div className="max-w-4xl space-y-5">
							<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
								{t.whyRise.paragraph1}
							</p>
							<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
								{t.whyRise.paragraph2}
							</p>
							<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
								{t.whyRise.paragraph3}
							</p>
						</div>
					</Reveal>
					<div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6">
						{[
							{
								title: t.whyRise.card1Title,
								desc: t.whyRise.card1Desc
							},
							{
								title: t.whyRise.card2Title,
								desc: t.whyRise.card2Desc
							},
							{
								title: t.whyRise.card3Title,
								desc: t.whyRise.card3Desc
							},
						].map((c, i) => (
							<Reveal key={c.title} delay={i * 0.06}>
							<div className="rise-card">
								<div className="h-10 w-10 rounded-md bg-gold-500/15 text-gold-500 flex items-center justify-center flex-shrink-0 mb-3">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-navy-900">{c.title}</h3>
								<p className="text-gray-700 flex-grow">{c.desc}</p>
							</div>
							</Reveal>
						))}
					</div>
					<Reveal delay={0.12}>
						<div className="mt-10 md:mt-12 rounded-lg border border-gray-200 bg-white/60 backdrop-blur-md p-6 md:p-8 text-center text-gray-800 divider-band shadow-sm">
							<p className="text-lg md:text-xl font-medium italic">"{t.whyRise.quote}"</p>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="leadership" className="section-dark-alt">
				<div className="container-premium">
					<Reveal>
						<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">{t.leadership.title}</h2>
					</Reveal>
					<Reveal delay={0.06}>
						<div className="max-w-4xl">
							<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
								{t.leadership.intro}
							</p>
						</div>
					</Reveal>
					<div className="mt-10 md:mt-12 grid md:grid-cols-4 gap-6">
						{[
							{ 
								title: t.leadership.card1Title, 
								desc: t.leadership.card1Desc
							},
							{ 
								title: t.leadership.card2Title, 
								desc: t.leadership.card2Desc
							},
							{ 
								title: t.leadership.card3Title, 
								desc: t.leadership.card3Desc
							},
							{ 
								title: t.leadership.card4Title, 
								desc: t.leadership.card4Desc
							},
						].map((c, i) => (
							<Reveal key={c.title} delay={i * 0.06}>
							<div className="rise-card">
								<h3 className="text-lg font-semibold text-navy-900">{c.title}</h3>
								<p className="text-gray-700 flex-grow">{c.desc}</p>
							</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section id="wall-of-fame" className="py-20 md:py-28" style={{ backgroundColor: '#F7F8FA' }}>
				<div className="container-premium">
					<Reveal>
						<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">{t.wallOfFame.title}</h2>
					</Reveal>
					<Reveal delay={0.06}>
						<div className="max-w-4xl">
							<p className="text-lg md:text-xl text-gray-700 leading-relaxed body-paragraph">
								{t.wallOfFame.intro}
							</p>
						</div>
					</Reveal>
					<div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{ 
								title: t.wallOfFame.card1Title, 
								desc: t.wallOfFame.card1Desc
							},
							{ 
								title: t.wallOfFame.card2Title, 
								desc: t.wallOfFame.card2Desc
							},
							{ 
								title: t.wallOfFame.card3Title, 
								desc: t.wallOfFame.card3Desc
							},
						].map((c, i) => (
							<Reveal key={c.title} delay={i * 0.06}>
							<div className="card-wall-of-fame">
								<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FFF6E8', color: '#C89B3C' }}>
									{t.wallOfFame.comingSoon}
								</span>
								<h3 className="text-lg font-semibold text-navy-900">{c.title}</h3>
								<p className="text-gray-700 flex-grow">{c.desc}</p>
							</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section id="careers" className="section-dark-alt">
				<div className="container-premium">
					<Reveal>
						<div className="max-w-4xl mx-auto text-center">
							<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">{t.careers.title}</h2>
							<p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
								{t.careers.subtitle}
							</p>
							<p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 body-paragraph">
								{t.careers.intro}
							</p>
						</div>
					</Reveal>
					<div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								badge: t.careers.coming2026,
								title: t.careers.role1Title,
								description: t.careers.role1Desc,
								buttonText: t.careers.applyComingSoon
							},
							{
								badge: t.careers.coming2026,
								title: t.careers.role2Title,
								description: t.careers.role2Desc,
								buttonText: t.careers.joinTalentPool
							},
							{
								badge: t.careers.coming2026,
								title: t.careers.role3Title,
								description: t.careers.role3Desc,
								buttonText: t.careers.joinTalentPool
							}
						].map((role, i) => (
							<Reveal key={role.title} delay={i * 0.06}>
								<div className="card-wall-of-fame">
									<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FFF6E8', color: '#C89B3C' }}>
										{role.badge}
									</span>
									<h3 className="text-lg font-semibold text-navy-900">{role.title}</h3>
									<p className="text-gray-700 flex-grow">{role.description}</p>
									<a 
										href="#join-our-team"
										onClick={handleScrollToJoinTeam}
										className="mt-6 w-full inline-block text-center px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-white font-semibold transition-all"
									>
										{role.buttonText}
									</a>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section id="join-our-team" className="section-dark-alt">
				<div className="container-premium">
					<Reveal>
						<div className="max-w-4xl">
							<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">{t.joinTeam.title}</h2>
							<div className="space-y-4 text-gray-700">
								<p className="text-lg md:text-xl leading-relaxed">
									{t.joinTeam.description1}
								</p>
								<p className="text-lg md:text-xl leading-relaxed font-medium text-navy-900">
									{t.joinTeam.description2}
								</p>
							</div>
						</div>
					</Reveal>
					<Reveal delay={0.06}>
						<div className="mt-8 max-w-4xl card-glass p-8 md:p-10 border-t-4 border-gold-500">
							<h3 className="text-2xl md:text-3xl font-semibold text-navy-900 mb-6">How to Apply</h3>
							<p className="text-gray-700 mb-8 text-lg leading-relaxed">
								We're currently accepting applications by email. Please review the requirements below before emailing your application.
							</p>
							<div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4 mb-8">
								<p className="text-navy-900 font-semibold">
									Use this subject line: <span className="font-mono text-sm bg-white/60 px-2 py-1 rounded">"RISE Application – [Full Name]"</span>
								</p>
							</div>
							<div className="mb-8 bg-slate-50 rounded-lg p-6 border border-gray-200/60">
								<p className="text-navy-900 font-semibold mb-4 text-lg">Your email must include:</p>
								<ul className="space-y-3 text-gray-700">
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1">•</span>
										<span>Full name</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1">•</span>
										<span>Phone number</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1">•</span>
										<span>
											Role you're applying for (choose one):
											<ul className="mt-2 ml-4 space-y-2">
												<li className="flex items-start">
													<span className="text-gold-500/70 mr-2 mt-1">–</span>
													<span>Delivery Driver</span>
												</li>
												<li className="flex items-start">
													<span className="text-gold-500/70 mr-2 mt-1">–</span>
													<span>Operations Supervisor (Talent Pool)</span>
												</li>
												<li className="flex items-start">
													<span className="text-gold-500/70 mr-2 mt-1">–</span>
													<span>Operations Manager (Talent Pool)</span>
												</li>
											</ul>
										</span>
									</li>
									<li className="flex items-start">
										<span className="text-gold-500 mr-3 mt-1">•</span>
										<span>Resume attached (PDF preferred)</span>
									</li>
								</ul>
							</div>
							<p className="text-gray-700 mb-8 text-lg leading-relaxed">
								Once you have all the required information ready, email your resume using the button below.
							</p>
							<div className="flex justify-start">
								<a 
									href="mailto:info@risedsp.com?subject=RISE%20Operations%20Application"
									className="btn btn-primary text-lg px-8 py-4"
								>
									Email Your Resume
								</a>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="contact" className="section-dark">
				<div className="container-premium">
					<Reveal>
						<h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">{t.contact.title}</h2>
					</Reveal>
					<Reveal delay={0.03}>
						<p className="text-lg text-gray-600 mb-8">{t.contact.subtitle}</p>
					</Reveal>
					<div className="mt-8 max-w-3xl">
						<Reveal delay={0.06}>
							<div className="card-glass p-8 md:p-10">
								<h3 className="text-xl md:text-2xl font-semibold text-navy-900 mb-6">{t.contact.companyName}</h3>
								<div className="space-y-6">
									<div className="flex flex-col sm:flex-row sm:items-start gap-3">
										<div className="flex-shrink-0">
											<svg className="w-6 h-6 text-gold-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{t.contact.email}</p>
											<a href={`mailto:${t.contact.emailValue}`} className="text-lg text-navy-900 hover:text-gold-500 transition-colors font-medium">
												{t.contact.emailValue}
											</a>
										</div>
									</div>
									<div className="flex flex-col sm:flex-row sm:items-start gap-3">
										<div className="flex-shrink-0">
											<svg className="w-6 h-6 text-gold-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
											</svg>
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{t.contact.phone}</p>
											<a href={`tel:${t.contact.phoneValue.replace(/-/g, '')}`} className="text-lg text-navy-900 hover:text-gold-500 transition-colors font-medium">
												{t.contact.phoneValue}
											</a>
										</div>
									</div>
									<div className="flex flex-col sm:flex-row sm:items-start gap-3">
										<div className="flex-shrink-0">
											<svg className="w-6 h-6 text-gold-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{t.contact.location}</p>
											<p className="text-lg text-navy-900 font-medium">{t.contact.locationValue}</p>
										</div>
									</div>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<Footer />

			<Modal
				open={joinOpen}
				onClose={() => setJoinOpen(false)}
				title={t.modal.applicationReceived}
				message={t.modal.applicationMessage}
			/>
		</>
	);
}


