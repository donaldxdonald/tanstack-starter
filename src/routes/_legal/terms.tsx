import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '#/components/legal-page'

export const Route = createFileRoute('/_legal/terms')({
  head: () => ({
    meta: [{ title: 'Terms of Service' }],
  }),
  component: Terms,
})

function Terms() {
  return <LegalPage slug="terms" />
}
