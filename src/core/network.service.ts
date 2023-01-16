import { User } from "../types/User";


export type NetworkResponse<T> = {
    ts: number,
    url: string,
    data: T
};

export interface INetworkService {

    test: () => number;
    get: <T>(usr: string) => Promise<NetworkResponse<T>>;
    dispose: () => void

}

export class NetworkService implements INetworkService {

    constructor() {
        console.log ('Network service created');
    }

    test() {
        return 1;
    }


    get<T>(url: string): Promise<NetworkResponse<T>> {
        
        return new Promise((resolve, reject)=> {

           const retUser: User =  {
                id: '1000-1000-abde',
                name: 'Ilan',
                roles: ['admin']
            };

            const ret = {
                ts: Date.now(),
                url: url,
                data: retUser
            } as NetworkResponse<T>

            resolve(ret);

        });

    }


    // CLeanup if needed
    dispose() {
        console.log ('Network service cleanup is done');
    }


    
}