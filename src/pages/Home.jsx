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
      const replaceVal = (key === "name")
      setSearchParams(prevSearchParams => {
        prevSearchParams.delete(key);
        return prevSearchParams
      }, {replace: replaceVal})
    }
    else if(key === "name"){
      const prevNameValue = searchParams.get("name")
      const replaceValue = !(prevNameValue === null);
      setSearchParams(prevSearchParams => {
        prevSearchParams.set(key, newValue)
        return prevSearchParams
      }, {replace: replaceValue})
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
        <h1 className="loading">Loading...</h1> :
        dataArray.length === 0 ?
        <h1 className="noEmployee">No Employee :(</h1> :
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