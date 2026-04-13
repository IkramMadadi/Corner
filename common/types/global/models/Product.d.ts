declare type ProductLabelsT =
  | "new"
  | "bestSeller"
  | "featured"
  | "onSale"
  | "outOfStock"
  | "lowInStock";

declare interface ProductI<
  WEBSITE = string,
  CATEGORY = WEBSITE,
  ADMIN = WEBSITE
> extends PublishableContentI<WEBSITE, ProductLabelsT> {
  sku: string;
  flags: ProductFlagsI;
  createdBy: ADMIN; // UserID
  category?: CATEGORY; // CategoryID
  thumbnail: CaptionedImageI; // array of URLs
  images: CaptionedImageI[]; // array of URLs
  pricing: PricingI;
  description: LanguagesContentI;
  additional: ProductAdditionalI;
  ratingAggregation: RatingAggregationI;
  soldAggregation: SoldAggregationI;
  pricePriority?: ProductAdditionalVariantKeys[];
  upsell?: UpsellConfigI<T>;
}

declare interface SimpleProductI<ID = string> {
  productId: ID;
  price: number;
  name: LanguagesContentI;
  thumbnail: CaptionedImageI;
}

declare interface PublicProductI<
  ID = string,
  WEBSITE = string,
  CATEGORY = WEBSITE,
  ADMIN = WEBSITE
> extends Omit<ProductI<WEBSITE, CATEGORY, ADMIN>, "createdBy">,
    TimeStampI<string> {
  _id: ID;
}

declare interface CreateProductI<WEBSITE = string, CATEGORY = WEBSITE>
  extends Omit<
    ProductI<WEBSITE, CATEGORY>,
    "flags" | "soldAggregation" | "ratingAggregation"
  > {}

declare interface ProductTableDataI<
  ID = string,
  WEBSITE = string,
  CATEGORY = BasicPublishableInformationWithIdI<ID>,
  ADMIN = PersonalInformationI & { _id: ID }
> extends Omit<
      ProductI<WEBSITE, CATEGORY, ADMIN>,
      "additional" | "images" | "flags" | "description" | "tags"
    >,
    TimeStampI<string> {
  _id: ID;
  hasAdditional: boolean;
  upsell?: UpsellConfigI;
}

declare interface CartProductI<ID = string, WEBSITE = string>
  extends Omit<
      PublicProductI<ID, WEBSITE, BasicPublishableInformationWithIdI<ID>>,
      | "website"
      | "soldAggregation"
      | "additional"
      | "images"
      | "flags"
      | "description"
      | "tags"
      | "summary"
      | "pricePriority"
      | "upsell"
    >,
    TimeStampI<string> {
  hasAdditional: boolean;
}

declare type ProductSortableFields =
  | "createdAt"
  | "name"
  | "score"
  | "ratingAggregation.average"
  | "ratingAggregation.count"
  | "soldAggregation.count"
  | "pricing.current";

/* Forms types */
declare type ProductInformationI = Pick<
  PublicProductI,
  "name" | "description" | "summary" | "slug" | "sku"
>;
declare type ProductImagesI = Pick<ProductI, "thumbnail" | "images">;

declare interface ProductSearchResultI {
	_id: string;
	name: LanguagesContentI;
	thumbnail: CaptionedImageI;
	slug: string;
}

declare interface UpsellUpdateDataI {
	enabled: boolean;
	parent?: string;
	landingPage?: string;
}