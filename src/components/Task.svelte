<script>
    import { insert, update, remove, getList } from "../lib/db"
    import {getItem, task} from '../lib/store'
    import {nowTS} from '../lib/utilities'
    import SummaryDetails from "./Summary_Details.svelte";
    import ModalDialog from "./Modal_Dialog.svelte";
    import Note from "./Note.svelte";
  import {formatter} from '../components/Formatter.svelte'

    export let data
    let nameEl, deferredIcon = 'ⓘ', archivedIcon = '📂'
    function edit(flag, event){
        data.editing = flag
        if(flag == false){
            if(data.ID)
                update('tasks', data)
            else if(data.Name != ''){
                insert('tasks', { DateTime_Created:nowTS(), Deferred:false, Archived:false, Done:false, Doing:false, Current:false, Deleted:false, Cancelled:false, ...data})
                data.Name = ''
            }
        }
        else{
            setTimeout(()=>{
                nameEl.focus()
            }, 100)
        }
    }
    function removeTask(task){
        // remove('tasks', task.ID)
        update('tasks', {ID:task.ID, Deleted:!data.Deleted})
    }
    function start(data){
        let time = nowTS()
        $task = data
        setTimeout(()=>{
            update('tasks', { ID:data.ID, Doing: data.Doing != true, DateTime_Start: time })
            insert('sessions', {Task_ID:data.ID, DateTime_Start: time})
        }, 6000)
    }
    function urgent(data){
        update('tasks', { ID:data.ID, Urgent: !data.Urgent, Current:data.Current || !data.Urgent })
    }
    function archive(){
        update('tasks', { ID:data.ID, Archived: data.Archived != true })
    }
    function defer(){
        update('tasks', { ID:data.ID, Deferred: data.Deferred != true })
    }
    function schedule(){
        if(!data.Current && !data.Duration){
            data.Duration = prompt('Work for how long?')
        }
        update('tasks', { ID:data.ID, DateTime_Start: nowTS(), Current: data.Current != true, Duration:data.Duration, Archived:false })
    }
    function setDuration(){
        let duration = prompt('how long?', data.Duration)
        if(duration)
            update('tasks', { ID:data.ID, Duration: duration })
    }
    function complete(){
        data.Done = !data.Done
        update('tasks', { ID:data.ID, Done: data.Done })
    }

    let focuses = 0
    function onFocus(){
        focuses = focuses
        ++focuses
    }
    function onBlur(){
        focuses = focuses
        --focuses
        setTimeout(()=>{
            if(focuses < 1){
                edit(false)
            }
        }, 300)
    }
    let dialog
    let notes
    async function loadNotes(){
        notes = getList('notes', {Task_ID:data.ID})
    }
    function onNoteChange(){
        update('tasks', {ID:data.ID, notes:$notes.length})
    }

</script>

<div class = "task flex flex gap-1" class:doing = {data.ID && data.ID == $task?.ID}>
    
    <SummaryDetails label = "∷" detailsClasses = "flex actions items-center" summaryClasses = "">
        <div class = "actionss top-0.5 left-2 absolute text-black bg-blue-100 drop-shadow-xl px-2 py-0.5 flex gap-3 ml-2 rounded">
            <button title = "remove" on:click|stopPropagation = {e=>removeTask(data)}>⨯</button>
            <button title = "archive" on:click|stopPropagation = {e=>archive(data)}>{archivedIcon}</button>
            <button title = "defer" on:click|stopPropagation = {e=>defer(data)} class = "text-lg" >{deferredIcon}</button>
            <button title = "start" on:click|stopPropagation = {e=>start(data)}>▷</button>
            <button title = "urgent" on:click|stopPropagation = {e=>urgent(data)}>⭐</button>
            <!-- <button title = "start" on:click|stopPropagation = {e=>popup(data)}>▢</button> -->
            <button title = "schedule"class = "text-sm" on:click|stopPropagation = {e=>schedule(data)}>🗓</button>
            <ModalDialog classes = "p-2" init = {loadNotes} size = "small" label = "▢" bind:this = {dialog}>
                <span class = "mb-2">Title: {data.Name}</span>
                Notes:
                <ul class = "w-full flex flex-col gap-1">
                    {#each $notes || [] as note} <li><Note {update} data = {note} /></li> {/each}
                    <li class = "w-full"><Note on:change = {onNoteChange} {insert} {update} data = {{Content:'new note...', Task_ID: data.ID}} /></li>
                </ul>
            </ModalDialog>
        </div>
    </SummaryDetails>
    <div class = "flex gap-2 flex-grow items-centers align-top">
    {#if data.ID}<span class = "bg-red-200s ">
        {#if data.Deferred}
            <span class = "font-bolds text-lg bg-blue-500s">{deferredIcon}</span>
        {:else if data.Archived}
            <span class = "font-bolds text-sm bg-blue-500s">{archivedIcon}</span>
        {:else}
            <input class = "mt-2" type="checkbox" bind:checked = {data.Done} on:click={complete}/>
        {/if}
    </span>{/if}
    {#if data.editing}
            <input bind:this = {nameEl} type="text" class = "task-title flex-grow" bind:value = {data.Name} on:focus = {onFocus} on:blur = {onBlur} on:edit = { e => { edit(false, e) }}
                on:keypress = {(e)=>{ e.code == 'Enter' && edit(false, e)}}/>
            <input type = "number" class = "w-12 px-0.5" bind:value = {data.Duration} on:focus = {onFocus} on:blur = {onBlur} on:keypress = { e => { e.code == 'Enter' && edit(false, e)}} />
    {:else}
        <div aria-hidden="true" class:bg-yellow-100 = {data.Urgent} class:text-gray-400 = {data.Name == ''} class:text-red-600 = {data.Current} class:deleted = {data.Deleted} class = "task-title hover:bg-blue-200 rounded flex flex-grow relative w-full items-center" class:text-green-600 = {data.Done} >
            <span aria-hidden="true" on:click = {()=>edit(true)} class:deferred = {data.Deferred} class:archived = {data.Archived} class = " flex-grow">
                {data.Name || 'add new task'}
                {#if data.notes }<span class = "rounded bg-blue-300 text-white text-xs px-1">{data.notes - 0 + 1}</span>{/if}
            </span>
            <span aria-hidden="true" class = "cursor-pointer hover:bg-blue-100 ml-auto" on:click={setDuration}>{formatter(data.Duration, 'm2hm')}</span>
        </div>
    {/if}
    </div>
</div>

<style>
    /* :global(.actions) {border: 1px solid; visibility: hidden; position: absolute; top: -20%; right:0px; border-radius: 10px; border-bottom-right-radius: 0;} */
    :global(.actions) {visibility: hidden; z-index: 10; margin-left: 0.1rem;}
    :global(.actions button:hover) {background-color: bisque;}
    :global(.task:hover .actions) {visibility: visible;}
    input[type=checkbox] {width: 16px; height: 16px; transition: background 200ms ease-out 0s;}
    input[type=checkbox]:hover {background: whitesmoke;}
    .task-title { min-height:32px; border:1px; padding:0 0.3rem;}
    .doing {background:pink;}
    .deleted {text-decoration: line-through;}
    .archived {color: darkgray;}
    .deferred {color: gray;}
    .archived, .deferred {font-size: small;}
    /* .task {} */
</style>