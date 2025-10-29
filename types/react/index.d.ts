// Minimal React type definitions for offline development.

declare namespace React {
  type Key = string | number;
  interface Attributes {
    key?: Key;
  }
  interface RefObject<T> {
    readonly current: T | null;
  }
  type ReactNode = ReactElement | string | number | boolean | null | undefined;
  type ReactText = string | number;
  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }
  type FC<P = {}> = FunctionComponent<P>;
  interface ComponentClass<P = {}, S = {}> {
    new (props: P): Component<P, S>;
  }
  class Component<P = {}, S = {}> {
    constructor(props: P);
    setState(state: Partial<S>): void;
    forceUpdate(): void;
    render(): ReactNode;
  }
  interface ReactElement<T = any, P = any> {
    type: T;
    props: P;
    key: Key | null;
  }
  const Fragment: unique symbol;
  function createElement<P>(type: any, props?: P | null, ...children: ReactNode[]): ReactElement<any, any>;
  function useState<S>(initialState: S | (() => S)): [S, (value: S) => void];
  function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  function useMemo<T>(factory: () => T, deps: readonly any[]): T;
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  function useRef<T>(initialValue: T | null): RefObject<T>;
  function useContext<T>(context: Context<T>): T;
  interface Context<T> {
    Provider: ComponentType<{ value: T; children?: ReactNode }>;
    Consumer: ComponentType<{ children: (value: T) => ReactNode }>;
  }
  function createContext<T>(defaultValue: T): Context<T>;
}

declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export = React;
}
