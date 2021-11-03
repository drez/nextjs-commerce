interface RawVariantSpec {
  SpecID: string
  Name: string
  OptionID: string
  Value: string
  PriceMarkupType: string
  PriceMarkup: string | null
}

export interface RawSpec {
  ID: string
  Name: string
  Options: {
    ID: string
    Value: string
    xp: {
      hexColor?: string
    }
  }[]
}

export interface RawVariant {
  ID: string
  Specs: RawVariantSpec[]
}

export interface RawProduct {
  OwnerID: string
  DefaultPriceScheduleID: string | null
  AutoForward: boolean
  ID: string
  Name: string
  Description: string
  QuantityMultiplier: number
  ShipWeight: null
  ShipHeight: null
  ShipWidth: null
  ShipLength: null
  Active: boolean
  SpecCount: number
  VariantCount: number
  ShipFromAddressID: null
  Inventory: null
  DefaultSupplierID: null
  AllSuppliersCanSell: boolean
  xp: {
    Price: number
    PriceCurrency: string
    Images: {
      url: string
    }[]
    Variants?: RawVariant[]
    Specs?: RawSpec[]
  }
}

export interface Product {
  name: string;
  fichier?: string;
  url?: string;
  id: number;
  entityId: number;
  description?: string;
  price?: number;
  price_show?: string;
  latitude?: string;
  longitude?: string;
  position?: Array<string | null>
  type?: string;
  post_date?: Date;
  date?: string;
  id_seller?: number;
  seller?: {
    name: string
  },
  path: string
}

export const Product: Product = {
  name: "Product not found",
  id: 0,
  description: "The product you requested has been sold or have expired.",
  path: '',
  entityId: 0
}

export interface Products {
  products: [Product]
}

export interface Query {
  select?: any[] | any[][]
  join?: any[] | any[][]
  filter: any[] | any[][]
  order?: any[] | any[][]
  groupby?: any[]
  limit?: number
  offset?: number
}

export interface Seller {
  user: string
  tag: string
  longitude?: string
  latitude?: string
  type: string
  business?: string
  location?: string
  business_name?: string
  business_desc?: string
  business_website?: string
  business_phone?: string
  image?: string
}

export const Seller: Seller = {
  user: "None",
  tag: "X",
  type: ""
}