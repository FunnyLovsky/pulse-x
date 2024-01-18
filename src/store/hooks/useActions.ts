import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useAppDispath";
import { allActions } from "../reducers/allActions";

export const useActions = () => {
    const dispath = useAppDispatch();
    return bindActionCreators(allActions, dispath)
}