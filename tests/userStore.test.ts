import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UserStore } from '../src/store/userStore'

describe('UserStore', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('initializes a user with SSR defaults', () => {
    const store = new UserStore()
    store.init()
    expect(store.user).toEqual({ id: 1, name: 'Klaus', from: 'Server Side', money: 0 })
  })

  it('adds and reduces money', () => {
    const store = new UserStore()
    store.init()
    store.add()
    expect(store.user?.money).toBe(1)
    store.reduce()
    expect(store.user?.money).toBe(0)
  })

  it('hydrates from the initial state', () => {
    const store = new UserStore({
      loading: false,
      user: { id: 2, name: 'Hydrated', from: 'Client', money: 5 },
    })
    expect(store.user?.name).toBe('Hydrated')
  })

  it('loads a user from the mock endpoint', async () => {
    const store = new UserStore()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: async () => ({ id: 1, name: 'Mars', from: 'Mock Side', money: 100 }) }),
    )

    await store.update()

    expect(store.loading).toBe(false)
    expect(store.user?.name).toBe('Mars')
  })
})
