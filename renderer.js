const { SerialPort } = require('serialport')

async function listSerialPorts() {

  //연결된 포트 리스트 출력
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
    else {
      document.getElementById("device").innerHTML=`
        <select id ="list">
          ${ports.map(port => `<option value=${port.path}>${port.friendlyName}</option>`).join('')}
        </select>
      `      
    }
  })

  //장소 데이터 출력
  const { ReadlineParser } = require('@serialport/parser-readline')
  var pathNum = document.getElementById("list");

  const port = new SerialPort(
  { 
      path: pathNum.options[pathNum.selectedIndex].value,
      baudRate: 9600, 
      autoOpen: false,
  });

  console.log(pathNum.options[pathNum.selectedIndex].value);

  const parser = port.pipe(new ReadlineParser({ delimiter: "#" }));

  // 시리얼 포트 오픈
  port.open((err) => {
      if (err) {
          return console.log("Error opening port ===> ", err.message);
      }
      console.log("SerialPort Open");
  });
    
  // 시리얼 포트로부터 데이터 수신
  parser.on("data", (data) => {
    console.log("Receive Data ===> ", data);
    jsonParser(data);
  });

  // JSON 파싱 후 위치 데이터 추출
  const jsonParser = (json) => {
  let location;
  json = JSON.parse(json);

  try {
    if (json.hasOwnProperty("location") == true) {
        location = json.location;
        console.log("장소 : ", location);
        document.getElementById("location").innerHTML=`<input id="inputValue" name="inputValue" value="${location}"placeholder="${location}"></input><button id="modifyBtn">수정하기</button>`  

        const modifyBtnElement = document.getElementById("modifyBtn");
        const inputValueElement = document.getElementById("inputValue");

        modifyBtnElement.addEventListener("click", () => {

          var sendData = {
            mode: "w",
            location: inputValueElement.value,
          }

          var jsonData = JSON.stringify(sendData);
          console.log("보내는 데이터", jsonData); //클릭시 뜨는 콘솔
          
          port.write(jsonData, (err) => {
              if (err) {
                return console.log('Error on write:', err.message);
              }
              console.log('Data sent:', jsonData);
              alert("수정되었습니다");
          });
          port.on('error', (err) => {
            console.error('Error:', err);
          });

        });

        }
      } catch (err) {
        console.log("error입니당", err.message);
      }
}; 
}
listSerialPorts() //바로 실행하는 함수 하나
