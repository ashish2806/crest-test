import { useContext } from "react";
import Card from "../../UI/Card";
import classes from "./ProductItem.module.css";
import CartContext from "../../../store/cart-context";

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
    });
  };

  const availabeleQtyIndex = cartCtx.inventory.findIndex((invItem) => {
    return invItem.id === props.id;
  });
  const availabelQty = cartCtx.inventory[availabeleQtyIndex].qty;
  return (
    <Card card={props.style}>
      <li className={classes.product}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
          <div className={classes.description}>
            Available Quantity is :
            <span className={classes.price}>{availabelQty}</span>
          </div>
        </div>
        <div>
          {availabelQty > 0 && (
            <button onClick={addToCartHandler}>+ Add </button>
          )}
          {availabelQty === 0 && (
            <span className={classes.red}>Out Of Stock!!</span>
          )}
        </div>
      </li>
    </Card>
  );
};

export default ProductItem;
