import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPage: 1,
  employeesData: {
    status: "idle",
    dataArray: [],
    error: ""
  },
  filteredArraySize: 1,
  domains: [],
  genders: []
}

export const homePageSlice = createSlice({
  name: "homePage",
  initialState: initialState,
  reducers: {
    pageUp: state => {
      state.currentPage++
    },
    
    pageDown: state => {
      state.currentPage--
    },
    
    jumpToPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers(builder){
    builder
    .addCase(fetchEmployeeArr.pending, (state, action) => {
      state.employeesData.status = "loading"
    })
    .addCase(fetchEmployeeArr.fulfilled, (state, action) => {
      state.employeesData.status = "succeeded"
      state.employeesData.dataArray = action.payload
    })
    .addCase(fetchEmployeeArr.rejected, (state, action) => {
      state.employeesData.status = "failed"
      state.employeesData.error = action.error.message
    })  

    builder
    .addCase(fetchFilteredArraySize.fulfilled, (state, action) => {
      const totalPagesRequired = Math.ceil(action.payload/20)
      if(totalPagesRequired < state.currentPage){
        state.currentPage = 1
      }
      state.filteredArraySize = action.payload
    })

    builder
    .addCase(fetchDomains.fulfilled, (state, action) => {
      state.domains = action.payload
      
    })

    builder
    .addCase(fetchGenders.fulfilled, (state, action) => {
      state.genders = action.payload
    })
  }
})

export const fetchEmployeeArr = createAsyncThunk("homePage/fetchEmpData", async (urlPart) => {
  const response = await fetch(`/api/employees/${urlPart}`);
  const json = await response.json();
  return json.employees
})

export const fetchFilteredArraySize = createAsyncThunk("homePage/fetchArrSize", async (urlPart) => {
  const response = await fetch(`/api/filteredArraySize/${urlPart}`)
  const json = await response.json()
  return json
})

export const fetchDomains = createAsyncThunk("homePage/fetchDomains", async () => {
  const response = await fetch("/api/domains")
  const json = await response.json()
  return json
})

export const fetchGenders = createAsyncThunk("homePage/fetchGenders", async () => {
  const response = await fetch("/api/genders")
  const json = await response.json()
  return json
})

export const currentPageSelector = state => state.homePageData.currentPage
export const dataArraySelector = state => state.homePageData.employeesData.dataArray
export const FASizeSelector = state => state.homePageData.filteredArraySize
export const domainsSelector = state => state.homePageData.domains
export const gendersSelector = state => state.homePageData.genders

export const {pageUp, pageDown, jumpToPage} = homePageSlice.actions

export default homePageSlice.reducer