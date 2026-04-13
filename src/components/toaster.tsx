import { ToasterProps } from 'react-hot-toast';

export const toasterConfig: ToasterProps = {
	reverseOrder: false,
	toastOptions: {
		position: 'bottom-right',
		duration: 5000,
		success: {
			className: 'alert py-2',
		},
	},
};
