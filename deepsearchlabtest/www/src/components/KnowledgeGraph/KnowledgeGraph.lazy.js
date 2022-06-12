import React, { lazy, Suspense } from 'react';

const LazyKnowledgeGraph = lazy(() => import('./KnowledgeGraph'));

const KnowledgeGraph = props => (
  <Suspense fallback={null}>
    <LazyKnowledgeGraph {...props} />
  </Suspense>
);

export default KnowledgeGraph;
