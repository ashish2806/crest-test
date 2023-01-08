import { useContext } from 'react';
import classes from './CartItem.module.css';
import CartContext from '../../store/cart-context';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const availabeleQtyIndex = cartCtx.inventory.findIndex(invItem => {
    return invItem.id === props.id
  })

 const availabelQty = cartCtx.inventory[availabeleQtyIndex].qty;
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <div>Available Quantity is :</div>
          <span className={classes.price}>{availabelQty}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        {availabelQty > 0 ? <button onClick={props.onAdd}>+</button>: <span className={classes.red} > Out Of Stock!!</span>}
      </div>
    </li>
  );
};

export default CartItem;
