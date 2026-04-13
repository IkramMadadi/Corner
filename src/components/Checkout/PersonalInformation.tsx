import { Phone, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

type PersonalInformationProps = {
	name?: string;
	phone?: string;
};

export function PersonalInformation({ name, phone }: PersonalInformationProps) {
	const t = useTranslations('Profile');
	const form = useTranslations('Checkout');

	const isNameValid = !!name  && name.trim().length > 1;
	const isPhoneValid = !!phone && phone.trim().length > 5;

	return (
		<div className="flex flex-col gap-3">
			<h2 className="text-xl font-semibold text-gray-900">{t('personal')}</h2>

			<div className="flex items-start gap-2 space-x-4">
				{/* Icon Avatar */}
				<div className="flex-shrink-0">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
						<User className="h-6 w-6 text-blue-600" />
					</div>
				</div>

				{/* User Information */}
				<div className="min-w-0 flex-1">
					{/* Name */}
					<div className="mb-2 flex items-center gap-1 space-x-2">
						<User className="h-4 w-4 text-gray-400" />
						<p className="text-sm font-medium text-gray-900">{isNameValid ? name : form('placeholder')}</p>
						<span
							className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
								isNameValid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
							} `}
						>
							{isNameValid ? t('verified') : t('incomplete')}
						</span>
					</div>

					{/* Phone */}
					<div className="flex items-center gap-1 space-x-2">
						<Phone className="h-4 w-4 text-gray-400" />
						<p className="text-sm text-gray-500">{isPhoneValid ? phone : form('no-phone')}</p>
						<span
							className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${
								isPhoneValid
									? 'border-green-200 bg-green-100 text-green-800'
									: 'border-orange-200 bg-orange-100 text-orange-800'
							} `}
						>
							{isPhoneValid ? t('verified') : t('incomplete')}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
