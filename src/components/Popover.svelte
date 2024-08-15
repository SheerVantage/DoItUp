
<!-- 
    Anchor Is The Best New CSS Feature Since Flexbox - https://www.youtube.com/shorts/fO0XD75u2TI 
-->

<div class = "relative" >
    <button id = "button-{id}" class = "bg-blue-300 p-1" popovertarget = "popover-{id}">{icon} {label}</button>
    <div id = "popover-{id}" popover anchor = "button-{id}">
        <slot />
    </div>
</div>

<script>
    export let id,icon = '', label = ''
</script>

<style>
#anchor_1 {
  anchor-name: --anchor_1;
}
[popover] {
  /* border: 1px solid;
  padding: 1rem;
  width: 10rem; */
  position: absolute;
  /* position-anchor: --anchor_1;
  inset-block-start: anchor(--anchor_1 bottom);
  inset-inline-start: anchor(--anchor_1 left); */
  left:anchor(left);
  top:anchor(bottom);
  
  /* display: none; */
  /* opacity: 0; */
  /* transition: opacity 500ms, display 500ms allow-discrete, overlay 500ms allow-discrete; */
  
  /* &:popover-open {
    display: block;
    opacity: 1;
    
    @starting-style {
      opacity: 0;
    }
  } */
}
</style>