import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  myTeam: [],
  isSaved: true
}

export const myDataSlice = createSlice({
  name: "myData",
  initialState: initialState,
  reducers: {
    addedToTeam: (state, action) => {
      state.myTeam.push(action.payload)
      state.isSaved = false
    },
    removedFromTeam: (state, action) => {
      state.myTeam = state.myTeam.filter(member => member.id !== action.payload)
      state.isSaved = false
    },
    savedToLocalStorage: state => {
      state.isSaved = true
    }
  },
  extraReducers(builder){
    builder
      .addCase(fetchMyTeam.fulfilled, (state, action) => {
        // console.log("myTeam from server ", action.payload)
        state.myTeam = action.payload
      })
    
    builder
      .addCase(postMemberToTeam.fulfilled, (state, action) => {
        state.myTeam.push(action.payload)
        state.isSaved = false
        // console.log("member added ", action.payload)
      })
    
    builder
      .addCase(deleteMemberFromTeam.fulfilled, (state, action) => {
        state.myTeam = state.myTeam.filter(member => member.id !== action.payload)
        state.isSaved = state.myTeam.length === 0
        // console.log("member deleted", action.payload)
      })
      .addCase(deleteMemberFromTeam.rejected, (state, action) => {
        console.log("message ", action.payload)
      })
  }
})

export const postMemberToTeam = createAsyncThunk("myData/addedToTeam", async (arg) => {
  const response = await fetch(`/api/myTeam/${arg.id}`, {
    method: "POST",
    body: JSON.stringify(arg)
  });
  const json = await response.json();
  return json.member
})

export const deleteMemberFromTeam = createAsyncThunk("myData/removedFromTeam", async (arg) => {
  const response = await fetch(`/api/myTeam/${arg}`, {
    method: "DELETE"
  });
  const textReturned = await response.text();
  return textReturned.toString() === "" && arg
})

export const fetchMyTeam = createAsyncThunk("myTeam/fetchTeam", async () => {
  const response = await fetch("/api/myTeam")
  const json = await response.json()
  return json.members
})

export const myTeamSelector = state => state.myData.myTeam
export const isSavedSelector = state => state.myData.isSaved

export const {addedToTeam, removedFromTeam, savedToLocalStorage} = myDataSlice.actions

export default myDataSlice.reducer