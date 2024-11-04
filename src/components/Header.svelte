<script>
	import { setItem, getItem, user, orders, configs, links, title, base } from '../lib/store.js'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores'
	import Drawer from './Drawer.svelte'
	// import SB from '../inputs/SplitButtons.svelte'
	let installPrompt = null, installButton
    import { browser } from '$app/environment'

	export let logo = undefined, caption = 'Header', bgColor = 'bg-gray-300'

	onMount(async ()=>{
		// configs = await fetch('configs.json').then(r=>r.json())
		// setItem('configs', configs)
		// $user = getItem('user')
		// debugger
		logo = $configs?.logo || logo
		
		window.addEventListener("beforeinstallprompt", (event) => {
			event.preventDefault();
			installPrompt = event;
			installButton.removeAttribute("hidden");
		});
	})
	
	async function install (){
		if (!installPrompt) {
			return;
		}
		const result = await installPrompt.prompt()
		console.log(`Install prompt was: ${result.outcome}`)
		disableInAppInstallPrompt()
	}

	function disableInAppInstallPrompt() {
		installPrompt = null;
		installButton.setAttribute("hidden", "")
	}
	
	function Navigate(url){
		goto(url)
	}

	function logout(){
		setItem('user', '')
		user.set(undefined)
		// setItem('lastUser', '')
		setItem('lastPassword', '')
		let orders = base
		// debugger
		if($page.url.pathname != '/'){
			goto(orders)
		}
	}

	// function Load_Orders(){
	// 	fetch(`${configs.server}?e=Order&a=Load_Orders&level=${$user.level}&eid=${$user.eid}`).then(r=>r.json()).then((list) => {
	// 		orders.set(list)
	// 		setItem('orders', list)
	// 	})
	// }
	let hasPrevious, hasNext
	$: hasPrevious = browser && history.length > 1
	$: hasNext = browser && history.state !== null

	function goBack(){
		history.back()
	}
	function goForward(){
		history.forward()
	}

</script>

<!-- {#if $user?.uid} -->
<section class = "{bgColor} flex gap-2 p-2 place-items-centers" dont-print>
 <!-- {@debug history} -->
	<span class = "logo flex gap-1 place-items-center">
		<!-- {hasPrevious} -->
		<span class = "flex rounded-lg px-1 mr-1" style = "background: rgba( 255, 255, 255, 0.3)">
			{#if hasPrevious}<div class = "pr-1 cursor-pointer" on:click = {goBack} on:keyown={()=>{}} aria-hidden="true" >🡠&nbsp;</div>{/if}
			{#if hasNext}<div class = "pr-1 cursor-pointer" on:click = {goForward} on:keyown={()=>{}} aria-hidden="true" >&nbsp;🡢</div>{/if}
		</span>
		{#if logo}<img class = "mr-0" style = "height:20px;" src={base+($configs.logo || logo)} alt="">{/if}
		<span class = "md:font-bold sm:text-sm flex">{caption}</span>
		{#if caption && $title}: {/if}
		<span class = "ml-1s sm:text-sm text-blue-700 flex"> {$title} </span>
	</span>
	
	<div flex class = "ml-auto flex flex-grow-0">
		<!-- <button on:click = {logout} class = "👤"> 👷{ $user?.employee || $user?.name || $user?.Name || $user?.user_name || ''}</button> -->
		<!-- <SB caption = '👷' --bg = "pink" choices = {[{label:'Logout', fn:logout}, {label:'Profile', url:base+'/profile'}]}/> -->
		<!-- <button class = "bg-blue-300 px-1" on:click = {()=>Navigate("./orders")}>≣</button> -->
		<button bind:this = {installButton} on:click = {install} id="install" hidden>⭐ Install</button>
		<span class = "flex gap-1"><slot /></span>
		<span class = "flex gap-1"><slot name = "tools"/></span>
		<Drawer --width = "20rem" placement = "right">
			<div slot = "header" class = "p-2 bg-gradient-to-tr from-indigo-300 to-yellow-200 p-4 py-12 flex flex-col items-start gap-2">
				<span class = "rounded bg-white p-6"></span>
				Navigation Bar
				<span class = "flex gap-2" ><slot name = "drawer"/></span>
			</div>
			<!-- {@debug $links} -->
			<ul class = "min-h-24 navigation-menu flex flex-col gap-2">
				{#if $links.length}{#each $links as link}
					<li><a href = { base + ( link.url == '/' ? link.url : '/' + link.url) }>{link.label || link}</a></li> 
				{/each}{/if}
				<li class = "mt-auto mt-24"><a href = {base+'/profile'}>👷{ $user?.employee || $user?.name || $user?.Name || $user?.user_name || ''}</a></li>
				<li><button on:click = {logout} class = "👤">Logout 🡥</button></li>
			</ul>
		</Drawer>
		<!-- <div class = "">🡢</div> -->
		<!-- {hasNext} -->
	</div>

</section>
<!-- {/if} -->

<style>
	.ml-1 {margin-left: 0.5rem;}
	.ml-auto {margin-left: auto;}
	.mt-auto {margin-top: auto;}
	.mt-24 {margin-top: 10rem;}
	.mr-2 {margin-right: 0.4rem;}
	.cursor-pointer {cursor:pointer;}
	.text-blue-700 {color:#1D4ED8;}
	.font-bold {font-weight: 600;}
</style>