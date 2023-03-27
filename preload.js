// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    for (const versionType of['chrome', 'electron', 'node']) {
        document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    }

    document.getElementById('serialport-version').innerText = require('serialport/package').version

}) 
/*
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
    
    const Serialport = require('serialport')
    Serialport.list().then(ports => {
      document.getElementById("port-list").innerHTML = `
      <h1>Detected Serial Ports</h1>
      <ul>
        ${ports.map(port => `<li>${port.path}</li>`).join('') }
      </ul>
      `
    })
  })
  */