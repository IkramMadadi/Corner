import { EventEmitter } from 'events';

// Définir les événements du panier avec des types corrects
interface FilterBarEvents {
	filterBarOpen: []; // Aucun payload pour filterBarOpen
	filterBarClose: []; // Aucun payload pour filterBarClose
	emptyFilterBar: []; // Aucun payload pour emptyFilterBar
	removeCategory: [string];
}

// Création d'une instance typée d'EventEmitter pour les événements du filterBar
export const filterBarEventEmitter = new EventEmitter<FilterBarEvents>();
