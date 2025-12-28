import projects from "../data/products.json";

export function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!products) reject("Products not found");
      resolve(products);
    }, 400);
  });
}
