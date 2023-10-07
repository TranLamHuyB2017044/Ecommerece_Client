import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import styles from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Logout } from "../../redux/userRedux";
import localStorage from "redux-persist/es/storage";
import {  useState, useRef, useEffect } from "react";
import NavBar from "../NavBarComponent/NavBar";
function Header() {
  const quantity = useSelector((state) => state.cart.quantity);
  const userInfo = useSelector((state) => state.user.currentUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [productsSearch, setProductsSearch] = useState('');
  const [productsItem, setProductsItem] = useState([])
  const cartItems = useSelector((state) => state.cart.products);
  const name = userInfo?.data?.others.username;
  const avatarUser = userInfo?.data?.others.avatar
  const refInput = useRef()
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    localStorage.removeItem("access_token");
    navigate("/login");
    Logout();
    window.location.reload()
  };
  const handleChange = () => {
      if(refInput.current.value !== ''){
        navigate(`/search/?search=${productsSearch}`)
        refInput.current.focus()
        refInput.current.value =''
      }
      
  }
  const handleEnterChange = (e) => {
    if(e.key === "Enter") {
        handleChange()
    }
    
  }
  useEffect(()=>{
    setProductsItem(cartItems)
  }, [cartItems])

  return (
    <div className={styles.header_container}>
      <div className={styles.header_left}>
        <span className={styles.language}>EN</span>
        <div className={styles.Search}>
          <input 
            ref={refInput}
            placeholder="Find something..." 
            onChange={() => setProductsSearch(refInput.current.value)}
            onKeyDown={handleEnterChange}
            />
          <SearchIcon  onClick ={handleChange}/>
        </div>
      </div>
      <div className={styles.header_center}>
        <p>CAMILE.</p>
        <div className={styles.nav}>
          <NavBar/>
        </div>
      </div>
      <div className={styles.header_right}>
        {userInfo ? (
          <div
            className={styles.dropdown}
          >
            <p className={styles.name}>{name}</p>
            <img 
              src={avatarUser} 
              alt="avatar_User"
              // onMouseLeave={() => setShowDropdown(false)}
              // onMouseOver={() => setShowDropdown(true)}
              onClick={()=> setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <ul className={styles.menu}>
                <Link style={{textDecoration: 'none', color: '#000'}} to='/profile'><li className={styles.menu_item}>My Profiile</li></Link>
                <li className={styles.menu_item} onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link style={{ textDecoration: "none", color: "black" }} to="/login">
            <p className={styles.login}>Sign In</p>
          </Link>
        )}

        <IconButton aria-label="cart">
          <Badge badgeContent={quantity} color="secondary">
            <div
              className={styles.cart_dropdown}
              onMouseLeave={() => setShowCart(false)}
              onMouseOver={() => setShowCart(true)}
            >
              <div>
                <ShoppingCartOutlinedIcon />
              </div>
              {productsItem.length > 0 ? (
                <div className={styles.showCart}>
                  {showCart &&
                    productsItem
                      .slice(-5)
                      .map((item, index) => (
                        <ul key={index} className={styles.cart_menu}>
                          <li className={styles.cart_item}>
                            <img
                              width="50px"
                              height="50px"
                              className={styles.item_img}
                              src={item.img}
                              alt={item.img}
                            />
                          </li>
                          <li className={styles.cart_item}>
                            <p className={styles.item_name}>{item.title}</p>
                          </li>
                          <li className={styles.cart_item}>
                            <p className={styles.item_price}>{item.price}$</p>
                          </li>
                        </ul>
                      )).reverse()}
                  <div className={styles.showbuttons}>
                    {showCart && (
                      <Link to="/cart" style={{color: '#000'}}>
                        <p className={styles.view_cart}>View Cart</p>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.showCart}>
                  {showCart && (
                    <div className={styles.cart_menu_empty}>
                        <img width='120px' src='https://png.pngtree.com/png-clipart/20221223/ourmid/pngtree-shoping-clipart-image-download-vector-art-png-image_6534634.png' alt="src" />
                        <p>Not Products Yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Badge>
        </IconButton>
      </div>
    </div>
    
  );
}

export default Header;
