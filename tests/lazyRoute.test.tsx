import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { lazyRoute } from '../src/utils/lazyRoute'

describe('lazyRoute', () => {
  it('renders the loaded component after preload', async () => {
    const Lazy = lazyRoute(() => Promise.resolve({ default: () => <div>Loaded</div> }))
    await Lazy.$$preload()

    render(
      <Suspense fallback={<div>loading</div>}>
        <Lazy />
      </Suspense>,
    )

    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
