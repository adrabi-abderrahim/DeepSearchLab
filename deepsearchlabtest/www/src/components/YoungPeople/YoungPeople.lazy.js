import React, { lazy, Suspense } from 'react';

const LazyYoungPeople = lazy(() => import('./YoungPeople'));

const YoungPeople = props => (
  <Suspense fallback={null}>
    <LazyYoungPeople {...props} />
  </Suspense>
);

export default YoungPeople;
