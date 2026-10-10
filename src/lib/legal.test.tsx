import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vite-plus/test'
import { legalSource } from './legal'

describe('legal content', () => {
  it.each([
    ['privacy', 'Privacy Policy', 'Privacy policy placeholder.'],
    ['terms', 'Terms of Service', 'Terms of service placeholder.'],
  ])('provides /%s with a title and one placeholder paragraph', (slug, title, text) => {
    const page = legalSource.getPage([slug])

    expect(page?.url).toBe(`/${slug}`)
    expect(page?.data.title).toBe(title)
    expect(page?.data.toc).toEqual([])
    if (!page) throw new Error(`Missing legal page: ${slug}`)

    const MDX = page.data.body
    expect(renderToStaticMarkup(<MDX />)).toBe(`<p>${text}</p>`)
  })

  it('includes only the preset legal pages', () => {
    expect(
      legalSource
        .getPages()
        .map((page) => page.url)
        .sort(),
    ).toEqual(['/privacy', '/terms'])
    expect(legalSource.getPage(['missing'])).toBeUndefined()
  })
})
