import { useDispatch } from "react-redux"
import { deleteMemberFromTeam, removedFromTeam } from "../store/features/myDataSlice.js"
import "./TeamMember.css"

export default function TeamMember({memberObj}){
  const dispatch = useDispatch();
  
  return (
    <div className="flex-group cartItem-row">
      <img src={memberObj.avatar} />
      <div className="flex-group person-info">
        <h3>{`${memberObj.first_name} ${memberObj.last_name}`}</h3>
        <h4>{memberObj.domain}</h4>
        <p>
          {
            memberObj.email
          }
        </p>
      </div>
      <button
        onClick={()=>{
          // dispatch(removedFromTeam(memberObj.id))
          dispatch(deleteMemberFromTeam(memberObj.id))
        }}
        >
        Remove
      </button>
    </div>
  )
}