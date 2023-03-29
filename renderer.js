const { SerialPort } = require('serialport')

async function listSerialPorts() {

  await SerialPort.list().then((ports, err) => {
    if(err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
    console.log('ports', ports);
    
    if (ports.length === 0) {
      document.getElementById('error').textContent = '연결된 장치가 없습니다.'
    }

    document.getElementById("port-list").innerHTML=`
    <ul>
      ${ports.map(port => `<option value=${port.friendlyName}>${port.friendlyName}</option>`).join('')}
    </ul>
    `
  })
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

setTimeout(listPorts, 2000);

listSerialPorts()