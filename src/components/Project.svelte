<script>
    // import  presistentStore from "$libs/presistent-store";
    import Task from '../components/Task.svelte'
    import { insert, remove, update, load } from "../lib/db"
    import {formatter} from '../components/Formatter.svelte'
    import { nowTS } from '../lib/utilities';
    import Flag from './Flag.svelte';
    import SummaryDetails from './Summary_Details.svelte'
    import { onMount } from 'svelte'

    // onMount(()=>{
        // let str = `PID:${data.ID}, Name:${data.Name},
        // $: data.ID && 
        // load('tasks', '*', "Project_ID = " + data.ID, list => {
        //     tasks = list
        //     // str += `Tasks:${data.tasks}, tasks count:${tasks.length}, TPID: ${tasks && tasks.length > 0 ? tasks[0].Project_ID : ''}`
        //     console.log(data.ID +':'+ list.length)
        // })
        
        // console.log(str)
    // })

    // $: if($tasks){
    //     duration = $tasks.reduce((num, item)=>{
    //         return num + (!item.Deffered && !item.Done && item.Duration ? item.Duration - 0 : 0)
    //     }, 0)
    // }

    export let data, mini = false, filters = [], conditions = {}, removeProject = '' //, updateProjectList, Name = 'Project', Description = '', Status = '', Date_Start = '', Date_End = '', Duration = 0
    let nameEl, tasks, duration = 0, loaded
    conditions['Project_ID'] = data.ID
    // conditions['Archived'] = data.Show_Archived
    // conditions['Deleted'] = data.Show_Deleted
    // conditions['Done'] = !!data.Show_Done
    // tasks = getList('tasks', conditions)
    // debugger
    $: if(nameEl && data.editing) nameEl.focus()
    function edit(flag){
        data.editing = flag
        if(flag == false){
            // debugger
            update('projects', {ID:data.ID, Name:data.Name})
        }
    }
    let filtersString = ''
    function reloadTasks(e){
        
        // if(e?.detail?.Just_Done) return
        filtersString = filters.length > 0 ? ` AND ( 'true' not in (${filters.join(', ')}) OR '' in (${filters.join(', ')}) OR null in (${filters.join(', ')}) )` : ''
        // debugger
        load('tasks', '*', `Project_ID = ${data.ID}` + filtersString, taskList => {
            data.taskList = taskList
        })

    }
    let filtersLast = []
    function updateFilter(filter){

        if(filter == 'All'){ 
            if(filters.length > 0){
                filtersLast = filters
                filters = []
            }
            else{
                filters = filtersLast
                filtersLast = []
            }
        }
        else{
            update('projects', {ID:data.ID, ['Show_'+filter]:data['Show_'+filter]})
            if(data['Show_'+filter] && filters.includes(filter)){
                filters = filters.filter(item => item != filter)
            }
            else{
                filters.push(filter)
            }
        }

        reloadTasks()
    }
    // async function createTask(e){
    //     e.stopPropagation()
    //     await insert('tasks', {Name:'', Project_ID:data.ID, editing:true})
    //     // let task = $tasks[$tasks.length - 1]
    //     // if(task) task.editing = true
    // }
    
</script>

<div class = "project flex flex-col gap-1 p-3 pl-0 border-2 bg-blue-100 rounded-lg relative" class:row-span-2 = {data.Is_Tall + '' == 'true'} class:col-span-2 = {data.Is_Wide + '' == 'true'}>
    <div class = "w-full pl-3">
        {#if data.editing}
            <input bind:this = {nameEl} type="text" class = "flex-grow bg-blue-200s p-2 w-full" bind:value = {data.Name} on:blur = {e=>edit(false)}
                on:keypress = {e=>{e.keyCode == 13 && edit(false)}} />
        {:else}
            <div aria-hidden="true" class = "p-1s" on:click = {()=>edit(true)}>
                <span class:text-xl = {!mini} class = "p-1 flex items-center">
                    {data.Name}
                    <span type = "checkbox" class = "ml-auto flex item-center text-xs text-gray-500">{(tasks || []).length} tasks<!--span class = "text-xxs ml-0.5">📋</!span-->, {formatter(duration, 'm2hm', true)}</span>
                </span>
                <!-- <button on:click={createTask}>+</button> -->
            </div>
        {/if}
    </div>
    {#if !mini}
    <!-- <span>{data.Description || ''}</span>
    <span>{data.Status || ''}</span>
    <span>{data.Date_Start || ''}</span>
    <span>{data.Date_End || ''}</span> -->
    <span class = "remover flex gap-2">
        <SummaryDetails label = "∷ " detailsClasses = "flex actionss items-center" summaryClasses = "">
            <div class = "filters">
                <Flag bind:value = {data.Show_All} symbol = '*' on:change = {()=>updateFilter('All')}/>
                <Flag bind:value = {data.Show_Archived} symbol = '📂' on:change = {()=>updateFilter('Archived')}/>
                <Flag bind:value = {data.Show_Deleted} symbol = '⨯' on:change = {()=>updateFilter('Deleted')} />
                <Flag bind:value = {data.Show_Cancelled} symbol = 'c' on:change = {()=>updateFilter('Cancelled')} />
                <Flag bind:value = {data.Show_Deferred} symbol = 'ⓘ' on:change = {()=>updateFilter('Deferred')} />
                <Flag bind:value = {data.Show_Done} symbol = '☑' on:change = {()=>updateFilter('Done')} />
                <!-- <Flag bind:value = {data.Is_Tall} symbol = '🡥' on:change = {()=>{update('projects', {ID:data.ID, Is_Tall:data.Is_Tall})}} /> -->
            </div>
        </SummaryDetails>
        <Flag bind:value = {data.Is_Tall} symbol = '↕' on:change = {()=>{update('projects', {ID:data.ID, Is_Tall:data.Is_Tall})}} />
        <Flag bind:value = {data.Is_Wide} symbol = '↔' on:change = {()=>{update('projects', {ID:data.ID, Is_Wide:data.Is_Wide})}} />
        <button classs = "remover" on:click={e=>{e.stopPropagation(); removeProject(data) }}>x</button>
    </span>
    {/if}
    <ul class = "task-list p-0">
        <!-- {JSON.stringify(data.list)} -->
        {#each data.taskList || [] as task}<li>
            <Task data = {task} on:taskUpdated = {reloadTasks}/>
        </li>{/each}
        {#if !mini }<li class = "new-task"><Task  data = {{Name:'', Project_ID:data.ID, Date_Created:nowTS()}} on:taskUpdated = {reloadTasks}/></li>{/if}
    </ul>
</div>

<style>
    .project {position: relative; }
    .filters {
        box-shadow: 0 3px 10px -3px brown; border-radius: 0 0 5px 5px; transition: 0.3s opacity, 0.2s top; 
        opacitys: 0; visibility: hidden; position: absolute; tops:-12px; right: 0%; display: inline-flex; gap:0.5rem; 
        padding:0.1rem 0.3rem; background-color: antiquewhite;
    }
    .project:hover .filters {visibility: visible; tops:0px; opacity: 0.8;}
    :is(div, li) > button {visibility: hidden;}
    :is(div, li):hover > button {visibility: visible;}
    span:empty {display: none;}
    .remover {visibility:hidden; transition: visibility 300ms; transition-delay: 100ms; position: absolute; right: 10px; top: 0;}
    .project:hover .remover {visibility:visible; }
    .new-task:not(:focus-within) {visibility: hidden;}
    .task-list {overflow: auto; max-height: 10rem; }
    .row-span-2 .task-list {max-height: 20rem; min-height: calc(100% - 2rem);}
    /* .col-span-2 .task-list {max-height: 20rem;} */
    .task-list:hover .new-task {visibility: visible;}
</style>
