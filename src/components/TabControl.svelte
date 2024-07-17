
<div fill class="tab-control {classes}" {name}>
	<div class="tabs">
		<slot isTitle={true} isContent={false}/>
	</div>
	<div class="tab-content">
		<slot isTitle={false} isContent={true}/>
	</div>
</div>
<!-- <TabControl name = "main" let:isTitle let:isContent >
	<Tab label = "Project" {isTitle} {isContent}>
		<Lister size = "20" bind:items = {$migrationStore.projects} bind:selection = {$migrationStore.projectName} />
	</Tab>
</TabControl> -->

<script context="module">
	export const tabsKey = {}
</script>

<script>
	import { setContext, onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { localStore } from '../lib/localStore'
	export let name, screen = '', pid = '', classes
	
	const tabs = writable([]);
	const selectedTab = localStore(screen + pid + name + 'selectedTab', null)
	
	setContext(tabsKey, { tabs, selectedTab });
	
	// onMount(() => {
			if ($tabs.length > 0)
				$selectedTab = $selectedTab || $tabs[0];
	// });
</script>

<style>
	.tab-control { min-height:100%;  }
	.tabs {padding-left:1rem; border-bottom: 1px solid silver; display: flex; gap:1rem; height:40px;}
	.tab-content { width: 100%; height: calc(100% - 40px); padding: 0.5rem;}
</style>
