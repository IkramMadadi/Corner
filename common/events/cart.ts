import { EventEmitter } from 'events';

interface CartEvents {
	cartOpen: [];
	cartClose: [];
}

export const cartEventEmitter = new EventEmitter<CartEvents>();
