/* import CalculateProductPrice from './CalculateProductPrice';

// Mock data for tests
const mockProduct: ProductI = {
	pricing: { current: 100 },
	additional: {
		sizes: [
			{ _id: 'S', price: { current: 90 } } as VariantI,
			{ _id: 'M', price: { current: 100 } } as VariantI,
			{ _id: 'L', price: { current: 110 } } as VariantI,
		],
		colors: [
			{ _id: 'Red', price: { current: 95 } } as VariantI,
			{ _id: 'Blue', price: { current: 100 } } as VariantI,
		],
	},
} as ProductI;

const testCases = [
	{
		description: 'No variants selected (returns base price)',
		product: mockProduct,
		cartProduct: { product: '123', variants: [], count: 1 } as ProductsCartI<string>,
		pricePriority: ['sizes', 'colors'] as ProductAdditionalVariantKeys[],
		expected: 100,
	},
	{
		description: 'Single variant selected (size: L)',
		product: mockProduct,
		cartProduct: { product: '123', variants: [{ type: 'sizes', id: 'L' }], count: 1 } as ProductsCartI<string>,
		pricePriority: ['sizes', 'colors'] as ProductAdditionalVariantKeys[],
		expected: 110,
	},
	{
		description: 'Single variant selected (color: Red)',
		product: mockProduct,
		cartProduct: {
			product: '123',
			variants: [{ type: 'colors', id: 'Red' }],
			count: 1,
		} as ProductsCartI<string>,
		pricePriority: ['sizes', 'colors'] as ProductAdditionalVariantKeys[],
		expected: 95,
	},
	{
		description: 'Multiple variants with priority (size: L, color: Red)',
		product: mockProduct,
		cartProduct: {
			product: '123',
			variants: [
				{ type: 'sizes', id: 'L' },
				{ type: 'colors', id: 'Red' },
			],
			count: 1,
		} as ProductsCartI<string>,
		pricePriority: ['sizes', 'colors'] as ProductAdditionalVariantKeys[],
		expected: 110,
	},
	{
		description: 'Multiple variants with reversed priority (size: L, color: Red)',
		product: mockProduct,
		cartProduct: {
			product: '123',
			variants: [
				{ type: 'sizes', id: 'L' },
				{ type: 'colors', id: 'Red' },
			],
			count: 1,
		} as ProductsCartI<string>,
		pricePriority: ['colors', 'sizes'] as ProductAdditionalVariantKeys[],
		expected: 95,
	},
	{
		description: 'Variant type with no match in additional (returns base price)',
		product: mockProduct,
		cartProduct: {
			product: '123',
			variants: [{ type: 'nonexistent', id: 'Unknown' }],
			count: 1,
		} as unknown as ProductsCartI<string>,
		pricePriority: ['sizes', 'colors'] as ProductAdditionalVariantKeys[],
		expected: 100,
	},
	{
		description: 'Empty pricePriority (returns base price)',
		product: mockProduct,
		cartProduct: {
			product: '123',
			variants: [
				{ type: 'sizes', id: 'L' },
				{ type: 'colors', id: 'Red' },
			],
			count: 1,
		} as ProductsCartI<string>,
		pricePriority: [] as ProductAdditionalVariantKeys[],
		expected: 100,
	},
];

// Test runner
describe('CalculateProductPrice', () => {
	testCases.forEach(({ description, product, cartProduct, pricePriority, expected }) => {
		it(description, () => {
			const result = CalculateProductPrice(
				product.pricing,
				product.additional,
				cartProduct.variants,
				pricePriority
			);
			expect(result.current).toBe(expected);
		});
	});
});
 */
