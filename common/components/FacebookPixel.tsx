'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

const FacebookPixel = ({ pixelId, websiteId }: { pixelId: string; websiteId: string }) => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const cleanPixelId = pixelId.trim();

    const lastUrlRef = useRef<string>('');

    const sendPageViewCapi = async (url: string, eventId: string) => {
        try {
            await fetch(`/api/facebook-event/PageView`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
                body: JSON.stringify({ websiteId, url, event_id: eventId }),
            });
        } catch (e) {
            console.error('Error sending PageView to CAPI:', e);
        }
    };

    useEffect(() => {
        if (!loaded || typeof window?.fbq !== 'function') return;

        const url = window.location.href;

        if (lastUrlRef.current === url) return;

        lastUrlRef.current = url;

        const eventId = uuidv4();

        window.fbq('track', 'PageView', {}, { eventID: eventId });

        void sendPageViewCapi(url, eventId);
    }, [loaded, pathname, searchParams]);

    const handlePixelLoad = () => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('✅ Facebook Pixel initialized');
        }
        setLoaded(true);
    };

    return (
        <>
            <Script
                id="fb-pixel-init"
                strategy="afterInteractive"
                onLoad={handlePixelLoad}
                dangerouslySetInnerHTML={{
                    __html: `
                        !(function(f, b, e, v, n, t, s) {
                            if (f.fbq) return;
                            n = f.fbq = function() {
                                n.callMethod 
                                    ? n.callMethod.apply(n, arguments) 
                                    : n.queue.push(arguments);
                            };
                            if (!f._fbq) f._fbq = n;
                            n.push = n;
                            n.loaded = !0;
                            n.version = '2.0';
                            n.queue = [];
                            t = b.createElement(e);
                            t.async = !0;
                            t.src = v;
                            s = b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t, s);
                        })(window, document, 'script', 
                        'https://connect.facebook.net/en_US/fbevents.js');

                        fbq('init', '${cleanPixelId}');
                    `,
                }}
            />

            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${cleanPixelId}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
};

export default FacebookPixel;
