import { EventEmitter } from 'events';

// Définir les événements du panier avec des types corrects
interface SidebarEvents {
	sidebarOpen: []; // Aucun payload pour sidebarOpen
	sidebarClose: []; // Aucun payload pour sidebarClose
}

// Création d'une instance typée d'EventEmitter pour les événements du sidebar
export const sidebarEventEmitter = new EventEmitter<SidebarEvents>();
