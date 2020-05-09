import React, { useRef, useState } from "react"
import useSound from "use-sound"

import Clock from "./components/Clock/Clock.js"
import Table from "./components/Table/Table.js"

import importBinary from "./utils/importBinary.js"
import parseSpreadsheet from "./utils/parseSpreadsheet.js"
import alertSound from "./assets/alert.mp3"

import "./App.scss"

const App = () => {
  const clock = useRef()
  const [table, setTable] = useState()
  const [playSound] = useSound(alertSound)

  const runWorkout = async table => {
    for(let row of table) {
      if(row.duration) {
        clock.current.setTitle(row.label ?? "Pause")
        await clock.current.run(row.duration)
        playSound()
      }

      if(row.pause) {
        clock.current.setTitle("Pause")
        await clock.current.run(row.pause, true)
        playSound()
      }
    }
  }
  
  const handleImport = async () => {
    const binary = await importBinary()
    const table = parseSpreadsheet(binary)
    setTable(table)
  }

  const handleStart = () => {
    runWorkout(table)
  }

  return (
    <div className="app">
      <Clock ref={clock}/>
      
      <button onClick={handleImport}>Import Spreadsheet</button>
      <button onClick={handleStart}>Start Workout</button>

      {table && <Table data={table} />}
    </div>
  )
}

export default App