const banners: PublicBannerElementI[] = [
	{
		_id: '2',
		title: {
			en: "Embrace Natural Beauty with AquaSoft's Nourishing Care",
			fr: "Adoptez la beauté naturelle avec les soins nourrissants d'AquaSoft",
			ar: 'احتضن الجمال الطبيعي مع العناية المغذية من أكوا سوفت',
		},
		color: 'light',
		overlay: 0.3,
		buttons: [
			{
				text: { en: 'Sign Up', fr: 'S’inscrire', ar: 'سجل' },
				link: '/auth/register',
				type: 'primary',
			},
			{
				text: { en: 'Contact Us', fr: 'Contactez-nous', ar: 'اتصل بنا' },
				link: '/home#contact',
				type: 'ghost',
				icon: {
					left: 'play',
				},
			},
		],
		image: '',
		alert: {
			content: {
				en: '✨ New features coming soon!',
				fr: '✨ De nouvelles fonctionnalités arrivent bientôt !',
				ar: '✨ ميزات جديدة قادمة قريبًا!',
			},
			buttons: [
				{
					text: { en: 'Learn More', fr: 'En savoir plus', ar: 'اعرف المزيد' },
					link: '/features',
					type: 'primary',
					icon: {
						right: 'arrow-right',
					},
				},
			],
		},
	},
	/* {
		_id: '1',
		title: {
			en: "Embrace Natural Beauty with AquaSoft's Nourishing Care",
			fr: "Adoptez la beauté naturelle avec les soins nourrissants d'AquaSoft",
			ar: 'احتضن الجمال الطبيعي مع العناية المغذية من أكوا سوفت',
		},
		color: 'dark',
		overlay: 0.3,
		buttons: [
			{
				text: { en: 'Learn More', fr: 'En savoir plus', ar: 'اعرف المزيد' },
				link: '/learn-more',
				type: 'primary',
				icon: {
					left: 'arrow-left',
					right: 'arrow-right',
				},
			},
			{
				text: { en: 'Get Started', fr: 'Commencer', ar: 'ابدأ' },
				link: '/get-started',
				type: 'secondary',
				icon: {
					left: 'arrow-left',
					right: 'arrow-right',
				},
			},
			{
				text: { en: 'Get Started', fr: 'Commencer', ar: 'ابدأ' },
				link: '/get-started',
				type: 'success',
				icon: {
					left: 'arrow-left',
					right: 'arrow-right',
				},
			},
			{
				text: { en: 'Get Started', fr: 'Commencer', ar: 'ابدأ' },
				link: '/get-started',
				type: 'warning',
				icon: {
					left: 'arrow-left',
					right: 'arrow-right',
				},
			},
			{
				text: { en: 'Get Started', fr: 'Commencer', ar: 'ابدأ' },
				link: '/get-started',
				type: 'error',
				icon: {
					left: 'arrow-left',
					right: 'arrow-right',
				},
			},
			{
				text: { en: 'Get Started', fr: 'Commencer', ar: 'ابدأ' },
				link: '/get-started',
				type: 'ghost',
				icon: {
					left: 'cart',
					right: 'arrow-right',
				},
			},
		],
		image: '/images/banner.png',
		alert: null,
	}, */
];
export default banners;
