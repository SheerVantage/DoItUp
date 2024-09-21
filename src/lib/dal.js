const worker = new Worker('../lib/worker.js?wroker');
      
worker.onmessage = (e) => {  
  e.data.type === 'log' ? workerLog(e.data.payload) : workerError(e.data.payload);  
};  