import React, { useEffect, useRef } from "react"

import "./Table.scss"

const Table = ({ data }) => {
    const table = useRef()

    useEffect(() => {
        const rect = table.current.getBoundingClientRect()
        const newHeight = window.innerHeight - rect.y
        table.current.style.height = newHeight + "px"
    }, [])

    return (
        <div className="table-wrapper" ref={table}>
            <table>
                <tbody>
                    <tr>
                        <th>Übung</th>
                        <th>Zeit</th>
                        <th>Pause</th>
                    </tr>

                    {data.map(({ label, duration, pause }) => (
                        <tr>
                            <td>{label}</td>
                            <td>{duration}</td>
                            <td>{pause}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table