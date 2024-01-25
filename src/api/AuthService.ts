import { IUser } from '../Models/IUser';

export default class AuthService {
    static async getUser(): Promise<IUser[]> {
        const response = await fetch('./users.json');
        return await response.json();
    }
}
