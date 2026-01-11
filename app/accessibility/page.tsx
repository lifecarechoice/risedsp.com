import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AccessibilityPage() {
	return (
		<>
			<Nav />
			<main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
			<div className="container-premium py-16 md:py-24">
				<div className="max-w-4xl">
					<h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">Accessibility Statement</h1>

					<div className="prose prose-slate max-w-none space-y-6 text-gray-700">
						<p>
							RISE Operations LLC is committed to making our website accessible to individuals with disabilities. We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
						</p>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Accessibility Features:</h2>
							<ul className="list-disc pl-6 space-y-2">
								<li>High-contrast text</li>
								<li>Logical structure and headings</li>
								<li>Keyboard navigation support</li>
								<li>Screen-reader friendly layout</li>
							</ul>
						</section>

						<section className="mt-8">
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Contact Us</h2>
							<p className="mb-3">If you experience any difficulty accessing our website, please contact us:</p>
							<div className="space-y-2 text-gray-700">
								<p>
									<strong>Email:</strong> <a href="mailto:info@risedsp.com" className="text-gold-500 hover:text-gold-400 underline">info@risedsp.com</a>
								</p>
								<p>
									<strong>Phone:</strong> <a href="tel:8883337709" className="text-gold-500 hover:text-gold-400 underline">888-333-7709</a>
								</p>
								<p>
									<strong>Operating in:</strong> Midland–Odessa, TX<br />
									<strong>Serving:</strong> Permian Basin Area
								</p>
							</div>
							<p className="mt-4">We will respond promptly and work to improve accessibility features.</p>
						</section>
					</div>
				</div>
			</div>
		</main>
		<Footer />
		</>
	);
}

