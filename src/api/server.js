import { createServer, Model } from "miragejs";
import testArray from "../heliverse_mock_data.js"

const myTeamFromLS = JSON.parse(localStorage.getItem("myData")) ? JSON.parse(localStorage.getItem("myData")).myTeam : []

export default createServer({
  models: {
    employee: Model,
    domain: Model,
    member: Model
  },

  seeds(server){
    testArray.map(employee => {
      server.create("employee", employee)
    })

    myTeamFromLS.map(member => {
      server.create("member", member)
    })
  },
  
  routes(){
    this.namespace = "api"

    this.get("/employees", (schema) => {
      return schema.employees.all()
    })

    this.get("/employees/:currentPage", (schema, request) => {
      const currentPage = request.params.currentPage
      const queryParams = request.queryParams
      console.log(queryParams.name)
      let data = []
      if(!queryParams.name){
        data = schema.employees.where(queryParams)
      }
      else{
        const searchObj = {...queryParams}
        const nameVal = searchObj.name
        delete searchObj.name
        console.log(searchObj, nameVal)
        data = schema.employees.where(searchObj)
        data = data.filter(emp => `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(nameVal.toLowerCase()))
        console.log(data)
      }
      const mockDataLen = data.length
      const start = mockDataLen > 20 ? currentPage*20 - 20 : 0
      const end = mockDataLen > 20 ? currentPage*20 : mockDataLen
      return data.slice(start, end)
    })

    this.get("/filteredArraySize", (schema, request) => {
      const queryParams = request.queryParams
      let data = []
      if(!queryParams.name){
        data = schema.employees.where(queryParams)
      }
      else{
        const searchObj = {...queryParams}
        const nameVal = searchObj.name
        delete searchObj.name
        console.log(searchObj, nameVal)
        data = schema.employees.where(searchObj)
        data = data.filter(emp => `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(nameVal.toLowerCase()))
        console.log(data)
      }
      return data.length
    })

    this.get("/domains", (schema) => {
      const data = schema.employees.all()
      const dataArray = data.models
      let returnValue = new Set(dataArray.map(child => child.domain))
      returnValue = Array.from(returnValue)
      return returnValue
    })

    this.get("/genders", (schema) => {
      const data = schema.employees.all()
      const dataArray = data.models
      let returnValue = new Set(dataArray.map(child => child.gender))
      returnValue = Array.from(returnValue)
      return returnValue
    })

    this.get("/myTeam", (schema) => {
      return schema.members.all()
    })

    this.post("/myTeam/:id", (schema, request) => {
      const emp = JSON.parse(request.requestBody)
      const member = schema.members.create(emp)
      return member
    })

    this.delete("/myTeam/:id", (schema, request) => {
      const id = request.params.id
      return schema.members.find(id).destroy()
    })
  }
})