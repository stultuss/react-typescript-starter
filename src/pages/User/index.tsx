import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store'
import Loading from '../../components/Loading'
import './index.scss'

const UserPage = observer(function UserPage() {
  const { userStore } = useStores()

  useEffect(() => {
    // SSR 已预取数据时不再重复请求
    if (!userStore.user) void userStore.update()
  }, [userStore])

  if (userStore.loading) {
    return <Loading />
  }

  const { user } = userStore
  if (!user) return null

  return (
    <div className="user-page">
      <h3>User Page</h3>
      <ul>
        <li>id: {user.id}</li>
        <li>name: {user.name}</li>
        <li>from: {user.from}</li>
        <li>money: {user.money}</li>
      </ul>
      <div className="btn-toolbar">
        <button onClick={() => userStore.add()}>+</button>
        <button onClick={() => userStore.reduce()}>-</button>
      </div>
    </div>
  )
})

export default UserPage
