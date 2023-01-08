import { useReducer } from 'react';

import CartContext from './cart-context';
import inventory from '../dummyData/inventory.json';
const defaultCartState = {
  items: [],
  totalAmount: 0,
  inventory: inventory.inventory
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * 1;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    let updatedInventorys;
    const inventoryItemIndex = state.inventory.findIndex(
      (item) => item.id === action.item.id
    );
    const inventoryItem = state.inventory[inventoryItemIndex];
    const updatedInventory = {
      ...inventoryItem,
      qty: inventoryItem.qty  - 1
    };
    updatedInventorys = [...state.inventory];
    updatedInventorys[inventoryItemIndex] = updatedInventory;
   
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      inventory: updatedInventorys
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const inventoryItemIndex = state.inventory.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    let updatedInventorys;
    const inventoryItem = state.inventory[inventoryItemIndex];
    const updatedInventory = {
      ...inventoryItem,
      qty: inventoryItem.qty  + 1
    };
    updatedInventorys = [...state.inventory];
    updatedInventorys[inventoryItemIndex] = updatedInventory;
   
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      inventory: updatedInventorys
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };


  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    inventory: cartState.inventory
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
