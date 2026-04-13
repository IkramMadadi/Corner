export default function Indicator({ count }: { count: number }) {
	if (count === 0) return null;
	return (
		<span className="absolute right-0 top-0 flex aspect-square -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary p-1 font-sans text-[0.6rem] text-white">
			+{count}
		</span>
	);
}
