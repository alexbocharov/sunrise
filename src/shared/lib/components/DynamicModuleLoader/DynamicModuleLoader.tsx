import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import {
  StateSchema,
  StateSchemaKey,
} from 'app/providers/StoreProvider/config/StateSchema';
import { CSSProperties, FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type Reducers = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  reducers: Reducers;
  removeAfterUnmount?: boolean;
  height?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    reducers,
    removeAfterUnmount = true,
    height = false,
    children,
  } = props;

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  const styles: CSSProperties = {
    // flex: '1 1 0%',
    height: height ? 'calc(100vh - 130px)' : '100vh',
    overflow: 'auto',
  };

  return <div style={styles}>{children}</div>;
};
