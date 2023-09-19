import './App.css'
import { useEffect } from "react"
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import Team from "./pages/Team"
import Navbar from './components/Navbar'
import { fetchEmployeeArr, fetchFilteredArraySize, currentPageSelector, fetchDomains, fetchGenders } from "./store/features/homePageSlice"
import { fetchMyTeam } from "./store/features/myDataSlice"
import server from "./api/server.js"

export default function App() {
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  const location = useLocation()
  console.log(location)
  
  useEffect(() => {
    let ignore = false;
    const currentPath = location.pathname;
    const queryString = location.search;
    const urlPart = queryString !== "" ? `${currentPage}/${queryString}` : `${currentPage}`;
    if(currentPath !== "/myteam" && !ignore){
      dispatch(fetchEmployeeArr(urlPart))
    }
    return () => {
      ignore = true
    };
  }, [currentPage, location])
  
  useEffect(() => {
    let ignore = false;
    const currentPath = location.pathname;
    const queryString = location.search;
    const urlPart = queryString !== "" ? `${queryString}` : "";
    if(currentPath !== "/myteam" && !ignore){
      dispatch(fetchFilteredArraySize(urlPart))
    }
    return () => {
      ignore = true
    };
  }, [location])
  
  useEffect(() => {
    dispatch(fetchMyTeam())
  }, [])

  useEffect(() => {
    dispatch(fetchDomains())
  }, [])

  useEffect(() => {
    dispatch(fetchGenders())
  }, [])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/myteam" element={<Team />} />   
      </Routes>
    </>
  )
}