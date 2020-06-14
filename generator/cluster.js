const cluster = require('cluster');
const os = require('os');
const { write } = require('./helper');

const { pid } = process;
const result = [];
const filename = `_generated_${new Date().getTime()}.json`;

if (cluster.isMaster) {
  const cpusCount = os.cpus().length;
  console.log(`Master started. Pid: ${pid}. CPUs count: ${cpusCount}`);
  for (let i = 0; i < cpusCount - 1; i += 1) {
    cluster.fork();
    // worker.send('Hello from server');
    // worker.on('message', (message) => {
    //   console.log(`Mesaage from worker ${worker.process.pid}: ${message.text} ${message.pid}`);
    // });
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker died. Pid: ${worker.process.pid}. Code: ${code}`);
    if (code !== 0) {
      cluster.fork();
    }
  });

  cluster.on('message', (worker, msg) => {
    const map = JSON.parse(msg);
    result.push(map);
    const sorted = [...result];
    sorted.sort((a,b)=>a.moves-b.moves);
    console.log(`Total maps: ${result.length}`);
    write(filename, JSON.stringify(sorted));
  });
}

if (cluster.isWorker) {
  const Generator = require('./generator');
  const generator = new Generator(process, {
    maxTries: 10000, // 10000
    confirmMap: 50, // 50
    slides: {
      min: 60, max: 90 // 50-80
    },
    size: {
      min: 15, max: 25, // 10-20
    }
  });
}
