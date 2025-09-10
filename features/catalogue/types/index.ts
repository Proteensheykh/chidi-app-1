export type ProductStatus = "low-stock" | "in-stock" | "out-of-stock";
export type ProductCategory = "clothing" | "accessories" | "electronics" | string;

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: string;
  status: ProductStatus;
  category: ProductCategory;
  image: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Blue Ankara Dress",
    stock: 2,
    price: "₦15,000",
    status: "low-stock",
    category: "clothing",
    image: "/blue-ankara-dress.png",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    stock: 15,
    price: "₦25,000",
    status: "in-stock",
    category: "accessories",
    image: "/casual-sneakers.png",
  },
  {
    id: 3,
    name: "Leather Handbag",
    stock: 8,
    price: "₦35,000",
    status: "in-stock",
    category: "accessories",
    image: "/leather-handbag.png",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    stock: 0,
    price: "₦18,000",
    status: "out-of-stock",
    category: "electronics",
    image: "/wireless-earbuds.png",
  },
];
