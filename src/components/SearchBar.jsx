import { useState } from "react";
import searchIcon from "../icons/search-icon.svg"
import "./SearchBar.css"

export default function SearchBar({searchParams, handleChangeParams}){
  const [inputValue, setInputValue] = useState(searchParams.get("name"));
  return(
    <form className="flex-group searchBarCont">
        <input 
          type="text" 
          placeholder="Search by name..."
          value={inputValue === null ? "" : inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />
        <button
          type="submit"
          onClick={(e)=> {
            e.preventDefault();
            handleChangeParams("name", inputValue);
          }}
          >
          <img src={searchIcon} alt="search button" />
        </button>
    </form>
  )
}