import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TCPAPage() {
	return (
		<>
			<Nav />
			<main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
			<div className="container-premium py-16 md:py-24">
				<div className="max-w-4xl">
					<h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">Contact & TCPA Disclaimer</h1>

					<div className="prose prose-slate max-w-none space-y-6 text-gray-700">
						<p>
							By submitting your information through this website, you agree that RISE Operations LLC may contact you regarding job opportunities or inquiries you initiated. You may receive phone calls, emails, or text messages. Message and data rates may apply. You may opt out at any time by replying STOP.
						</p>

						<p>
							RISE Operations LLC does not share applicant information with Amazon. All hiring decisions and communication are handled solely by RISE Operations LLC.
						</p>
					</div>
				</div>
			</div>
		</main>
		<Footer />
		</>
	);
}

