import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
	return (
		<>
			<Nav />
			<main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
			<div className="container-premium py-16 md:py-24">
				<div className="max-w-4xl">
					<h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">Privacy Policy</h1>
					<p className="text-sm text-gray-600 mb-8">Last Updated: November 17, 2025</p>

					<div className="prose prose-slate max-w-none space-y-6 text-gray-700">
						<p>
							RISE Operations LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you submit forms or interact with our website.
						</p>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Information We Collect</h2>
							<p className="mb-3">We may collect:</p>
							<ul className="list-disc pl-6 space-y-2 mb-4">
								<li>Name</li>
								<li>Email address</li>
								<li>Phone number</li>
								<li>Location</li>
								<li>Driver license status</li>
								<li>Age confirmation</li>
								<li>Any optional notes you provide</li>
							</ul>
							<p>We do not collect Social Security numbers, banking information, or sensitive personal data.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">How We Use Your Information</h2>
							<p className="mb-3">We may use the information you submit to:</p>
							<ul className="list-disc pl-6 space-y-2 mb-4">
								<li>Review job applications</li>
								<li>Contact you regarding opportunities</li>
								<li>Respond to inquiries</li>
								<li>Improve our website</li>
							</ul>
							<p>
								We do not sell or share your information with third parties for marketing. We do not share applicant information with Amazon. All hiring decisions are made solely by RISE Operations LLC.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Security</h2>
							<p>We use reasonable administrative and technical safeguards to protect your information.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Your Choices</h2>
							<p>
								To request access, correction, or deletion of your information, email: <a href="mailto:info@risedsp.com" className="text-gold-500 hover:text-gold-400 underline">info@risedsp.com</a>
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Third-Party Links</h2>
							<p>We are not responsible for privacy practices of external sites.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Children's Privacy</h2>
							<p>This website is not intended for individuals under 18.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">Changes to This Policy</h2>
							<p>We may update this Privacy Policy at any time. Updates will be posted on this page.</p>
						</section>
					</div>
				</div>
			</div>
		</main>
		<Footer />
		</>
	);
}
