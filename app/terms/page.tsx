import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TermsPage() {
	return (
		<>
			<Nav />
			<main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
			<div className="container-premium py-16 md:py-24">
				<div className="max-w-4xl">
					<h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">Terms of Use</h1>
					<p className="text-sm text-gray-600 mb-8">Last Updated: November 17, 2025</p>

					<div className="prose prose-slate max-w-none space-y-6 text-gray-700">
						<p>
							Welcome to the website of RISE Operations LLC ("we," "our," or "us"). By using this site, you agree to the following Terms of Use.
						</p>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Use of This Website</h2>
							<p>You may browse this site for informational purposes only. You may not misuse the website, attempt unauthorized access, or copy proprietary content.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Employment Disclaimer</h2>
							<p className="mb-3">
								Submitting a form does not guarantee employment, an interview, hours, pay, or benefits. All hiring decisions are made solely by RISE Operations LLC in accordance with applicable laws.
							</p>
							<p>
								RISE Operations LLC is an independent company and is not an employer or agent of Amazon.com, Inc.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Accuracy of Information</h2>
							<p>We do not guarantee that all website information is complete or error-free.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">No Professional Advice</h2>
							<p>Content is for general informational purposes only.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Limitation of Liability</h2>
							<p>RISE Operations LLC is not liable for technical issues, errors, downtime, or damages arising from use of this site.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Governing Law</h2>
							<p>These Terms are governed by the laws of the State of Texas.</p>
						</section>
					</div>
				</div>
			</div>
		</main>
		<Footer />
		</>
	);
}
