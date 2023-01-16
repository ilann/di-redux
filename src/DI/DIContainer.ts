import { asClass, createContainer } from 'awilix';
import { INetworkService, NetworkService } from '../core/network.service';
import { IUserService, UserService } from '../core/user.service';

// Helper
export type DIServices = {
    networkService: INetworkService,
    userService: IUserService
}


export const DIContainer = createContainer<DIServices>({
    injectionMode: 'PROXY'
})
    .register({
        networkService: asClass(NetworkService, { lifetime: 'SINGLETON' })
        .disposer(networkService => {
            networkService.dispose()
        }),
        userService: asClass(UserService, { lifetime: 'SINGLETON' })
    });
