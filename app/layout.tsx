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
	title: "RISE Operations LLC | Odessa–Midland Last-Mile Delivery",
	description:
		"Safety-led, people-first, relentlessly reliable. RISE Operations LLC delivers high-performing last-mile operations in the Odessa–Midland area.",
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


