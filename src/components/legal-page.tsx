import { notFound } from '@tanstack/react-router'
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { legalSource } from '#/lib/legal'

export function LegalPage({ slug }: { slug: 'privacy' | 'terms' }) {
  const page = legalSource.getPage([slug])
  if (!page) throw notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} footer={{ enabled: false }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsBody>
        <MDX components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  )
}
