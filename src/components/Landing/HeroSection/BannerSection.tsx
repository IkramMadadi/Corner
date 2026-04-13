'use client';

import React from 'react';
import Banner from '../Banner';
import BannerSlider from '#client/Sliders/BannersSlider';

export default function BannerSection({ banners }: { banners: PublicBannerElementI[] }) {
	return <BannerSlider slides={banners} RenderComponent={Banner} />;
}
