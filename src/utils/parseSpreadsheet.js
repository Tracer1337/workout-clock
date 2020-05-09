import XLSX from "xlsx"

const formatDuration = d => {
    const formatted = Math.round(24 * 60 * 60 * d)
    return !isNaN(formatted) ? formatted : null
}

export default binary => {
    const workbook = XLSX.read(binary, { type: "array" })
    const sheetName = workbook.SheetNames[0]
    const table = workbook.Sheets[sheetName]

    const label = i => table["A" + i]?.h
    const duration = i => formatDuration(table["B" + i]?.v)
    const pause = i => formatDuration(table["C" + i]?.v)

    const formatted = []
    
    let i = 2;
    while(label(i) || duration(i) || pause(i)) {
        formatted.push({
            label: label(i),
            duration: duration(i),
            pause: pause(i)
        })

        i++
    }

    return formatted
}