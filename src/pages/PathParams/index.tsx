import { Link, Route, Routes, useParams } from 'react-router-dom'

function Topic() {
  const { id } = useParams()
  return <h3>Requested Param: {id}</h3>
}

export default function PathParamsPage() {
  return (
    <div>
      <h3>Match Path Params</h3>
      <ul>
        {/* 用绝对路径，避免在 splat 路由下相对链接不断叠加 */}
        <li><Link to="/path/components">Components</Link></li>
        <li><Link to="/path/props-v-state">Props v. State</Link></li>
      </ul>
      <Routes>
        <Route path=":id" element={<Topic />} />
        <Route index element={<h3>Please select a topic.</h3>} />
      </Routes>
    </div>
  )
}
