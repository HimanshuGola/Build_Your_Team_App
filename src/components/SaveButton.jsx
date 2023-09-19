import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { myTeamSelector, isSavedSelector, savedToLocalStorage } from "../store/features/myDataSlice.js"
import "./SaveButton.css"


export default function SaveButton(){
  const myTeam = useSelector(myTeamSelector);
  const isSaved = useSelector(isSavedSelector);
  const dispatch = useDispatch();
  const myData = {
    myTeam: myTeam,
    isSaved: isSaved
  }
  const BtnClass = `saveBtn ${isSaved && "saved"}`;

  useEffect(() => {
    if(isSaved === true){
      localStorage.setItem("myData", JSON.stringify(myData));
    }
  }, [myTeam, isSaved])
  
  return (
      <button
        className={BtnClass}
        onClick={()=> {
          dispatch(savedToLocalStorage())
        }}
        >
        Save{isSaved && "d"}
      </button>
  )
}