<script>
    import "../app.css";
    import AppBody from '../components/AppBody.svelte'
	// import Header from '$components/specials/Header.svelte'
    // import SingUpIn from '$specials/SignUpIn.svelte'
</script>

<!-- <div> -->
    <!-- {#if $user && $user.uid} -->
    <!-- {#if browser} -->
        <!-- <Header caption = "Do It Up" logo = {"/favicon.svg"} /> -->
        <!-- <section class = "h-full overflow-auto"><slot /></section> -->
    <AppBody>
        <slot />
    </AppBody>
    <!-- {:else}
        <SingUpIn />
    {/if} -->
<!-- </div> -->