import React from "react";

const listGroup = ({
  categories,
  selectedCategory,
  onCategorySelect,
  itemsPerCategory,
  textProperty,
  valueProperty,
}) => {
  console.log(itemsPerCategory);
  const listItems = categories.map((category) => {
    const classes =
      category.name === selectedCategory
        ? "list-group-item d-flex justify-content-between align-items-center active"
        : "list-group-item d-flex justify-content-between align-items-center";
    return (
      <li
        className={classes}
        key={category[valueProperty]}
        onClick={() => onCategorySelect(category[textProperty])}
      >
        {category[textProperty]}
      </li>
    );
  });

  return <ul className="list-group">{listItems}</ul>;
};

listGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default listGroup;
