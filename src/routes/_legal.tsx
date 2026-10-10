import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { legalSource } from '#/lib/legal'

export const Route = createFileRoute('/_legal')({
  component: LegalLayout,
})

function LegalLayout() {
  return (
    <DocsLayout
      tree={legalSource.getPageTree()}
      nav={{ title: 'TanStack Start' }}
      searchToggle={{ enabled: false }}
    >
      <Outlet />
    </DocsLayout>
  )
}
