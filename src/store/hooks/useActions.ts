import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useAppDispath";
import { allActionCreators } from "../reducers/allActionCreators";

export const useActions = () => {
    const dispath = useAppDispatch();
    return bindActionCreators(allActionCreators, dispath)
}