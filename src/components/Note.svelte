<div class = "w-full">
    {#if data.editing}
        <textarea bind:value = {data.Content} bind:this = {ta} on:blur = {onBlur} class = "w-full bg-blue-100 p-1" name="" id=""></textarea>
    {:else}
        <pre class:new-note = {data.Content == 'new note...'} style = "font-family:Arial, Helvetica, sans-serif; white-space: normal;" class = "font-serif w-full bg-blue-100 rounded-lg p-1 px-2" aria-hidden="true" on:click={e=>edit(true, e)}>{data.Content}</pre>
    {/if}
</div>

<script>
    import { createEventDispatcher } from "svelte";
    import { nowTS } from "../lib/utilities";

    export let data, insert, update
    let ta
    function edit(flag, event){
        data.editing = flag
        setTimeout(()=>{
            if(data.Content == 'new note...')
                data.Content = ''
            ta.focus()
        }, 200)
    }
    function save(){

    }
    let dispatch = createEventDispatcher()
    function onBlur(){
        data.DateTime = nowTS()
        delete data.editing

        if(data.ID)
            update('notes', data)
        else if(data.Content){
            data.ID = insert('notes', data)
        }
        dispatch('change', data)
        data = {Content:'new note...', Task_ID:data.Task_ID}
    }

</script>

<style>
    .new-note {color:gray; background-color: azure;}
</style>