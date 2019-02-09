import Category from "./Category";
import Image from "./Image";
interface Sale {
  id: number;
  title: string;
  alias: string;
  description: string;
  price: number;
  old_price: number;
  date_start: string;
  date_end: string;
  one_plus_one: number;
  akcion: number;
  two_equals_three: number;
  new: number;
  sale: number;
  social: number;
  link: string;
  images: Image[];
  category: Category;
  future: boolean;
}

export default Sale;
