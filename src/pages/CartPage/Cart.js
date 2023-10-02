import styles from "./Cart.module.scss";
import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer";
import { useSelector } from "react-redux";
import { removeProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import myAlert from "../../components/AlertComponent/Alert";
import { useEffect, useState } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const cartElements = cart.products;
  const Total = cart.products.reduce((a, v) => (a = a + v.price * v.quantity),  0);
  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    setCartItem(cartElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartElements]);

  const numberProduct = () =>{
    const numberList = cartElements.map((item) => {
      return item.quantity
      
    });
    return numberList
  }

  const [quantity, setQuantity] = useState(() => {
    return numberProduct()
  } );
  console.log(quantity)
  const handleClick = (type, id) => {
    
  }
  const handleCheckout = (e) => {
    e.preventDefault();
    myAlert.Alert("success", "Checkout completed !!");
  };
  return (
    <div className={styles.cart_container}>
      <Header />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>YOUR CART</h1>
        <div className={styles.top}>
          <Link to="/products">
            <button className={styles.continue}>CONTINUE SHOPPING</button>
          </Link>
          <div className={styles.top_center}>
            <p>Shopping bag ({cart.quantity})</p>
            <p>Your Wishlist (0)</p>
          </div>
          <button className={styles.checkout}>CHECKOUT NOW</button>
        </div>
        <div className={styles.bot}>
          <div className={styles.bot_left}>
            {cartItem
              .map((product, index) => (
                <div key={index} className={styles.product_info}>
                  <div className={styles.info}>
                    <div className={styles.img}>
                      <img src={product.img} alt="shoes" />
                    </div>
                    <div className={styles.detail_info}>
                      <p className={styles.name}>
                        <span style={{ fontWeight: "bold" }}>Product:</span>{" "}
                        {product.title}
                      </p>
                      <p className={styles.id}>
                        <span style={{ fontWeight: "bold" }}>ID:</span>{" "}
                        {product._id}
                      </p>
                      <p className={styles.size}>
                        <span style={{ fontWeight: "bold" }}>Color:</span>{" "}
                        {product.color}
                      </p>
                      <p className={styles.size}>
                        <span style={{ fontWeight: "bold" }}>Size:</span>{" "}
                        {product.size}
                      </p>
                    </div>
                  </div>
                  <div className={styles.prices}>
                    <div className={styles.Quantity}>
                      <p
                        className={styles.minus}
                        onClick={() => handleClick("decr")}
                      >
                        -
                      </p>
                      <p className={styles.number}>{quantity}</p>
                      <p
                        className={styles.plus}
                        onClick={() => handleClick("incr")}
                      >
                        +
                      </p>
                    </div>
                    <div className={styles.price}>
                      $ {(product.price * product.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className={styles.remove}>
                    <p
                      className={product._id}
                      onClick={() => dispatch(removeProduct(index))}
                    >
                      &times;
                    </p>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
          <div className={styles.summary_order}>
            <form className={styles.form_order}>
              <h1 className={styles.form_title}>ORDER SUMMARY</h1>
              <div className={styles.form_group}>
                <p className={styles.subtotal}>SubTotal: </p>
                <p className={styles.sub_price}>$ {Total}</p>
              </div>
              <div className={styles.form_group}>
                <p className={styles.estimate}>Estimated Shipping: </p>
                <p className={styles.sub_estimate}>$ 5.90</p>
              </div>
              <div className={styles.form_group}>
                <p className={styles.discount}>Shipping Discount: </p>
                <p className={styles.sub_discout}>$ -5.90</p>
              </div>
              <div className={styles.form_group}>
                <p className={styles.total}>Total: </p>
                <p className={styles.total_price}>$ {Total}</p>
              </div>
              <button onClick={handleCheckout} className={styles.submit}>
                Checkout Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
