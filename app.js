const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space'){
        setRandomColours()
    }
})

document.addEventListener('click', (event) => {
    // console.log(event.target.dataset)
    const type = event.target.dataset.type

    if (type === "lock"){
        const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target 
        : event.target.child[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent)
    }
})

function generateRandomColor() {
    // RGB
    // #FF0000 RED
    // #00FF00 GREEN
    // #0000FF BLUE

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function setRandomColours(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [] ;

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        
        // const color = generateRandomColor()

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial 
        ? colors[index] 
            ? colors[index]
            : chroma.random()
        : chroma.random()
        
        if (!isInitial){
          colors.push(color)  
        }
        

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)

}

function setTextColor(text, color){ 
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}



function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => { return col.toString().substring(1) }).join('-')
}

function getColorsFromHash () {
    if (document.location.hash.length > 1){
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColours(true)