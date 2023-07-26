import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import { StoreType } from '../../store';

const initialState: UserState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { updateName } = userSlice.actions;

export const getUserName = (state: StoreType) => state.user.userName;
/* function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
 */
