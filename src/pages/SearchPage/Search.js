import styles from "./Search.module.scss";
import Header from "../../components/HeaderComponent/Header";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Footer from "../../components/FooterComponent/Footer";
import GoToTop from "../../components/GoToTopComponent/GoToTop";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../request";
import { useSelector } from "react-redux";
function Search() {
  const [filters, setFliter] = useState({});
  const [sort, setSort] = useState("newest");
  const [product, setProduct] = useState([]);
  const [filtersProduct, setFiltersProduct] = useState([]);
  const location = useLocation();
  const query = location.search;
  const user = useSelector((state) => state.user.currentUser);
  const api = publicRequest();

  const handleFilter = (e) => {
    const value = e.target.value;
    setFliter({
      ...filters,
      [e.target.name]: value,
    });
  };
  useEffect(() => {
    const queryProduct = async () => {
      const product = await api.get(`/product/${query}`);
      setProduct(product.data);
      console.log(product.data);
    };
    queryProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  useEffect(() => {
    setFiltersProduct(
      product.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
    // eslint-disable-next-line
  }, [filters, product]);
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
    <div className={styles.search_container}>
      <Header />
      <div className={styles.search_content}>
        {product.length > 0 ? (
          <>
            <div className={styles.Filters_container}>
              <div className={styles.filter_left}>
                <p>Filter Product: </p>
                <select name="color" onChange={handleFilter}>
                  <option defaultChecked>Color</option>
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Black</option>
                  <option>Pink</option>
                  <option>Gray</option>
                  <option>Yellow</option>
                </select>
                <select name="size" onChange={handleFilter}>
                <option defaultChecked >Size</option>
                    <option>3</option>
                    <option>3.5</option>
                    <option>4</option>
                    <option>4.5</option>
                    <option>5</option>
                    <option>5.5</option>
                    <option>6</option>
                    <option>6.5</option>
                    <option>7</option>
                    <option>7.5</option>
                    <option>8</option>
                    <option>8.5</option>
                    <option>9</option>
                    <option>9.5</option>
                </select>
              </div>
              <div className={styles.filter_right}>
                <p>Sort Product: </p>
                <select onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="asc">Price (Asc)</option>
                  <option value="desc">Price (Desc)</option>
                </select>
              </div>
            </div>
            <h2 className={styles.head_title}>
              Search for '{query.split("=")[1]}'
            </h2>
          </>
        ) : (
          <h2 className={styles.head_title} style={{position: 'absolute', top: '20rem'}}>
            Not match for '{query.split("=")[1]}'
          </h2>
        )}
        <div className={styles.Products_container}>
          {filtersProduct.map((product) => (
            <div key={product._id} className={styles.product_content}>
              <div className={styles.product_image}>
                <img src={product.img[3].url_img} alt={product.title} />
              </div>
              <div className={styles.product_info}>
                <div className={styles.icon}>
                  <ShoppingCartOutlinedIcon />
                </div>
                {user ? (
                  <Link to={`/detail/${product._id}`} className={styles.icon}>
                    <SearchOutlinedIcon style={{ color: "#000" }} />
                  </Link>
                ) : (
                  <Link to={`/login`} className={styles.icon}>
                    <SearchOutlinedIcon style={{ color: "#000" }} />
                  </Link>
                )}
                <div className={styles.icon}>
                  <FavoriteBorderOutlinedIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <GoToTop />
    </div>
  );
}

export default Search;
