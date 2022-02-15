const API = "http://localhost:8080/";

export const ALL_API = API + "coupons";

export const USE_API = (title) => API + `use?title=${title}`;

export const CREATE_API = API + "create";
