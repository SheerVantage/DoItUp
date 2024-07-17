<script>
    // import  presistentStore from "$libs/presistent-store";
    import Task from '../components/Task.svelte'
    import { getList, insert, remove, update } from "../lib/db"

    export let data, mini = false, conditions = {}, removeProject = '' //, updateProjectList, Name = 'Project', Description = '', Status = '', Date_Start = '', Date_End = '', Duration = 0
    let nameEl, tasks
    conditions['Project_ID'] = data.ID
    tasks = getList('tasks', conditions)
    // debugger
    $: if(nameEl && data.editing) nameEl.focus()
    function edit(flag){
        data.editing = flag
        if(flag == false){
            update('projects', data)
        }
    }
    // async function createTask(e){
    //     e.stopPropagation()
    //     await insert('tasks', {Name:'', Project_ID:data.ID, editing:true})
    //     // let task = $tasks[$tasks.length - 1]
    //     // if(task) task.editing = true
    // }
    
</script>

<div class = "flex flex-col gap-1 p-3 border-2 bg-blue-100 rounded-lg relative">
    <div class = "w-full">
        {#if data.editing}
            <input bind:this = {nameEl} type="text" class = "flex-grow bg-blue-200s p-2 w-full" bind:value = {data.Name} on:blur = {e=>edit(false)}
                on:keypress = {e=>{e.keyCode == 13 && edit(false)}} />
        {:else}
            <div aria-hidden="true" class = "p-1s" on:click = {()=>edit(true)}>
                <span class:text-xl = {!mini} class = "p-1 flex items-center">{data.Name} <span class = "ml-auto text-sm text-gray-500">[ has {($tasks || []).length} tasks ]</span></span>
                <!-- <button on:click={createTask}>+</button> -->
            </div>
        {/if}
    </div>
    {#if !mini}
    <span>{data.Description || ''}</span>
    <span>{data.Status || ''}</span>
    <span>{data.Date_Start || ''}</span>
    <span>{data.Date_End || ''}</span>
    <button class = "remover" on:click={e=>{e.stopPropagation(); removeProject(data) }}>x</button>
    {/if}
    <ul class = "task-list p-1">
        {#each $tasks || [] as task}<li>
            <Task data = {task}/>
        </li>{/each}
        {#if !mini }<li class = "new-task"><Task  data = {{Name:'', Project_ID:data.ID}}/></li>{/if}
    </ul>
</div>

<style>
    :is(div, li) > button {visibility: hidden;}
    :is(div, li):hover > button {visibility: visible;}
    span:empty {display: none;}
    .remover {position: absolute; right: 10px; top: 0;}
    .new-task:not(:focus-within) {visibility: hidden;}
    .task-list {overflow: auto; max-height: 10rem;}
    .task-list:hover .new-task {visibility: visible;}
</style>
