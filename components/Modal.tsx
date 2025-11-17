/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	title: string;
	message: string;
};

export default function Modal({ open, onClose, title, message }: ModalProps) {
	const { t } = useLanguage();
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (open) window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6"
			aria-modal="true"
			role="dialog"
		>
			<div className="card max-w-md w-full p-6">
				<div className="flex items-start justify-between">
					<h3 className="text-lg font-semibold">{title}</h3>
					<button
						onClick={onClose}
						aria-label={t.modal.close}
						className="ml-4 rounded-md p-2 hover:bg-black/5"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<p className="mt-3 text-sm text-navy-900/80">{message}</p>
				<div className="mt-6">
					<button onClick={onClose} className="btn btn-primary w-full">{t.modal.close}</button>
				</div>
			</div>
		</div>
	);
}


