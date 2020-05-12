import React from "react"

import "./Clock.scss"

const colors = {
    pause: "#009688",
    default: "#e91e63"
}

class Clock extends React.Component {
    time = React.createRef()
    title = React.createRef()
    subtitle = React.createRef()

    color = colors.default

    setColor(color) {
        this.color = color
    }

    setTitle(title) {
        this.title.current.textContent = title
    }

    setSubtitle(subtitle) {
        this.subtitle.current.textContent = subtitle
    }

    setClockProgress(per) {
        const gradient = `to right, ${this.color} ${per * 100}%, white ${per * 100}%`
        document.body.style.background = `linear-gradient(${gradient})`
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