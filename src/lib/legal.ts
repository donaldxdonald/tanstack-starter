import { loader } from 'fumadocs-core/source'
import { defineDocs } from 'fumadocs-mdx/macro'

const legal = defineDocs({
  dir: 'content/legal',
})

export const legalSource = loader({
  baseUrl: '/',
  source: legal.toFumadocsSource(),
})
