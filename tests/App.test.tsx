import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, matchRoutes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { createStore } from '../src/store'
import { routes, type AppRoute } from '../src/routes'

async function preloadPath(path: string) {
  const matches = matchRoutes(routes, path) ?? []
  await Promise.all(matches.map(({ route }) => (route as AppRoute).preload?.()))
}

describe('App', () => {
  it('renders the home layout at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App stores={createStore()} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Home Page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'User' })).toHaveAttribute('href', '/user')
  })

  it('renders the 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/nope']}>
        <App stores={createStore()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('抱歉，页面消失了!')).toBeInTheDocument()
  })

  it('renders the path params page at /path', async () => {
    await preloadPath('/path')
    render(
      <MemoryRouter initialEntries={['/path']}>
        <App stores={createStore()} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Match Path Params' })).toBeInTheDocument()
    expect(screen.getByText('Please select a topic.')).toBeInTheDocument()
  })

  it('renders nested topic routes under /path/:id', async () => {
    await preloadPath('/path/components')
    render(
      <MemoryRouter initialEntries={['/path/components']}>
        <App stores={createStore()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Requested Param: components')).toBeInTheDocument()
  })

  it('navigates between topics without compounding relative paths', async () => {
    await preloadPath('/path')
    render(
      <MemoryRouter initialEntries={['/path/components']}>
        <App stores={createStore()} />
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: 'Props v. State' })
    expect(link).toHaveAttribute('href', '/path/props-v-state')

    fireEvent.click(link)
    expect(screen.getByText('Requested Param: props-v-state')).toBeInTheDocument()
  })
})
