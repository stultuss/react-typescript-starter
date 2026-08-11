import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import UserPage from '../../src/pages/User'
import { StoresContext, createStore } from '../../src/store'

describe('UserPage', () => {
  it('renders user data from the store', () => {
    const stores = createStore({
      userStore: { loading: false, user: { id: 1, name: 'Klaus', from: 'Server Side', money: 3 } },
    })

    render(
      <StoresContext.Provider value={stores}>
        <UserPage />
      </StoresContext.Provider>,
    )

    expect(screen.getByText(/Klaus/)).toBeInTheDocument()
    expect(screen.getByText(/Server Side/)).toBeInTheDocument()
  })

  it('shows the loading indicator while loading', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => null }))
    const stores = createStore({ userStore: { loading: true, user: null } })

    render(
      <StoresContext.Provider value={stores}>
        <UserPage />
      </StoresContext.Provider>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Loading...')
    vi.unstubAllGlobals()
  })
})
