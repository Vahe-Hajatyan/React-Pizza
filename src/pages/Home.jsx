import React from "react";
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSortBy } from "./../redux/action/filters";
import {addPizzaToCart} from '../redux/action/cart';
import {fetchPizzas} from '../redux/action/pizzas'


const categoryNames = ["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые",];
const sortItems = [{ name: "популярности", type: "popular", order: "desc" },{ name: "цене", type: "price", order: "desc" },{ name: "алфавит", type: "name", order: "asc" },];

let Home = () => {

  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy]);
 

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const addPizza = React.useCallback((obj) => {
    dispatch(addPizzaToCart(obj))
  }, [])
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickItem={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup onClickSortType={onSelectSortType} activeSortType={sortBy.type} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded ? items && items.map((obj) => <PizzaBlock addedCount={cartItems[obj.id] && cartItems[obj.id].items.length} onClickPizzaAdd={addPizza} key={obj.id} {...obj} />) : Array(items.length).fill(0).map((_, index) => <PizzaLoader key={index} />)}
      </div>
    </div>
  );
};

export default Home;
