import Image from "./Image";

interface Category {
  id: number;
  title: string;
  alias: string;
  priority: 90;
  images: Image[];
}

export default Category;
