<script>
    import { createEventDispatcher } from "svelte";

    export let value, symbol
    let disptcher = new createEventDispatcher()
    function toggle(){
        value = !value
        disptcher('change', {value})
        // debugger
    }
</script>

<span class = "cursor-pointer" aria-hidden="true" class:selected = {value} on:click={toggle}>{symbol}</span>

<style>
    .selected {color: green; background-color: red;}
</style>

