import classes from './Card.module.css';

const Card = props => {
  const f = props.card && classes.grid;
  return <div className={classes.card + ' ' + f } >{props.children}</div>
};

export default Card;