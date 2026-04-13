declare interface UpsellConfigI {
    parent?: string;
    landingPage?: string;
    enabled: boolean;
}

declare interface UpsellParentDataI {
    _id: string;
    name: LanguagesContentI;
    thumbnail: ImageI;
    pricing: PricingI;
    landingPage: string;
    features?: string[];
    summary?: LanguagesContentI;
}

declare interface ProductWithUpsellI extends PublicProductI {
    upsell?: UpsellConfigI;
    upsellParent?: UpsellParentDataI;
}