declare interface ProductsListI<ID = string> {
	listId: string;
	title: LanguagesContentI;
	products: ID[];
}
