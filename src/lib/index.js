// place files you want to import through the `$lib` alias in this folder.
    // import Worker from '../lib/worker'
    import { onMount } from "svelte";
    onMount(()=>{
      const worker = new Worker('./worker.js?wroker');
      
      worker.onmessage = (e) => {  
        e.data.type === 'log' ? workerLog(e.data.payload) : workerError(e.data.payload);  
      };  
    })