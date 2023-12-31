// import { popularProducts } from "../../data";
import styles from "./Products.module.scss";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../request";

import {
  LazyLoadImage,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function Products({ cat, filters, sort }) {
  const [products, setProduct] = useState([]);
  const [filtersProduct, setFiltersProduct] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const api = publicRequest();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get(
          cat ? `/product/${cat}` : "/product/"
        );
        setProduct(res.data);
      } catch (error) {}
    };
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);
  useEffect(() => {
    setFiltersProduct(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
    // eslint-disable-next-line
  }, [filters, products]);
  useEffect(() => {
    if (sort === "newest") {
      setFiltersProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFiltersProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFiltersProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  
  
  return (
    <div className={styles.Products_container}>
      {filtersProduct.map((product) => (
        <div key={product._id} className={styles.product_content}>
          <div className={styles.product_image}>
            <LazyLoadImage
              height="100%"
              effect="blur"
              src={product.img[3].url_img}
              alt={product.img[3].url_img}
            />
          </div>
          <div className={styles.product_info}>
            {user ? (
              <Link to={`/detail/${product._id}`} onClick={() => window.scrollTo(0,0)} className={styles.icon}>
                <SearchOutlinedIcon style={{ color: "#000" }} />
              </Link>
            ) : (
              <Link to={`/login`} className={styles.icon}>
                <SearchOutlinedIcon style={{ color: "#000" }} />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
