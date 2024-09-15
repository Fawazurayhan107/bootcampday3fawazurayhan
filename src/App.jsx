import {Link} from 'react-router-dom'


function App() {
  return (
    <div className="flex items-center justify-center bg-lime-100 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-center">
          Welcome to WacanaStore
        </h1>
        <div className="flex justify-center space-x-6 ">
        <Link className="px-4 py-2 text-white bg-lime-400 rounded " to="/login">Login </Link>
        <Link className="px-4 py-2 text-white bg-lime-400 rounded " to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default App
