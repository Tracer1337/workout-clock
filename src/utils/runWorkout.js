import alertSound from "../assets/alert.mp3"

function sound(sound) {
    const audio = new Audio(sound)
    return () => audio.play()
}

async function runWorkout({ spreadsheet, clock, table }) {
    const playSound = sound(alertSound)

    // await clock.current.run(10, true)

    for (let i = 0; i < spreadsheet.length; i++) {
        const row = spreadsheet[i]
        const nextRow = spreadsheet[i + 1]
        table.current.setCurrentRow(i)

        if(nextRow) {
            clock.current.setSubtitle(nextRow.label ?? "")
        }

        if (row.duration) {
            clock.current.setTitle(row.label || "Pause")
            await clock.current.run(row.duration)
            playSound()
        }

        if (row.pause) {
            clock.current.setTitle("Pause")
            await clock.current.run(row.pause, true)
            playSound()
        }
    }
}

export default runWorkout