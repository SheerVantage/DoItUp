<script>

    import {task} from '../lib/store'
    import {nowTS, difference} from '../lib/utilities'
    import Session from '../components/Session.svelte'
    import { getList, insert, remove, update } from "../lib/db"
    let sid, session, sessions = getList('sessions', {Task_ID:$task.ID, DateTime_End:undefined})
    $: if($task?.ID & $sessions){
        session = $sessions[$sessions.length - 1]
    }

    function startSession() {
        session = {Task_ID:$task.ID, DateTime_Start:nowTS()}
        sid = insert('sessions', session)
    }
    function endSession(){
        let data = {ID: sid || session?.ID, DateTime_End:nowTS()}
        data.Duration = difference(session.DateTime_Start, data.DateTime_End)
        update('sessions', data)
    }
    function closeTask(){
        $task = undefined
    }

</script>

<div class = "p-3 bg-pink-300">
    {$task?.Name}
    <div class = "flex gap-2">
        <button on:click = {startSession}>Start</button>
        <!-- <button on:click = {pauseSession}>Pause</button> -->
        <button on:click = {endSession}>End</button>
        <button class = "ml-auto" on:click = {closeTask}>Close</button>
    </div>
    <ul class = "ml-3s w-full flex flex-col bg-green-200">
        {#each $sessions || [] as session}<li>
            <Session data = {session} />
        </li>{/each}
    </ul>
</div>