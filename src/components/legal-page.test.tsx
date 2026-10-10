import { FrameworkProvider } from 'fumadocs-core/framework'
import { RootProvider } from 'fumadocs-ui/provider/base'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vite-plus/test'
import { LegalLayout } from './legal-layout'
import { LegalPage } from './legal-page'

describe('legal Flux layout', () => {
  it.each([
    ['privacy', 'Privacy Policy', 'Privacy policy placeholder.'],
    ['terms', 'Terms of Service', 'Terms of service placeholder.'],
  ] as const)('renders /%s without sidebar or footer', (slug, title, text) => {
    const html = renderToStaticMarkup(
      <FrameworkProvider
        usePathname={() => `/${slug}`}
        useParams={() => ({})}
        useRouter={() => ({ push: () => {}, refresh: () => {} })}
      >
        <RootProvider search={{ enabled: false }} theme={{ enabled: false }}>
          <LegalLayout>
            <LegalPage slug={slug} />
          </LegalLayout>
        </RootProvider>
      </FrameworkProvider>,
    )

    expect(html).toContain(title)
    expect(html).toContain(`<p>${text}</p>`)
    expect(html).toContain('nd-flux-layout')
    expect(html).not.toContain('nd-sidebar')
    expect(html).not.toContain('flux-layout-slot')
    expect(html).not.toContain('Open Sidebar')
    expect(html).not.toContain('<footer')
  })
})
