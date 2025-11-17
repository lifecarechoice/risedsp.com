"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
	const { t } = useLanguage();
	return (
		<footer className="bg-slate-800 text-gray-300">
			<div className="container-premium py-12 md:py-16">
				<div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
					{/* Company Info */}
					<div>
						<h3 className="text-white font-semibold mb-4 text-lg">{t.footer.company}</h3>
						<div className="space-y-2 text-sm">
							<p>{t.footer.location}</p>
							<p>
								<a href="tel:8883337709" className="hover:text-white transition-colors">{t.footer.phone} {t.footer.phoneValue}</a>
							</p>
							<p>
								<a href="mailto:info@risedsp.com" className="hover:text-white transition-colors">{t.footer.email} {t.footer.emailValue}</a>
							</p>
						</div>
					</div>

					{/* Legal Links */}
					<div>
						<h3 className="text-white font-semibold mb-4 text-lg">{t.footer.legal}</h3>
						<nav className="flex flex-col space-y-2 text-sm">
							<a href="/#careers" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">{t.footer.careers}</a>
							<a href="/privacy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">{t.footer.privacy}</a>
							<a href="/terms" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">{t.footer.terms}</a>
							<a href="/accessibility" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">{t.footer.accessibility}</a>
							<a href="/tcpa" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">{t.footer.tcpa}</a>
						</nav>
					</div>
				</div>

				{/* Copyright and Back to Top */}
				<div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
					<p>{t.footer.copyright}</p>
					<a href="#home" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">{t.footer.backToTop}</a>
				</div>
			</div>
		</footer>
	);
}


