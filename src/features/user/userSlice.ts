import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import { StoreType } from '../../store';
import { getAddress } from '../../services/apiGeocoding';

const initialState: UserState = {
  userName: '',
  status: 'idle',
  address: '',
  position: null,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, _) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        const { address, position } = action.payload;
        state.status = 'idle';
        state.address = address;
        state.position = position;
        state.errorMessage = '';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.error.message || 'unexpected error';
      }),
});

export default userSlice.reducer;

export const { updateName } = userSlice.actions;

export const getUserName = (state: StoreType) => state.user.userName;

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = (await getPosition()) as GeolocationPosition;
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);
