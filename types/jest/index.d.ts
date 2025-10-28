// Minimal Jest type definitions for offline development.
declare type JestDoneCallback = (error?: any) => void;

declare interface JestIt {
  (name: string, fn: (done: JestDoneCallback) => any, timeout?: number): void;
  (name: string, fn?: () => any, timeout?: number): void;
  skip: JestIt;
  only: JestIt;
  todo: (name: string) => void;
}

declare interface JestDescribe {
  (name: string, fn: () => void): void;
  skip: JestDescribe;
  only: JestDescribe;
}

declare function expect(actual: any): {
  toBe(expected: any): void;
  toEqual(expected: any): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toThrow(error?: any): void;
  not: any;
};

declare const describe: JestDescribe;
declare const fdescribe: JestDescribe;
declare const xdescribe: JestDescribe;

declare const it: JestIt;
declare const fit: JestIt;
declare const xit: JestIt;
declare const test: JestIt;
declare const xtest: JestIt;

declare function beforeAll(fn: () => any, timeout?: number): void;
declare function afterAll(fn: () => any, timeout?: number): void;
declare function beforeEach(fn: () => any, timeout?: number): void;
declare function afterEach(fn: () => any, timeout?: number): void;

declare namespace jest {
  function fn<T extends (...args: any[]) => any>(implementation?: T): T & { mockClear: () => void };
}

export {};
