export default () => new Promise(resolve => {
    var input = document.createElement('input')
    input.type = 'file'
    document.body.appendChild(input)

    input.onchange = e => {
        var file = e.target.files[0]
        var reader = new FileReader()

        reader.onload = readerEvent => {
            var content = readerEvent.target.result
            const data = new Uint8Array(content)
            resolve(data)
        }

        reader.readAsArrayBuffer(file)
    }

    input.click()
    input.remove()
})