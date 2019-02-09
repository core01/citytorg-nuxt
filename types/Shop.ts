import City from "./City";
import ShopType from "./ShopType";
import Sale from "./Sale";
import Image from "./Image";

export interface Shop {
  id: number;
  title: string;
  alias: string;
  description: string;
  lat: number;
  lon: number;
  working_hours: [];
  is_all_day: number;
  is_active: number;
  images: Image[];
  parent: number;
  sample: number;
  shopType: ShopType;
  city: City;
  address: string;
  sales: Sale[];
}

export default Shop;
