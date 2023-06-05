import { DIServices } from "../DI/DIContainer";
import { User } from "../types/User";
import { INetworkService } from "./network.service";

export interface IUserService {

    getUser: (userId: string) => Promise<User | undefined>;
    lastUser:  () => User| undefined;
    destroy: () => void;

}


export class UserService implements IUserService {

    user: User | undefined;
    private networkService: INetworkService | undefined;

    constructor({networkService}: DIServices) {
        this.networkService = networkService;        
    }

    async getUser(userId: string): Promise<User | undefined> {

        const resp = await this.networkService?.get<User>(`/user/${userId}`);

        this.user = resp?.data;

        return this.user;
    }

    lastUser() {
        return this.user;
    }


    destroy() {        
    }

}