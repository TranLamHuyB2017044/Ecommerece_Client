// import { popularProducts } from "../../data";
import styles from "./Products.module.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Products({ cat, filters, sort }) {
  const [products, setProduct] = useState([]);
  const [filtersProduct, setFiltersProduct] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/product/?category=${cat}`
            : "http://localhost:5000/api/product/"
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFiltersProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    // eslint-disable-next-line
  }, [cat, filters, products]);
  useEffect(() => {
    if((sort === 'newest')) {
      setFiltersProduct((prev) =>
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
      )
    }else if((sort === 'asc')){
      setFiltersProduct((prev) =>
        [...prev].sort((a,b) => a.price - b.price)
      )
    }else{
      setFiltersProduct((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
      )
    }
  }, [sort])
  return (
    <div className={styles.Products_container}>
      {cat
        ? filtersProduct.map((product) => (
            <div key={product._id} className={styles.product_content}>
              <div className={styles.product_image}>
                <img src={product.img} alt={product.img} />
              </div>
              <div className={styles.product_info}>
                <div className={styles.icon}>
                  <ShoppingCartOutlinedIcon />
                </div>
                <Link to={`/detail/${product._id}`} className={styles.icon}>
                  <SearchOutlinedIcon style={{ color: "#000" }} />
                </Link>
                <div className={styles.icon}>
                  <FavoriteBorderOutlinedIcon />
                </div>
              </div>
            </div>
          ))
        : products.slice(0, 8).map((product) => (
            <div key={product._id} className={styles.product_content}>
              <div className={styles.product_image}>
                <img src={product.img} alt={product.img} />
              </div>
              <div className={styles.product_info}>
                <div className={styles.icon}>
                  <ShoppingCartOutlinedIcon />
                </div>
                <Link to={`/detail/${product._id}`} className={styles.icon}>
                  <SearchOutlinedIcon style={{ color: "#000" }} />
                </Link>
                <div className={styles.icon}>
                  <FavoriteBorderOutlinedIcon />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Products;
