import { asClass } from 'awilix';
import { INetworkService, NetworkResponse } from '../../core/network.service';
import { DIContainer} from '../../DI/DIContainer';
import { User } from '../../types/User';
import { selectCounterUser, selectCounterValue } from './counterSelectors';
import {
  counterSliceReducer,
  CounterState,
  increment,
  decrement,
  incrementByAmount,
  reloadRequest,
  counterSlice,
} from './counterSlice';

describe('User can Reload the user', () => {


  beforeEach(async () => {

   
    // Create a mock for the Network class
    class NetworkServiceMock implements INetworkService {

      constructor() {
        // console.log('*** MOCK Network service created ***');
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

      destroy() {
        // console.log('+++Mock networkService is disposed+++');
      }

    }
    
    await DIContainer.dispose();
    DIContainer.register({      
      networkService: asClass(NetworkServiceMock)
        .disposer(networkService => {
          networkService.destroy()
        })
        .singleton(),
    });
  });
  

  afterEach(async () => {
    await DIContainer.dispose();
  });

  // Here we create a test that uses a mock store
  it ('Test the store *ONE*', async () => {
    // We must get the store form the DI container, otherwise the dispose will not work
    const store = DIContainer.cradle.store;

    const counterResetAction = counterSlice.actions.reset;
    await store.dispatch(counterResetAction({
      value: 8
    }));

    await store.dispatch(increment());
    // selector for the counter value
    const value = selectCounterValue(store.getState());    
    expect(value).toBe(9);
  });

  it ('Test that that store is really clean', async () => {    
    const store = DIContainer.cradle.store;
    await store.dispatch(increment());
    const value = selectCounterValue(store.getState());   
    expect(value).toBe(1);
  });

  it('Service unit: Should reload the user', async () => {
    const userService = DIContainer.cradle.userService;
    const user = await userService.getUser('1234');    
    expect(user?.name).toBe('IlanMock');
  });


   it('[E2E] Should reload the user', async () => {

    const store = DIContainer.cradle.store;

     await store.dispatch(reloadRequest());

  //   // check the Selectors
     const userName = selectCounterUser(store.getState());

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
