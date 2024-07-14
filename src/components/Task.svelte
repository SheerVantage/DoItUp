<script>
    // import  presistentStore from "$libs/presistent-store";
    // import SubTask from '../components/SubTask.svelte'
    import { insert, update, remove } from "../lib/db"

    export let data//, parent, updateTaskList, selectTask, selected
    // let ctask, subtasks// = presistentStore("sub-tasks", [], {dbName:"sub-tasks-" + data.ID, driver:"INDEXEDDB"})
    let nameEl
    $: if(nameEl && data.editing) edit(data.editing) //
    function edit(flag){
        // debugger
        data.editing = flag
        if(flag == false){
            if(data.ID)
                update('tasks', data)
            else if(data.Name != ''){
                insert('tasks', data)
                data.Name = ''
            }
        }
        else if(nameEl){
            nameEl.focus()
            // if(data.Name)
                // nameEl.select()
        }
    }
    function createTask(e){
        e.stopPropagation()
        // $subtasks = [...$subtasks, {ID:Date.now(), Name:'Task ' + ( $subtasks.length + 1 ), Description:'', tasks:[]}]
    }
    function removeTask(task){
        remove('tasks', task.ID)
    }
    function archive(){
        update('tasks', { ID:data.ID, Archived: data.Archived != true })
    }
    function defer(){
        update('tasks', { ID:data.ID, Deferred: data.Deferred != true })
    }
    function current(){
        update('tasks', { ID:data.ID, Current: data.Current != true })
    }
    function complete(){
        update('tasks', { ID:data.ID, Done: data.Done != true })
    }

</script>
<div>
    <div class = "flex flex-col hover:bg-blue-200">
        <div class = "flex gap-2 items-centers align-top">
        {#if data.ID}<span><input class = "mt-2" type="checkbox" bind:checked = {data.Done} on:click={complete}/></span>{/if}
        {#if data.editing}
                <input bind:this = {nameEl} type="text" class = "task-title flex-grow" bind:value = {data.Name} on:blur = { (e)=>{ edit(false) }}
                on:keypress={(e)=>{ e.keyCode == 13 && edit(false)}}/>
            
        {:else}
            <div aria-hidden="true" class:text-gray-400 = {data.Name == ''} class:text-red-500 = {data.Current} class = "task-title flex relative w-full items-center" class:text-green-600 = {data.Done} on:click = {()=>edit(true)}>
                {data.Name || 'add new task'}
                {#if data.ID}<div class = "actions bg-blue-200 px-2 py-1 flex gap-3 ml-2 rounded">
                    <button on:click|stopPropagation = {e=>removeTask(data)}>✖</button>
                    <button on:click|stopPropagation = {e=>archive(data)}>⚰️</button>
                    <button on:click|stopPropagation = {e=>defer(data)}>🚧</button>
                    <button on:click|stopPropagation = {e=>current(data)}>&#128339;</button>
                </div>{/if}
            </div>
            <!-- <button on:click={createTask}>+</button> -->
        {/if}
        </div>
        <!-- <ul class = "ml-3 w-full bg-green-200">
            {#if subtasks}
            {#each $subtasks as task}<li>
                <svelte:self data = {task} parent = {data.ID} />
            </li>{/each}
            {/if}
        </ul> -->
    </div>
</div>

<style>
    .actions {visibility: hidden; position: absolute; bottom: 90%; right:0px; border-radius: 10px; border-bottom-right-radius: 0;}
    div:hover > .actions {visibility: visible;}
    input[type=checkbox] {width: 16px; height: 16px; transition: background 200ms ease-out 0s;}
    input[type=checkbox]:hover {background: whitesmoke;}
    .task-title { min-height:32px; border:1px; padding:0 0.3rem;}
</style>