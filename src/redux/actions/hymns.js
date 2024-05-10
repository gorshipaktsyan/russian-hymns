// import {
//   GET_HYMNS_REQUEST_ACTION,
//   GET_HYMNS_SUCCESS_ACTION,
//   GET_HYMNS_FAILURE_ACTION,
//   SET_CURRENT_NUMBER_REQUEST_ACTION,
//   SET_CURRENT_NUMBER_SUCCESS_ACTION,
//   SET_CURRENT_NUMBER_FAILURE_ACTION,
// } from "./constants";

// export function Gethymns(params) {
//   return async (dispatch, getState) => {
//     dispatch({ type: GET_HYMNS_REQUEST_ACTION });
//     try {
//       const response = await getItemsRequest(params);
//       const { count, rows, total } = response.data.data;
//       dispatch({
//         type: GET_HYMNS_SUCCESS_ACTION,
//         payload: { count, rows, total },
//       });
//     } catch (err) {
//       dispatch({ type: GET_HYMNS_FAILURE_ACTION });
//       error(err?.response?.data?.message);
//     }
//   };
// }
