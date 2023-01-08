
import ProductItem from './ProductItem/ProductItem';
import classes from './AvailableMeals.module.css';
import ListingStyle from '../Layout/ListingStyle';
import { useState } from 'react';
import products from '../../dummyData/products.json';

const DUMMY_MEALS = products.products;

const AvailableProducts = () => {
  const [listStyle, setListstyle] = useState('');
  const changeStyleHandler = (styleName) => {
    setListstyle(styleName);
  }
  const productList = DUMMY_MEALS.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      style={listStyle}
    />
  ));

  return (
    <section className={classes.products}>
      <ListingStyle changeStyle={changeStyleHandler}  />
      <ul>
        {productList}
      </ul>
    </section>
  );
};

export default AvailableProducts;
