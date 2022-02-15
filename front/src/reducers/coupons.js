const couponsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH":
      return payload;
    case "ADD":
      return [...state, payload];
    case "USE":
      return state.map((coupon) => {
        if (coupon.title === payload) {
          coupon.used = true;
        }
        return coupon;
      });

    default:
      return state;
  }
};

export default couponsReducer;
