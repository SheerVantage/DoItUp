
<!-- https://github.com/rsdavis/svelte-drawer -->
<!-- <svelte:options tag = "side-drawer"/> -->
<script>

    import { onMount } from 'svelte'
    import { createEventDispatcher } from 'svelte'

    export let open         = false, icon = ''
    export let duration     = 0.2
    export let placement    = "left"
    export let size         = null
    // export let bg           = 'white'
    export let caption      = '', label = '⋮', autohide = true, button = true //, backdrop = true

    let mounted = false
    const dispatch = createEventDispatcher()

    $: style = `--duration: ${duration}s; --size: ${size};`;

    function scrollLock(open) {
        if (mounted) {
            const body = document.querySelector("body");
            body.style.overflow = open ? 'hidden' : 'auto'
        }
    }

    $: scrollLock(open)

    function handleClickAway () {
        dispatch('clickAway')
        open = !autohide
    }

    onMount(() => {
        mounted = true
        scrollLock(open)
    })

</script>

{#if button || icon}<button class = "px-2 font-bold" on:click={() => open = true}>
    {#if icon}<img icon alt src = "{icon}"/>{/if}
    {#if label}{label}{/if}
</button>{/if}

<aside class="drawer" class:open {style}>

    <div class="overlay" role = "button" tabindex="" on:keypress={()=>{}} on:click={handleClickAway} />
    <div class="panel bg-green-100 {placement}" class:size>
        <div class = "flex p-3 bg-blue-200" style = "background-color: ghostwhite; padding:0.5rem;">
            {caption} 
            <button class = "ml-auto" on:click={()=>open = false}>⨯</button>
            <!-- option to logout -->
        </div>
        <slot name = "header"></slot>
        <div class = "content flex gap-2 p-3"><slot /></div>
    </div>

</aside>

<style>
    
    :global(.content > *) {width: 100%;}

    .px-2 {padding-inline: 0.4rem;}

    .drawer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        transition: visibility var(--duration) step-start, z-index var(--duration) step-end;
        visibility: hidden;
    }

    .drawer.open {
        z-index: 99;
        transition: visibility var(--duration) step-start, z-index var(--duration) step-start;
        visibility: visible;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(100, 100, 100, 0.5);
        opacity: 0;
        z-index: 2;
        transition: opacity var(--duration) ease;
    }

    .drawer.open .overlay {
        opacity: 1;
    }

    .panel {
        position: fixed;
        width: var(--width, 90%);
        height: 100%;
        background: var(--bg-panel, white);
        box-shadow: 5px 0 15px -10px;
        z-index: 3;
        transition: transform var(--duration) ease;
        overflow: auto;
        display:flex;
        flex-direction: column;
    }

    /* .panel > .content { height: 100%; } */

    .panel.left {
        left: 0;
        transform: translate(-100%, 0);
    }

    .panel.right {
        right: 0;
        transform: translate(100%, 0);
    }

    .panel.top {
        top: 0;
        transform: translate(0, -100%);
    }

    .panel.bottom {
        bottom: 0;
        transform: translate(0, 100%);
    }

    .panel.left.size,
    .panel.right.size {
        max-width: var(--size);
    }

    .panel.top.size,
    .panel.bottom.size {
        max-height: var(--size);
    }

    .drawer.open .panel {
        transform: translate(0, 0);
    }

</style>