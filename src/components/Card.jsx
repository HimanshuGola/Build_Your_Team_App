import { useSelector, useDispatch } from "react-redux"
import { postMemberToTeam, deleteMemberFromTeam, addedToTeam, removedFromTeam, myTeamSelector } from "../store/features/myDataSlice.js"
import "./Card.css"
import server from "../api/server.js"

export default function Card({personObj}){
  const myTeam = useSelector(myTeamSelector) || []
  const dispatch = useDispatch()
  const ifPresent = myTeam.filter(member => member.id === personObj.id).length !== 0
  const busyClass = !personObj.available ? "card-busy" : ""
  const availClass = personObj.available ? "avail" : "busy"
  const btnClass = personObj.available ?  "activeBtn" : "inactiveBtn"
  
  return (
    <div className={`flex-group card ${busyClass}`}>
      <img 
        src={personObj.avatar} 
        alt="Avatar" 
        className={ifPresent ? "added-img-border" : ""} 
        />
      
      <div className="flex-group personInfo">
        <h3>
          {`${personObj.first_name} ${personObj.last_name}`}
        </h3>
        <h4>
          {personObj.domain}
        </h4>
        <p className="gender">
          {personObj.gender}
        </p>
        <p className="email">
          {personObj.email}
        </p>
        <p className={availClass}>
          {personObj.available ? "Available" : "Busy"}
        </p>
        {
          !ifPresent ?
          <button 
            disabled={!personObj.available} 
            className={btnClass}
            onClick={()=>{
              // dispatch(addedToTeam(personObj))
              dispatch(postMemberToTeam(personObj))
            }}
            >
            Add to Team
          </button> :
          <button
            className="present"
            onClick={()=>{
              // dispatch(removedFromTeam(personObj.id))
              dispatch(deleteMemberFromTeam(personObj.id))
            }}
            >
            Remove
          </button>      
        }
      </div>
      
    </div>
  )
}