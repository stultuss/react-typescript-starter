import { action, makeObservable, observable, runInAction } from 'mobx'

export interface User {
  id: number
  name: string
  from: string
  money: number
}

export interface UserStoreState {
  loading: boolean
  user: User | null
}

export class UserStore {
  loading = false
  user: User | null = null

  constructor(initial?: Partial<UserStoreState>) {
    makeObservable(this, {
      loading: observable,
      user: observable,
      init: action,
      update: action,
      add: action,
      reduce: action,
    })

    if (initial) {
      this.loading = initial.loading ?? false
      this.user = initial.user ?? null
    }
  }

  /** 由路由的 loadData 在服务端预取时调用 */
  init() {
    this.user = {
      id: 1,
      name: 'Klaus',
      from: 'Server Side',
      money: 0,
    }
  }

  async update() {
    this.loading = true
    try {
      const response = await fetch('/mock/user.json')
      const user = (await response.json()) as User
      runInAction(() => {
        this.user = user
      })
    } catch (error) {
      console.error('Failed to load user:', error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  add() {
    if (this.user) this.user.money += 1
  }

  reduce() {
    if (this.user) this.user.money -= 1
  }
}
