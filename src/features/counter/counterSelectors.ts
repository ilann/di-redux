import { RootState } from "../../app/store";

export const selectUserName = (state: RootState) => {
    const ret = state.counter.user?.name;
    return ret
}