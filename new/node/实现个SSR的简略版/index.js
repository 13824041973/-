const { JSDOM } = require('jsdom')

const fs = require('node:fs')

const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`)

const document = dom.window.document
const window = dom.window

// node 18 版本后才有fetch API
fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res => res.json()).then(data => {
    const app = document.getElementById('app')
    data.forEach(item => {
        const img = document.createElement('img')
        img.src = item.url
        img.style.width = `${item.width}px`
        img.style.height = `${item.height}px`
        app.appendChild(img)
    });

    fs.writeFileSync('./index.html', dom.serialize())
})

