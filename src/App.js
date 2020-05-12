import React, { useRef, useState } from "react"

import Clock from "./components/Clock/Clock.js"
import Table from "./components/Table/Table.js"

import importBinary from "./utils/importBinary.js"
import parseSpreadsheet from "./utils/parseSpreadsheet.js"
import runWorkout from "./utils/runWorkout.js"

import "./App.scss"

const App = () => {
  const clock = useRef()
  const tableRef = useRef()

  const [table, setTable] = useState()
  
  const handleImport = async () => {
    const binary = await importBinary()
    const table = parseSpreadsheet(binary)
    setTable(table)
  }

  const handleStart = runWorkout.bind(null, { 
    spreadsheet: table,
    clock,
    table: tableRef
  })

  return (
    <div className="app">
      <Clock ref={clock}/>
      
      <div className="side-panel">
        <div className="section">
          <button onClick={handleImport} className="btn waves-effect waves-light">Import Spreadsheet</button>
          <button onClick={handleStart} className="btn waves-effect waves-light">Start Workout</button>
        </div>

        <div className="divider"/>

        {table && <Table data={table} ref={tableRef}/>}
      </div>
    </div>
  )
}

export default App