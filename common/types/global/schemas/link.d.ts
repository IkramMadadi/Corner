declare type CustomersT = 'Customer' | 'Guest';
declare type LinkKeys = 'Website' | 'Product' | 'WebCollection' | 'Category' | 'Blog' | 'Customer';
declare interface LinkI<ID = string> {
	ref: ID;
	refCollection: LinkKeys;
}
