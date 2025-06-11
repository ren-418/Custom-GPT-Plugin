/* eslint-disable react-refresh/only-export-components */
import { useRoutes } from 'react-router-dom';

import GPTs from '@views/GPTs';
import GPTDetail from '@views/GPTDetail';
import Home from '@views/Home';
import Error from '@views/Error';

type RouteObject = {
  path: string;
  element?: JSX.Element;
  hideMenu?: boolean;
  children?: RouteObject[];
};

export const routes: Array<RouteObject> = [
  {
    path: '/gpts',
    element: <GPTs />,
  },
  {
    path: '/gpts/:id',
    element: <GPTDetail />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <Error />,
  }
];

export default () => useRoutes(routes);
