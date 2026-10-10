import { Outlet, createFileRoute } from '@tanstack/react-router'
import { LegalLayout } from '#/components/legal-layout'

export const Route = createFileRoute('/_legal')({
  component: LegalRoute,
})

function LegalRoute() {
  return (
    <LegalLayout>
      <Outlet />
    </LegalLayout>
  )
}
