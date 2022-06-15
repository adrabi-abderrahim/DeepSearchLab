import React, { lazy, Suspense } from 'react';

const LazyWordDetails = lazy(() => import('./WordDetails'));

const WordDetails = props => (
  <Suspense fallback={null}>
    <LazyWordDetails {...props} />
  </Suspense>
);

export default WordDetails;
