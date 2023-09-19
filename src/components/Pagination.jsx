import { useSelector, useDispatch } from "react-redux"
import { pageUp, pageDown, jumpToPage, currentPageSelector, FASizeSelector } from "../store/features/homePageSlice"
import "./Pagination.css"
import nextBtnSVG from "../icons/angle-right-solid.svg"
import prevBtnSVG from "../icons/angle-left-solid.svg"

export default function Pagination(){
  const dataSize = useSelector(FASizeSelector)
  const currentPage = useSelector(currentPageSelector);
  const dispatch = useDispatch();
  const totalPages = Math.ceil(dataSize/20);
  const totalPagePills = 7;
  const spread = 3;
  const siblingCount = 1;
  const disabled = dataSize === 0
  
  let pageNumRange;
  if (totalPages <= totalPagePills){
    pageNumRange = getRange(1, totalPages);
  }
  else if(totalPages > totalPagePills && currentPage <= 1 + spread){
    pageNumRange = [...getRange(1, 1 + spread + 1), "...", totalPages];
  }
  else if(totalPages > totalPagePills && currentPage >= (totalPages - spread)){
    pageNumRange = [1, "...", ...getRange(totalPages - spread - 1, totalPages)];
  }
  else{
    pageNumRange = [1, "...", ...getRange(currentPage - siblingCount, currentPage + siblingCount) , "...", totalPages];
  }
  
  return(
     <ul className="flex-group paginationGroup">
      <li>
        <button 
          disabled={currentPage === 1 || disabled}
          className={(currentPage === 1 || disabled) ? "disabledArrow" : ""}
          onClick={()=> dispatch(pageDown())}
          >
          <img src={prevBtnSVG} alt="previous page" />
        </button>
      </li>
       
       {
       pageNumRange.map(num => (
         <li key={typeof num === "number" ? num : Math.random()}>
           {
           typeof num === "number" 
             ? 
           <button 
             className={currentPage === num ? "currentPage" : ""}
             onClick={()=> dispatch(jumpToPage(num))}
             >
             {num}
           </button> 
             :
           <button>{num}</button>
           } 
        </li>
        )
       )
       }
       
      <li>
        <button
          disabled={currentPage === totalPages || disabled}
          className={(currentPage === totalPages || disabled) ? "disabledArrow" : ""}
          onClick={()=> dispatch(pageUp())}
          >
          <img src={nextBtnSVG} alt="next page" />
        </button>
      </li>
     </ul> 
  )
}

function getRange(start, end){
  let len = end - start + 1;
  return Array.from({length: len}, (val, idx) => start + idx);
}