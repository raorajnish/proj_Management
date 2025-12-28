import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-bbh text-maintext text-3xl">Projects</h2>

        <button className="font-gothic btn rounded-xl bg-black dark:bg-white/60 px-5 py-2 text-white dark:text-black">
          + New Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/project/${product.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
