
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: ''
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState, 
    reducers: {
        setNotification(state, action) {
            state.message = action.payload
            if (action.time) {
                setTimeout(() => {
                  state.message = initialState.message;
                }, action.time * 1000);
              }
        },
    }
})

export const notifyMessage = (text, time) => {
    return dispatch => {
        dispatch(setNotification(text))
        setTimeout(() => {
            dispatch(setNotification(initialState.message))
        }, time * 1000)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
