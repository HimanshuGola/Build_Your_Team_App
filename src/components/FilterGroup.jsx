import { useSelector } from "react-redux";
import { domainsSelector, gendersSelector } from "../store/features/homePageSlice";
import "./FilterGroup.css"

export default function FilterGroup({searchParams, handleChangeParams}){
  const domainArray = useSelector(domainsSelector);
  const genderArray = useSelector(gendersSelector);
  const domainInp = searchParams.get("domain");
  const genderInp = searchParams.get("gender");
  const available = searchParams.get("available");
  const ifChecked = (available === null ? false : true);
  
  return(
    <form className="flex-group filter-group">
      
      <div className="filter-domain">
        <select 
          name="domain" 
          id="domain"
          value={domainInp === null ? "" : domainInp}
          onChange={(e)=> {
            handleChangeParams("domain", e.target.value);
          }}
          >
          <option value="">Select Domain</option>
          {
          domainArray.map(domain => <option key={domain} value={domain}>{domain}</option>)
          }
        </select>
        <span className="custom-arrow-container"></span>
      </div>
      
      <div className="filter-gender">
        <select 
          name="gender" 
          id="gender" 
          value={genderInp === null ? "" : genderInp}
          onChange={(e)=> {
            handleChangeParams("gender", e.target.value);
          }}
          >
          <option value="">Select Gender</option>
          {
          genderArray.map(gender => <option key={gender} value={gender}>{gender}</option>)
          }
        </select>
        <span className="custom-arrow-container"></span>
      </div>
      
      <div className="filter-busy">
        <input 
            type="checkbox" 
            id="chckbxID"
            name="hideBusyEmployee"
            value={available === null ? "" : available}
            checked={ifChecked}
            onChange={(e)=>{
              const newAvailable = (e.target.value ? null : true);
              handleChangeParams("available", newAvailable);
            }}
            />
        <label htmlFor="chckbxID">
          HideBusy
        </label>
      </div>
       
    </form>
  )
}