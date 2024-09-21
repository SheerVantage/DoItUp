<script>
    import "../app.css";

    import Worker from '$lib/worker.js?worker'
    import { onMount } from 'svelte';
    import {worker} from '../lib/store'

    onMount(()=>{
        $worker = new Worker()
        $worker.onmessage = ({data}) => {
            if(data.ready){
                $worker.postMessage({action:'init_schema'})
				// $worker.postMessage({action:'execute', sql:'Alter Table projects ADD COLUMN Is_Active'})
            }
        }
    })
</script>

<slot/>