import PropTypes from "prop-types";

const apiItemType = {
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
}

const ingredientPropType = PropTypes.shape({
  ...apiItemType
});

const ingredientAndCounterPropType = PropTypes.shape({
  ...apiItemType,
  counter: PropTypes.number
})

export {apiItemType, ingredientPropType, ingredientAndCounterPropType}
