import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const JUMBO_FEATURE_KEY = 'jumbo';

export interface JumboState {
    status: 'idle' | 'loading' | 'failed' | 'reloading';
    text: string;
}

const initialState: JumboState = {
    status: 'idle',
    text: 'JUMBO'
};

export const jumboSlice = createSlice({
    name: JUMBO_FEATURE_KEY,
    initialState,
    reducers: {
        reset: (state, action: PayloadAction<JumboState | undefined>) => {

            if (action.payload) {
                return {
                    ...initialState,
                    ...action.payload
                };
            }

            return initialState;
        },
        textUpdate: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },            
    },
});

export const { reset, textUpdate } = jumboSlice.actions;


export const jumboSliceReducer = jumboSlice.reducer;