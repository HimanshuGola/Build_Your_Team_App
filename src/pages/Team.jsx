import { useSelector } from "react-redux"
import { myTeamSelector } from "../store/features/myDataSlice.js"
import TeamMember from "../components/TeamMember"
import SaveButton from "../components/SaveButton"
import "./Team.css"

export default function Team(){
  const myteam = useSelector(myTeamSelector) || [];
  
  return(
    <main className="flex-group teamPage-main">
      {
        (myteam.length === 0) 
        ?
        <div 
          className="emptyCart"
          >
          Oops! Your Team has no member
        </div> 
        :
        <div 
          className="flex-group cartContainer"
          >
          {myteam.map(member => <TeamMember 
                                  key={member.id} 
                                  memberObj={member} 
                                  />)
          }
        </div>
      }
      <SaveButton />
      
    </main>
  )
}