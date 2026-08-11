import { Link, Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <div className="home-layout">
      <h1>Home Page</h1>
      <h3>Links</h3>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user">User</Link></li>
          <li><Link to="/path">PathParams</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
