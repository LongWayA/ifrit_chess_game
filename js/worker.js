onmessage = function(event) {
  console.log('Получено сообщение от рабочего: ', event.data);
  postMessage('Привет от рабочего потока!');
};