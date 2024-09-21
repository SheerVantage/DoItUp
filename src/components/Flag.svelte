<script>
    import { createEventDispatcher } from "svelte";

    export let value, symbol
    let disptcher = new createEventDispatcher()
    function toggle(){
        value = !(value + '' == 'true')
        disptcher('change', {value})
        // debugger
    }
</script>

<span class = "cursor-pointer px-1 rounded" aria-hidden="true" class:selected = {value + '' == 'true'} on:click={toggle}>{symbol}</span>

<style>
    .selected {color: green; background-color: bisque;}
</style>

