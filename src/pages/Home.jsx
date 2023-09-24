import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { dataArraySelector } from "../store/features/homePageSlice.js"
import Card from "../components/Card"
import SearchBar from "../components/SearchBar"
import FilterGroup from "../components/FilterGroup"
import Pagination from "../components/Pagination"
import "./Home.css"

export default function Home(){
  const [searchParams, setSearchParams] = useSearchParams();
  const dataArray = useSelector(dataArraySelector);
  const loadingState = useSelector(state => state.homePageData.employeesData.status);
  const isLoading = loadingState === "loading";

  function handleSearchParams(key, newValue){
    if (newValue === null || newValue === ""){
      setSearchParams(prevSearchParams => {
        prevSearchParams.delete(key);
        return prevSearchParams
      })
    }
    else if(key === "name"){
      const prevNameValue = searchParams.get("name");
      setSearchParams(prevSearchParams => {
        prevSearchParams.set(key, newValue)
        return prevSearchParams
      })
    }
    else{
      setSearchParams(prevSearchParams => {
        prevSearchParams.set(key, newValue);
        return prevSearchParams
      })
    }
    
  }

  return(
    <main className="flex-group mainHome">
      <SearchBar 
        searchParams={searchParams} 
        handleChangeParams={handleSearchParams} 
        />
      
      <FilterGroup 
        searchParams={searchParams} 
        handleChangeParams={handleSearchParams} 
        />
      {
        isLoading ?
        <div className="loading-spinner">
          Loading...
          <div className="spinner-section-1"></div>
          <div className="spinner-section-2"></div>
          <div className="spinner-section-3"></div>
        </div> :
        dataArray.length === 0 ?
        <div className="noEmployee">No employee found :(</div> :
        <div className="flex-group card-array">
          {
            dataArray.map(person => <Card key={person.id} personObj={person} />)
          }
        </div>
      }
      
      <Pagination />
    </main>
  )
}