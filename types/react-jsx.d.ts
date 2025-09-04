import * as React from "react";

// Expose React's JSX types as a global `JSX` namespace so libraries
// that reference `JSX.*` (some ship `.ts` sources) compile correctly.
declare global {
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    interface ElementAttributesProperty
      extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends React.JSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<
      C,
      P
    >;
    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends React.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

export {};
