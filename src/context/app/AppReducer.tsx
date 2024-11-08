import { getUser, setUser } from "../../services/userSevice"

export type User = { email: string, password: string } | undefined

export type AppState = { user: User }

export type AppActions = {
    type: "SET_USER", payload: User
}

export const initialState: AppState = {
    user: getUser(),
}

export const appReducer = (state: AppState = initialState, action: AppActions) => {
    switch (action.type) {
        case "SET_USER":
            setUser(action.payload);
            return {...state, user: action.payload};
        default:
            return state;
    }
}