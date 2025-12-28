import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  return (
    <>
      <h2 className="font-bbh text-maintext mb-6 text-3xl">Projects</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
