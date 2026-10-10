import { DocsLayout } from 'fumadocs-ui/layouts/flux'
import type { ReactNode } from 'react'
import { legalSource } from '#/lib/legal'

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={legalSource.getPageTree()}
      sidebar={{ enabled: false }}
      renderNavigationPanel={() => null}
      containerProps={{ className: 'pb-0' }}
    >
      {children}
    </DocsLayout>
  )
}
