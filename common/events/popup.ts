import { EventEmitter } from 'events';

interface PopupEvents {
	popupOpen: [orderId: string];
	popupClose: [];
}

export const popupEventEmitter = new EventEmitter<PopupEvents>();
