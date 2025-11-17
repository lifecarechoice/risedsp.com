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

type ContactForm = {
	name: string;
	email: string;
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

	// Contact form
	const [contactForm, setContactForm] = useState<ContactForm>({
		name: "",
		email: "",
		message: "",
	});
	const [contactOpen, setContactOpen] = useState(false);

	// Persist forms locally
	useEffect(() => {
		try {
			const saved = localStorage.getItem("rise-join-form");
			if (saved) setJoinForm(JSON.parse(saved));
		} catch {}
	}, []);

	useEffect(() => {
		try {
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

	function handleJoinSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setJoinOpen(true);
		// keep local storage as-is for demo
	}

	function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setContactOpen(true);
	}

	return (
		<>
			<section
				id="home"
				className="relative min-h-screen bg-navy-900 hero-grid brand-gradient overflow-hidden"
				onMouseMove={(e) => {
					const { innerWidth, innerHeight } = window;
					const x = ((e.clientX - innerWidth / 2) / innerWidth) * 12;
					const y = ((e.clientY - innerHeight / 2) / innerHeight) * 12;
					mouseX.set(x);
					mouseY.set(y);
				}}
			>
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute inset-0 bg-gradient-to-b from-navy-900/75 via-navy-900/80 to-navy-900/85" />
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
								<h3 className="text-xl md:text-2xl font-bold text-navy-900">{t.about.ownerTitle}</h3>
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
								<h3 className="text-xl md:text-2xl font-bold text-navy-900">{t.about.deliverTitle}</h3>
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
							{ 
								title: t.wallOfFame.card4Title, 
								desc: t.wallOfFame.card4Desc
							},
							{ 
								title: t.wallOfFame.card5Title, 
								desc: t.wallOfFame.card5Desc
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
							<p className="text-sm text-gray-500 italic mt-6">
								{t.careers.note}
							</p>
						</div>
					</Reveal>
					<div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								badge: t.careers.coming2026,
								title: t.careers.role1Title,
								description: t.careers.role1Desc
							},
							{
								badge: t.careers.coming2026,
								title: t.careers.role2Title,
								description: t.careers.role2Desc
							},
							{
								badge: t.careers.coming2026,
								title: t.careers.role3Title,
								description: t.careers.role3Desc
							}
						].map((role, i) => (
							<Reveal key={role.title} delay={i * 0.06}>
								<div className="card-wall-of-fame">
									<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FFF6E8', color: '#C89B3C' }}>
										{role.badge}
									</span>
									<h3 className="text-lg font-semibold text-navy-900">{role.title}</h3>
									<p className="text-gray-700 flex-grow">{role.description}</p>
									<button 
										disabled
										className="mt-6 w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-500 font-semibold cursor-not-allowed opacity-60 transition-all"
									>
										{t.careers.applyComingSoon}
									</button>
								</div>
							</Reveal>
						))}
					</div>
					<Reveal delay={0.18}>
						<div className="mt-12 md:mt-16 text-center">
							<p className="text-sm text-gray-500 italic">
								{t.careers.closingNote}
							</p>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="join-our-team" className="section-dark-alt">
				<div className="container-premium">
					<Reveal>
						<div className="max-w-4xl">
							<h2 className="text-3xl md:text-4xl font-bold text-navy-900">{t.joinTeam.title}</h2>
							<div className="mt-3 space-y-3 text-gray-700">
								<p>
									{t.joinTeam.description1}
								</p>
								<p>
									{t.joinTeam.description2}
								</p>
							</div>
						</div>
					</Reveal>
					<form onSubmit={handleJoinSubmit} className="mt-8 max-w-4xl card-glass p-8">
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.fullName}</label>
								<input className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
									value={joinForm.name} onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })} required />
							</div>
							<div>
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.email}</label>
								<input type="email" className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
									value={joinForm.email} onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })} required />
							</div>
							<div>
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.phone}</label>
								<input className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
									value={joinForm.phone} onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })} required />
							</div>
							<div className="relative">
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.ageQuestion}</label>
								<select className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none cursor-pointer"
									value={joinForm.age} onChange={(e) => setJoinForm({ ...joinForm, age: e.target.value })}>
									<option value="Select">{t.joinTeam.form.select}</option>
									<option value="Yes">{t.joinTeam.form.yes}</option>
									<option value="No">{t.joinTeam.form.no}</option>
								</select>
								<div className="absolute right-3 top-[38px] pointer-events-none">
									<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
							<div className="relative">
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.licenseQuestion}</label>
								<select className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none cursor-pointer"
									value={joinForm.license} onChange={(e) => setJoinForm({ ...joinForm, license: e.target.value })}>
									<option value="Yes">{t.joinTeam.form.yes}</option>
									<option value="No">{t.joinTeam.form.no}</option>
								</select>
								<div className="absolute right-3 top-[38px] pointer-events-none">
									<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
							<div className="relative">
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.outdoorQuestion}</label>
								<select className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none cursor-pointer"
									value={joinForm.outdoor} onChange={(e) => setJoinForm({ ...joinForm, outdoor: e.target.value })}>
									<option value="Yes">{t.joinTeam.form.yes}</option>
									<option value="No">{t.joinTeam.form.no}</option>
								</select>
								<div className="absolute right-3 top-[38px] pointer-events-none">
									<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
						</div>
						<div className="mt-6">
							<label className="block text-sm font-medium text-navy-900 mb-2">{t.joinTeam.form.message}</label>
							<textarea rows={4} className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
								value={joinForm.message} onChange={(e) => setJoinForm({ ...joinForm, message: e.target.value })} />
						</div>
						<div className="mt-6">
							<button className="btn btn-primary">{t.joinTeam.form.submit}</button>
						</div>
					</form>
				</div>
			</section>

			<section id="contact" className="section-dark">
				<div className="container-premium">
					<Reveal>
						<h2 className="text-3xl md:text-4xl font-bold text-navy-900">{t.contact.title}</h2>
					</Reveal>
					<div className="mt-8 grid md:grid-cols-2 gap-6">
						<Reveal>
							<div className="card-glass p-6">
							<h3 className="text-lg font-semibold text-navy-900">{t.contact.companyName}</h3>
							<ul className="mt-4 space-y-3 text-gray-700">
								<li><span className="font-medium text-navy-900">{t.contact.email}</span> {t.contact.emailValue}</li>
								<li><span className="font-medium text-navy-900">{t.contact.location}</span> {t.contact.locationValue}</li>
								<li><span className="font-medium text-navy-900">{t.contact.services}</span> {t.contact.servicesValue}</li>
							</ul>
						</div>
						</Reveal>
						<Reveal delay={0.06}>
							<form onSubmit={handleContactSubmit} className="card-glass p-6">
							<div>
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.contact.form.name}</label>
								<input className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
									value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.contact.form.email}</label>
								<input type="email" className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
									value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-navy-900 mb-2">{t.contact.form.message}</label>
								<textarea rows={4} className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
									value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required />
							</div>
							<button className="btn btn-primary mt-6 w-full md:w-auto">{t.contact.form.submit}</button>
						</form>
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
			<Modal
				open={contactOpen}
				onClose={() => setContactOpen(false)}
				title={t.modal.messageSent}
				message={t.modal.messageSentText}
			/>
		</>
	);
}


