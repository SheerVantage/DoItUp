<div class = "app-body">
    <slot />
</div>

<style>
    :global(.app-body) {
        display: grid; grid-template-rows: 40px 1fr; height: 100%;
    }
    :global(.add-body > *:nth-child(2)){ height:100%;  overflow: auto;}
</style>