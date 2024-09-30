<script>
    import { insert, update, remove, load } from "../lib/db"
    import {getItem, task} from '../lib/store'
    import {nowTS} from '../lib/utilities'
    import SummaryDetails from "./Summary_Details.svelte";
    import ModalDialog from "./Modal_Dialog.svelte";
    import Note from "./Note.svelte";
  import {formatter} from '../components/Formatter.svelte'
    import { createEventDispatcher } from "svelte";

    export let data
    let nameEl, deferredIcon = 'ⓘ', archivedIcon = '📂', dispatch = createEventDispatcher()
    $:data.Done = data.Done == 'true'
    async function edit(flag, event){
        data.editing = flag
        if(flag == false){
            if(data.ID)
                update('tasks', data)
            else if(data.Name != ''){
                await insert('tasks', { DateTime_Created:nowTS(), Deferred:false, Archived:false, Done:false, Doing:false, Current:false, Deleted:false, Cancelled:false, ...data})
                data.Name = ''
            }
            // debugger
            dispatch('taskUpdated', data)
        }
        else{
            setTimeout(()=>{
                nameEl.focus()
            }, 100)
        }
    }
    function removeTask(task){
        // remove('tasks', task.ID)
        // update('tasks', {ID:task.ID, Deleted:!data.Deleted})
        remove('tasks', `tasks.ID = ${task.ID}`)
        dispatch('taskUpdated', data)
    }
    function start(data){
        let time = nowTS()
        // $task = data
        setTimeout(()=>{
            update('tasks', { ID:data.ID, Doing: data.Doing != true, DateTime_Start: time })
            insert('sessions', {Task_ID:data.ID, DateTime_Start: time})
        }, 6000)
    }
    function urgent(data){
        update('tasks', { ID:data.ID, Urgent: !data.Urgent, Current:data.Current || !data.Urgent })
    }
    function archive(){
        update('tasks', { ID:data.ID, Archived: data.Archived != 'true' })
    }
    function defer(){
        update('tasks', { ID:data.ID, Deferred: data.Deferred != 'true' })
    }
    function schedule(){
        if(!data.Current && !data.Duration){
            data.Duration = prompt('Work for how long?')
        }
        update('tasks', { ID:data.ID, DateTime_Start: nowTS(), Current: data.Current != true, Duration:data.Duration, Archived:false })
    }
    function setDuration(){
        let duration = prompt('how long?', data.Duration)
        if(duration){
            update('tasks', { ID:data.ID, Duration: duration })
        }
        dispatch('taskUpdated', data)
    }
    function complete(){
        data.Just_Done = data.Done = data.Done = !data.Done
        
        update('tasks', { ID:data.ID, Done: data.Done })
        dispatch('taskUpdated', data)
    }

    let focuses = 0
    function onFocus(){
        focuses = focuses
        ++focuses
    }
    function onBlur(){
        focuses = focuses
        --focuses
        // debugger
        setTimeout(()=>{
            if(focuses < 1){
                edit(false)
            }
        }, 300)
    }
    let dialog
    let notes
    async function loadNotes(){
        load('notes', '*', `Task_ID = ${data.ID}`, list=>{
            notes = list
        })
    }
    function onNoteChange(){
        update('tasks', {ID:data.ID, notes:notes.length})
    }

    let showNotes = false
    function ShowNotes(){
        // debugger
        showNotes = true
    }

</script>

<!-- <div class = "task relative flex flex gap-1" class:doing = {data.ID && data.ID == $task?.ID}> -->
<div class = "task relative flex flex gap-1">
        {#if data.ID}
    <!-- <button id = "button-{data.ID}" class = "actions" popovertarget = "actions-{data.ID}" popovertargetaction = "toggle">∷</button> -->
    <SummaryDetails label = "∷" detailsClasses = "flex actions items-center" summaryClasses = "">
        <div class = "actionss top-0.5 left-2 z-3 absolute text-black bg-blue-100 drop-shadow-xl px-2 py-0.5 flex gap-3 ml-2 rounded">
            <button title = "remove" on:click|stopPropagation = {e=>removeTask(data)}>⨯</button>
            <button title = "archive" on:click|stopPropagation = {e=>archive(data)}>{archivedIcon}</button>
            <button title = "defer" on:click|stopPropagation = {e=>defer(data)} class = "text-lg" >{deferredIcon}</button>
            <button title = "start" on:click|stopPropagation = {e=>start(data)}>▷</button>
            <button title = "urgent" on:click|stopPropagation = {e=>urgent(data)}>⭐</button>
            <button title = "schedule"class = "text-sm" on:click|stopPropagation = {e=>schedule(data)}>🗓</button>
            <button title = "Notes"class = "text-sms" on:click|stopPropagation = {ShowNotes}>▢</button>
            <!-- <ModalDialog bind:isOpen = {showNotes} classes = "p-2" init = {loadNotes} size = "small" label = "▢" bind:this = {dialog}>
                <span class = "mb-2">Title: {data.Name}</span>
                Notes:
                <ul class = "w-full flex flex-col gap-1">
                    {#each $notes || [] as note} <li><Note {update} data = {note} /></li> {/each}
                    <li class = "w-full"><Note on:change = {onNoteChange} {insert} {update} data = {{Content:'new note...', Task_ID: data.ID}} /></li>
                </ul>
            </ModalDialog> -->
        </div>
    </SummaryDetails>
    
    <ModalDialog bind:isOpen = {showNotes} classes = "p-2" init = {loadNotes} size = "small" label = "none" bind:this = {dialog}>
        <span class = "mb-2">Title: {data.Name}</span>
        Notes:
        <ul class = "w-full flex flex-col gap-1">
            {#each notes || [] as note} <li><Note {update} data = {note} /></li> {/each}
            <li class = "w-full"><Note on:change = {onNoteChange} {insert} {update} data = {{Content:'new note...', Task_ID: data.ID}} /></li>
        </ul>
    </ModalDialog>
    {/if}
    <div class = "flex gap-2 flex-grow items-centers align-top">
    {#if data.ID}<span class = "bg-red-200s ">
        {#if data.Deferred == 'true'}
            <span class = "font-bolds text-lg bg-blue-500s">{deferredIcon}</span>
        {:else if data.Archived == 'true'}
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
        <div aria-hidden="true" class:bg-yellow-100 = {data.Urgent == 'true'} class:text-gray-400 = {data.Name == ''} class:text-red-600 = {data.Current == 'true'} class:deleted = {data.Deleted == 'true'} class = "task-title hover:bg-blue-200 rounded flex flex-grow relative w-full items-center" class:text-green = {data.Done == 'true'} >
            <span aria-hidden="true" on:click = {()=>edit(true)} class:deferred = {data.Deferred == 'true'} class:archived = {data.Archived == 'true'} class = " flex-grow">
                {data.Name || 'add new task'}
                {#if data.Name } <span aria-hidden="true" on:click|stopPropagation = {ShowNotes} class = "ml-0.5 rounded bg-blue-300 text-white text-xs px-1 cursor-pointer">
                    {data.notes && data.notes != 'null' ? data.notes - 0 + 1 : 0}
                </span> {/if}
            </span>
            <span aria-hidden="true" class = "pl-0.5 cursor-pointer hover:bg-blue-100 ml-auto" on:click={setDuration}>
                {formatter(data.Duration, 'm2hm')}
            </span>
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
    .task{position: relative; color: #0D405F;}
    .task-title { min-height:32px; border:1px; padding:0 0.3rem;}
    .doing {background:pink;}
    .deleted {text-decoration: line-through;}
    .archived {color: rgba(31,128,232,.25);}
    .deferred {color: gray;}
    .archived, .deferred {font-size: small;}
    [popover] {
        position: absolute;
        padding: 2rem;
        background-color: aquamarine;
        /* display: flex; */
        z-index: 2;
        inset: unset;
        left:calc(anchor(right) + 100px) ;
        left:15px;
        top: anchor(top);
        top: 100px;
    }
    /* .task {} */
</style>