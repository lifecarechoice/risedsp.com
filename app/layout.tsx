import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

	export const metadata: Metadata = {
		title: "RISE Operations LLC | Creating leaders who deliver excellence and drive a lasting impact on society",
		description:
			"RISE Operations LLC is a safety-led, people-first logistics operation serving Midland–Odessa and the Permian Basin.",
		icons: {
			icon: '/logos/rise-logo-2.png',
			apple: '/logos/rise-logo-2.png',
		},
		openGraph: {
			title: "RISE Operations LLC | Creating leaders who deliver excellence and drive a lasting impact on society",
			description: "RISE Operations LLC is a safety-led, people-first logistics operation serving Midland–Odessa and the Permian Basin.",
			images: [
				{
					url: '/logos/rise-logo-3.png',
					width: 1563,
					height: 1563,
					alt: 'RISE Operations LLC',
				},
			],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: "RISE Operations LLC | Creating leaders who deliver excellence and drive a lasting impact on society",
			description: "RISE Operations LLC is a safety-led, people-first logistics operation serving Midland–Odessa and the Permian Basin.",
			images: ['/logos/rise-logo-3.png'],
		},
	};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.variable}>
			<body className="font-sans antialiased text-navy-900 bg-white">
				<LanguageProvider>{children}</LanguageProvider>
			</body>
		</html>
	);
}


