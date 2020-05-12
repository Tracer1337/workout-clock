import React from "react"

import "./Clock.scss"

const colors = {
    default: "#009688",
    pause: "#e91e63"
}
const strokeWidth = 0.02

class Clock extends React.Component {
    path = React.createRef()
    time = React.createRef()
    title = React.createRef()
    subtitle = React.createRef()

    setColor(color) {
        this.path.current.setAttribute("stroke", color)
    }

    setTitle(title) {
        this.title.current.textContent = title
    }

    setSubtitle(subtitle) {
        this.subtitle.current.textContent = subtitle
    }

    setClockProgress(per) {
        const angle = per * Math.PI * 2

        const newX = Math.cos(-angle)
        const newY = -Math.sin(-angle)

        const longPath = angle > Math.PI ? 1 : 0

        const newPath = `
            M 1 0 
            A 1 1 0 ${longPath} 1 ${newX} ${newY}
        `

        this.path.current.setAttribute("d", newPath)
    }

    run(duration, isPause = false) {
        this.setColor(isPause ? colors.pause : colors.default)
        duration = duration * 1000

        return new Promise(resolve => {
            const start = performance.now()

            const update = () => {
                const elapsed = (performance.now() - start)
                const progress = elapsed / duration
                const remaining = Math.ceil((duration - elapsed) / 1000)

                if (progress >= 1) {
                    resolve()
                } else {
                    this.time.current.textContent = remaining
                    this.setClockProgress(progress)
                    requestAnimationFrame(update)
                }
            }

            update()
        })
    }

    render() {
        return (
            <div className="clock">
                <svg viewBox="-1.01, -1.01, 2.02, 2.02">
                    <path ref={this.path} strokeWidth={strokeWidth} fill="none" strokeLinecap="round"/>
                </svg>

                <div className="content">
                    <div className="title" ref={this.title}/>
                    <div className="time" ref={this.time}/>
                    <div className="subtitle" ref={this.subtitle}/>
                </div>
            </div>
        )
    }
}

export default Clock