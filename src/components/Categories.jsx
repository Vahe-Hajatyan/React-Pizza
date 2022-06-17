import React from "react";

const Categories = React.memo(({activeCategory, items, onClickItem }) => {

  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((items, index) => (
            <li
              className={activeCategory === index ? "active" : ""}
              onClick={() => onClickItem(index)}
              key={`${items}_${index}`}
            >
              {items}
            </li>
          ))}
      </ul>
    </div>
  );
})

export default Categories;
