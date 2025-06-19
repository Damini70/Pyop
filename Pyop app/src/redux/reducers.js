import { SET_FILTER_DATA, SET_USER_ID } from "./actions";
import { SET_KART_ITEM } from "./actions";
import {SET_PASSWORD} from './actions';
import { SET_PROFILE } from "./actions";
import {SET_PROFILE_IMG} from "./actions";

const initialState = {
  userId: localStorage.getItem("business")
    ? JSON.parse(localStorage.getItem("business")).id
    : "",
  kartItem: [],
  password:"",
  profileImg:'',
};
const initialData={
   filterData:{},
    profile:{},
}


export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_KART_ITEM:
      return {
        ...state,
        kartItem: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password:action.payload
      };
    case SET_PROFILE_IMG:{
      return {
        ...state,
        profileImg:action.payload
      }
    }
    default:
      return state;
  }
};
export const stableDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile:action.payload
      }
    default:
      return state;
  }
};


