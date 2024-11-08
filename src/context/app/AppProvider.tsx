import { useReducer, createContext, Dispatch, ReactNode } from 'react';
import { appReducer, AppActions, AppState, initialState, User } from './AppReducer';

type AppContextProps = {
    state: AppState,
    dispatch: Dispatch<AppActions>,
    setUser: (value: User) => void
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: ReactNode}) => {
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Loading
    const setUser = (value: User | undefined) => dispatch({ type: 'SET_USER', payload: value});

    return (
        <AppContext.Provider value={{
            state, dispatch, setUser
        }}>
            {children}
        </AppContext.Provider>
    )
}