export const SET_USER_ID = "SET_USER_ID";
export const SET_KART_ITEM = "SET_KART_ITEM";
export const SET_PASSWORD="SET_PASSWORD";
export const SET_PROFILE="SET_PROFILE";
export const SET_PROFILE_IMG="SET_PROFILE_IMG";
export const SET_FILTER_DATA="SET_FILTER_DATA";

export const setUserId = (userId) => {
  return {
    type: "SET_USER_ID",
    payload: userId,
  };
};

export const setKartItem = (item) => {
  return {
    type: "SET_KART_ITEM",
    payload: item,
  };
};

export const setPassword = (item) => {
  // console.log({item})
  return {
    type: "SET_PASSWORD",
    payload: item,
  };
};

export const setProfile=(item)=>{
  return {
    type:SET_PROFILE,
    payload:item
  }
};
export const  setProfileImg=(item)=>{
  return{
    type: "SET_PROFILE_IMG",
    payload:item
  }
}
export const setFilterData=(item)=>{
 return{
  type:SET_FILTER_DATA,
  payload:item
 }
}

