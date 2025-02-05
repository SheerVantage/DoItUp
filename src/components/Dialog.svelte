<!-- <svelte:options tag = "modal-dialog"/> -->

<script>
	import { fade, slide } from 'svelte/transition';
	// export {fields as data}
	export let init = undefined, isOpen = false, fields = {Name:'ABCDEFGH', Project_ID:3}
	export let caption = 'Caption: Modal Dalog', classes = '', button_classes = '', label = 'Label: Modal Dialog', icon = '', size = 'large', callback = '', validator = undefined, entity = '', enabled = true //, sticky = false
	let dialog, closer, message = '---'
	$: if(isOpen){
		// debugger
		open()
	}
    function open(){
		init && init({ entity, label })
    	// if(enabled)
		isOpen = true
		dialog.showModal()
		// dialog.show()
        // closer = dialog.addEventListener('close', () => {
	    //   // Runs after dialog is closed
	    //   console.log('The modal was closed!');
		//   close()
	    // });
		closer = ({ target }) => {
			if(!target.matches('dialog')) {
				debugger
				close()
			}
		}
		// dialog.onclick = (e) => {
		// 	if (e.target === e.currentTarget) {
		// 		dialog.close()
		// 	}
		// }
		// !sticky && dialog.addEventListener("click", closer)
	}
	function validate(){
		message = ''
		if(validator)
			message = validator()
		return message == ''
	}

	function executeCallback(){
		if(callback) callback()
		close()	
	}

    function close(event){
		isOpen = false
		if(!validate() && !confirm('Do you still want to close it?')){
			return
		}
        dialog.close()
        dialog.removeEventListener('click', closer)
	}
	function onClickOutside(event) {
		event.stopPropagation()
		if (event.target === dialog) {
			close();
		}
	}

	function dispatchCloseEvent(e) {
		// // 1. Create the custom event.
		// const event = new CustomEvent("close", {
		// detail: `alert-box was closed.`,
		// bubbles: true,
		// cancelable: true,
		// composed: true // makes the event jump shadow DOM boundary
		// });

		// // 2. Dispatch the custom event.
		// this.dispatchEvent(event);
		// //debugger;
		// //alert('testing');
	}

</script>

<!-- <div>
	{#if caption}<div>{caption}</div>{/if}
	<div><slot></slot></div>
</div> -->

<div class = "modal-dialog">
	{#if label != 'none'}<button on:click = { e => { e.preventDefault(); e.stopPropagation(); } } disabled = "{!enabled}" on:click = {open} class = "hover:bg-red-100 px-3 {button_classes}">
		{#if icon}<i class = {icon}></i>{/if}{ label || 'Show' }
	</button>{/if}
	<dialog bind:this = {dialog} class = "dialog cursor-default p-2 rounded-xl shadow-2xl drop-shadow-lg sidebar modal animate {size}" on:click = {onClickOutside} aria-modal = "true" aria-hidden="true">
		<!-- {#if isOpen} -->
		 <div class = "w-full h-full" style = "display:grid; grid-template-rows: 48px 1fr;">
	    <div transition:slide={{delay: 200, duration: 500}} class = "dialog-title p-2 gap-2" style = "heights:48px; display:flex; place-items: center;">
	        <span class = "mr-2">{ caption || label || entity || 'Caption'}</span>
			{#if callback}<button class = "p-1 bg-green-300" on:click = {executeCallback}>Execute</button>{/if}
	        <slot class = "tools" name = "tools"></slot>
			<!-- <span {fixed} on:click="{dispatchCloseEvent}" role="button" space = "here and there"> -->
			<button on:click = {close} class = "ml-auto hover:bg-red-600 rounded-md p-1s px-1" style = "top:1rem; right: 1rem; ">✕</button>
	    </div>
	    <div transition:fade={{delay: 50, duration: 100}} class = "overflow-auto {classes} p-3 relative w-full visible flex flex-col" style = "display:flex; position:relative; width:100%; heights:calc( 100% - 48px - 1rem );">
			<div class = "absolute mx-auto bg-yellow-800 rounded" class:visible = { message != ''} style = "visibility:hidden; position:absolute; margin:auto; margin-left:48%; background:yellow;">{message}</div>
	        <slot {fields}></slot>
	    </div>
	</div>
		<!-- {/if} -->
	</dialog>
</div>

<style type="text/css">
	.modal-dialog {background-color: transparent;}
	.dialog-title {background-color: #ffffff36; backdrop-filter: blur(20px); }
	.modal-dialog > button {height: 100%;}
	.ml-auto {margin-left: auto;}
	/* [p-1], .p-1 {padding: 1rem;} */
	dialog { overflow: unset; background-color: #ffffff36; backdrop-filter: blur(24px); padding:0; width: 500px; height: 500px; border-radius: 8px; box-shadow: 0px 0.5px 1.4px #0000001a,0px 1.3px 3.8px rgba(0,0,0,.125),0px 3px 9px rgba(0,0,0,.135),0px 10px 30px rgba(0,0,0,.145); z-index: 10; margin-lefts: calc(var(--scrollbar-width, 0) * -0.5);}
	dialog.medium { width: 80vw; height: auto; max-height: 85vh; }
	dialog.large { width: 93vw; height: auto; max-height: 85vh; }
	*, ::after, ::before { box-sizing: border-box; }
	.visible {visibility: visible;}
</style>