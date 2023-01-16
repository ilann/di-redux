import { asClass, AwilixContainer } from 'awilix';
import { store } from '../../app/store';
import { INetworkService, NetworkResponse } from '../../core/network.service';
import { DIContainer, DIServices } from '../../DI/DIContainer';
import { User } from '../../types/User';
import { selectUserName } from './counterSelectors';
import {
  counterSliceReducer,
  CounterState,
  increment,
  decrement,
  incrementByAmount,
  reloadRequest,
} from './counterSlice';

describe('User can Reload the user', () => {

  // the scoped DI container for the testing
  let scope: AwilixContainer<DIServices>;
  

  beforeEach(async () => {

    // Create a mock for the Network class
    class NetworkServiceMock implements INetworkService {

      constructor() {
        // console.log('*** MOCK Network service created***');
      }

      test() { return -1; }

      get<T>(url: string): Promise<NetworkResponse<T>> {

        return new Promise((resolve, reject) => {

          const retUser: User = {
            id: 'MOCK-ID',
            name: 'IlanMock',
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

      dispose() {
        console.log('Mock networkService is disposed');
      }

    }

    DIContainer.register({
      networkService: asClass(NetworkServiceMock)
        .disposer(networkService => {
          networkService.dispose()
        })
        .singleton(),
    });
  });
  

  afterEach(async () => {

    await DIContainer.dispose()
      .then(() => {
        // console.log('root is disposed');
      });

  });

  it('Service unit: Should reload the user', async () => {

    const userService = DIContainer.cradle.userService;

    const user = await userService.getUser('1234');    

    expect(user?.name).toBe('IlanMock');

  });


  it('[E2E] Should reload the user', async () => {

    await store.dispatch(reloadRequest());

    // check the Selectors
    const userName = selectUserName(store.getState());

    expect(userName).toBe('IlanMock');

  });

});
////////////////////////

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterSliceReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = counterSliceReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterSliceReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterSliceReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
