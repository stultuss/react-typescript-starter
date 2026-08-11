import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// vitest 未开启 globals 时 RTL 不会自动清理，需要显式注册
afterEach(() => {
  cleanup()
})
