import React, { lazy, Suspense } from 'react';

const LazyGenerationZ = lazy(() => import('./GenerationZ'));

const GenerationZ = props => (
  <Suspense fallback={null}>
    <LazyGenerationZ {...props} />
  </Suspense>
);

export default GenerationZ;
