import React from "react"

import "./Table.scss"

class Table extends React.Component {
    table = React.createRef()

    state = {
        currentRow: -1
    }

    setCurrentRow(index) {
        this.setState({ currentRow: index })
    }

    resize = () => {
        const rect = this.table.current.getBoundingClientRect()
        const newHeight = window.innerHeight - rect.y
        this.table.current.style.height = newHeight + "px"
    }

    componentDidUpdate() {
        const currentRow = document.getElementById("row-" + this.state.currentRow)

        if(currentRow) {
            currentRow.scrollIntoView({ behaviour: "smooth" })
        }
    }

    componentDidMount() {
        this.resize()
        window.addEventListener("resize", this.resize)
    }

    render() {
        return (
            <div className="table-wrapper" ref={this.table}>
                <table>
                    <tbody>
                        <tr>
                            <th>Übung</th>
                            <th>Zeit</th>
                            <th>Pause</th>
                        </tr>

                        {this.props.data.map(({ label, duration, pause }, i) => (
                            <tr key={i} className={this.state.currentRow === i ? "current" : ""} id={"row-" + i}>
                                <td>{label}</td>
                                <td>{duration}</td>
                                <td>{pause}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="spacer"/>
            </div>
        )
    }
}

export default Table