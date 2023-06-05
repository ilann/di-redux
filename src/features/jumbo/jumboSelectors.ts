import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const jumboRootSelector = (state: RootState) => state.jumbo;

// selector for the status
export const jumboStatus = createSelector(
    jumboRootSelector,
    (state) => state.status
)

// selector for the text
export const jumboText = createSelector(
    jumboRootSelector,
    (state) => state.text
)