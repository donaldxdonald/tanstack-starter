import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '#/components/legal-page'

export const Route = createFileRoute('/_legal/privacy')({
  head: () => ({
    meta: [{ title: 'Privacy Policy' }],
  }),
  component: Privacy,
})

function Privacy() {
  return <LegalPage slug="privacy" />
}
