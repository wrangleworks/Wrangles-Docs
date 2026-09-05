import React from 'react';
import Layout from '@theme/Layout';
import WrangleFlowPlayground from '@site/src/components/WrangleFlowPlayground';

export default function PlaygroundPage() {
  return (
    <Layout title="Global Playground" description="Build, preview, and run Wrangles recipes from a block-based playground.">
      <main className="container margin-vert--lg">
        <WrangleFlowPlayground />
      </main>
    </Layout>
  );
}
