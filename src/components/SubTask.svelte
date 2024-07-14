<script>
    import  presistentStore from "$libs/presistent-store";
    export let data, addTask, updateSubTask, selectTask, removeTask, selected
    let ctask, subtasks = presistentStore("sub-tasks-" + data.ID, [], {dbName:"sub-tasks", driver:"INDEXEDDB"});
    let el
    // debugger
    $: if(el && data.editing) el.focus()
    function edit(flag){
        data.editing = flag
        data.New = false
        if(flag){
            // debugger
            // setInterval(() => {
            //     el.focus()
            // }, 0);
        }
    }
    function update(e){
        if(e.keyCode != '13' && e.type != 'blur') return
        debugger
        data.editing = false
        updateSubTask(data)
    }
    function addSubTask(e, task){
        e.stopPropagation()
        task.ID = Date.now()
        $subtasks = [...$subtasks, task]
        // debugger
        task.editing = true
    }
    function updateSubTask(task){
        $subtasks = [...$subtasks] //$tasks.map(t=>t.ID == task.ID ? taks : t)
    }
</script>
<div>
    <div aria-type = "none" class = "w-full flex flex-row border-2s border-black" class:border-2s = {selected} on:click = {()=>edit(true)}>
        {#if data.editing}
            <input bind:this = {el} type="text" class = "flex-grow bg-blue-200s p-2" bind:value = {data.Name} on:blur = { (e)=>{ update(e) }}
                on:keypress={(e)=>{ update(e)}}>
        {:else}
            <span class = "p-2">{data.ID} - {data.Name}</span>
        {/if}
        <button class = "bg-green-400 p-2 ml-auto" on:click = {(e)=>addSubTask(e, {Name:'', New:true})}>[+]</button>
        <button class = "bg-red-400 p-2 " on:click = {()=>removeTask(data)}>[-]</button>
    </div>
    <div class = "grid gap-2 p-1">
        <div class = "flex flex-col bg-blue-600">{#each $subtasks as task, index}
            <span class = "flex bg-blue-100 gap-3"><span class = "w-3 text-right p-2">{index + 1}</span><svelte:self class = "w-full" selected = {task == ctask} data = {task} {addTask} updateTask = {updateSubTask}} {removeTask} {selectTask} /></span>
        {/each}</div>
    </div>
</div>

<style>
    div > button {visibility: hidden;}
    div:hover > button {visibility: visible;}
</style>