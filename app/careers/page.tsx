"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CareersPage() {
	const router = useRouter();
	
	useEffect(() => {
		// Redirect to home page with careers anchor
		router.replace("/#careers");
	}, [router]);
	
	return null;
}
