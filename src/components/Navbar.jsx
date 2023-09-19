import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { myTeamSelector } from "../store/features/myDataSlice.js"

export default function Navbar(){
  const myTeam = useSelector(myTeamSelector) || [];
  
  return (
    <nav className="navbar">
      <div className="flex-group main-nav">
        <h1>
          <span>Build Your</span> Team
        </h1>
        <ul className="flex-group link-group">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/myteam">My Team</NavLink>
            <span className="memberCount">{myTeam.length}</span>
          </li>
        </ul>
      </div>
    </nav>
  )
}