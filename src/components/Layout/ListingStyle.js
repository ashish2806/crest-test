
import classes from './ListingStyle.module.css';
const ListingStyle = (props) => {
    const chnageStyleHandler = (event) => {
        props.changeStyle(event.target.value);
    }
    return (
        <div className={classes.direc}>
            <button onClick={chnageStyleHandler} value=''>List</button>
            <button onClick={chnageStyleHandler} value='grid'>Grid</button>
      </div>
    );
}

export default ListingStyle;