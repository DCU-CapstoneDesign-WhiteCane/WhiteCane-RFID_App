// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
 window.addEventListener('DOMContentLoaded', () => {
    for (const versionType of['chrome', 'electron', 'node']) {
        document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    }

//    document.getElementById('serialport-version').innerText = require('serialport/package').version

    const Serialport = require('serialport')
    Serialport.list().then(ports => {
        document.getElementById("port-list").innerHTML = `
        <h1>Detected Serial Ports</h1>
        <ul>
            ${ports.map(port=> `<li>${port.path}</li>`).join('')}
        </ul>
        `
    })  

}) 

/*
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if(element) element.innerText = text
    }

    for (const type of['chrome', 'electron', 'node']) {
        replaceText(`${type}-version`, process.version[type])
    }

    const SerialPort = require('serialport')
    SerialPort.list().then(ports => {
        document.getElementById("port-list").innerHTML = `
        <h1>Detected Serial Ports</h1>
        <ul>
            ${ports.map(port=> `<li>${port.path}</li>`).join('')}
        </ul>
        `
    })   
}) */