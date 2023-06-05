import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// root selector for the counter
const counterRootSelector = (state: RootState) => state.counter;

// create selector for the status
export const selectCounterStatus = createSelector(
    counterRootSelector,
    (state) => state.status
)

// create selector for the value
export const selectCounterValue = createSelector(
    counterRootSelector,
    (state) => state.value
)

// create selector for the user
export const selectCounterUser = createSelector(
    counterRootSelector,
    (state) => {        
        return state.user?.name;
    }
)