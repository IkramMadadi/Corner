import { GoogleAnalytics as GA } from '@next/third-parties/google';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
	return <GA gaId={gaId} />;
}
