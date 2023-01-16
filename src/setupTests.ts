// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { asClass } from 'awilix';
import { INetworkService, NetworkResponse } from './core/network.service';
import { DIContainer } from './DI/DIContainer';
import { User } from './types/User';

console.log ('===setupTests.ts===!', Date.now());





