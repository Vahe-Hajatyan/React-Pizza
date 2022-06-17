const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

const getTotalSum = (obj, num) => Object.keys(obj).reduce((sum, key) => num === 1 ? obj[key].items.length + sum : obj[key].totalPrice + sum, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {

      const currentPizzaItem = !state.items[action.payload.id]
      ? [action.payload]
      : [...state.items[action.payload.id].items, action.payload]

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItem,
          totalPrice: getTotalPrice(currentPizzaItem)
        }
      };
      const totalCount = getTotalSum(newItems, 1);
      const totalPrice =  getTotalSum(newItems, 2);
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case 'REMOVE_CART_ITEM':
      const newItem = {
        ...state.items
      }
      const currentTotalPrise = newItem[action.payload].totalPrice
      const currentTotalCount = newItem[action.payload].items.length
      delete newItem[action.payload]
      return {
        ...state,
        items: newItem,
        totalPrice: state.totalPrice - currentTotalPrise,
        totalCount: state.totalCount - currentTotalCount,
      }

    case 'PLUS_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };  

      const totalCount = getTotalSum(newItems, 1);
      const totalPrice = getTotalSum(newItems, 2);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
  
    case 'MINUS_ITEM': {
        const oldItems = state.items[action.payload].items;
        const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
        const newItems = {
          ...state.items,
          [action.payload]: {
            items: newObjItems,
            totalPrice: getTotalPrice(newObjItems),
          },
        };
  
        const totalCount = getTotalSum(newItems, 1);
        const totalPrice = getTotalSum(newItems, 2);
  
        return {
          ...state,
          items: newItems,
          totalCount,
          totalPrice,
        };
    }  
    case 'CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      }
    default:
      return state;
  }
};

export default cart;
