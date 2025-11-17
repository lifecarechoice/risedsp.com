"use client";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
	from?: number;
	to: number;
	duration?: number; // ms
	suffix?: string;
	decimals?: number;
};

export default function CountUp({ from = 0, to, duration = 1500, suffix = "", decimals = 0 }: CountUpProps) {
	const [value, setValue] = useState(from);
	const ref = useRef<number | null>(null);
	const startTs = useRef<number | null>(null);

	useEffect(() => {
		function step(ts: number) {
			if (startTs.current === null) startTs.current = ts;
			const progress = Math.min(1, (ts - startTs.current) / duration);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = from + (to - from) * eased;
			setValue(current);
			if (progress < 1) {
				ref.current = requestAnimationFrame(step);
			} else {
				ref.current = null;
			}
		}
		ref.current = requestAnimationFrame(step);
		return () => {
			if (ref.current) cancelAnimationFrame(ref.current);
		};
	}, [from, to, duration]);

	return <span>{value.toFixed(decimals)}{suffix}</span>;
}


