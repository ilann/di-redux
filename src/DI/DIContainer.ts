import { asClass, asFunction, createContainer } from "awilix";
import { INetworkService, NetworkService } from "../core/network.service";
import { IUserService, UserService } from "../core/user.service";
import { resetAllSlices, storeProvider } from "../app/store";

// Helper
export type DIServices = {
  store: ReturnType<typeof storeProvider>;
  networkService: INetworkService;
  userService: IUserService;
};

export const DIContainer = createContainer<DIServices>({
  injectionMode: "PROXY",
}).register({
  store: asFunction(storeProvider, {
    lifetime: "SINGLETON",
    dispose: (store) => {    
      resetAllSlices();
    },
  }),
  networkService: asClass(NetworkService, {
    lifetime: "SINGLETON",
    dispose: (networkService) => {
      networkService.destroy();
    },
  }),
  userService: asClass(UserService, {
    lifetime: "SINGLETON",
    dispose: (userService) => {
      userService.destroy();
    },
  }),
});