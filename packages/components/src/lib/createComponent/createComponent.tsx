import React, { ComponentProps, ComponentType, FC, PropsWithChildren } from 'react';

// Taken from https://github.com/emotion-js/emotion/blob/main/packages/react/types/helper.d.ts
type PropsOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, PropsWithChildren<ComponentProps<C>>>;

/**
 * @param Component The component you want to pass custom style props into
 * @returns a function you can pass style props into for the component
 * @description A wrapper to help make styling custom Rhinolabs Components easier.
 * You can use it for any component, but try to limit to just Rhinolabs Components.
 * Works a lot like @emotion/styled.
 * Pass the component you want to style into the first function,
 * then the styles into the function returned from that one.
 */

export const createComponent = <C extends ComponentType<ComponentProps<C>>> (Component: C) => (
  styleProps?: PropsOf<C>,
): FC<PropsOf<C>> => {
  const Custom: FC<PropsOf<C>> = props => <Component {...styleProps} {...props} />;

  // using || instead of ?? here because we want it to continue on empty string, not just null/undefined
  Custom.displayName = `Custom${Component.displayName || Component.name || 'Component'}`;

  return Custom;
};

export default createComponent;
