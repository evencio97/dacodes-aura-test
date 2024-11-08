import { User } from "../context/app/AppReducer";

const parseData = (data: string | object | undefined | null) => {
    if (!data) return null;
    return typeof data === "string"? JSON.parse(data):JSON.stringify(data);
}

export function getUser(): User {
    return parseData(localStorage.getItem('user'));
}

export function setUser(data: User | undefined) {
    return data? localStorage.setItem('user', parseData(data)):localStorage.removeItem('user');
}

export default {
    getUser,
    setUser
};