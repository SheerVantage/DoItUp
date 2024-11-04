<div class = "w-full hover:bg-blue-200s flex gap-1 items-center">
    {#if data.ID}<input class = "mt-1" type="checkbox" bind:checked = {data.Is_Done} on:click={complete}/>{/if}
    {#if data.editing}
        <textarea bind:value = {data.Content} bind:this = {ta} on:blur = {onBlur} class = "w-full bg-blue-50 p-1 px-2" ></textarea>
    {:else}
    <!-- <div class = "flex gap-1"> -->
        <pre class:new-note = {data.Content == 'new note...'} style = "font-family:Arial, Helvetica, sans-serif; white-spaceeee: normal;" class = "font-serif w-full bg-blue-100 hover:bg-blue-200 rounded-lg p-1 px-2" aria-hidden="true" on:click={e=>edit(true, e)}>{data.Content}</pre>
    <!-- </div> -->
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
        }, 100)
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
            // data.ID = 
            insert('notes', data)
            data = {Content:'new note...', Task_ID:data.Task_ID}
        }
        dispatch('change', data)
    }
    
    function complete(){
        // debugger
        data.Is_Done = !data.Is_Done // != true 
        data.DateTime = nowTS()

        if(data.ID){
            update('notes', {ID:data.ID, Is_Done:data.Is_Done})
            // dispatch('change', data)
        }

        // else if(data.Content){
        //     // data.ID = insert('notes', data)
        // }
        // dispatch('change', data)
        //data = {Content:'new note...', Task_ID:data.Task_ID}
    }

</script>

<style>
    .new-note { color:gray; background-color: azure; }
    /* pre { overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; font-size: 14px;} */
    /* textarea {field-sizing: content; font-size: 14px;} */
</style>