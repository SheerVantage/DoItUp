<script>
	import { tabsKey } from './TabControl.svelte';
	import { getContext, onMount } from 'svelte';
	import {fade} from 'svelte/transition'

	// export let classes //id, ;
	export let isTitle;
	export let isContent;
	export let label = 'New tab'
	
	const { selectedTab, tabs } = getContext(tabsKey);
	$tabs = $tabs.some(t => t == label) ? $tabs : [...$tabs, label];
	
	// $: isSelected = label == $selectedTab;
</script>
{#if isTitle}
	<button class="tab-button" class:selected={label == $selectedTab} on:click={() => $selectedTab = label}>
		{label} <!-- <slot name="title"/> -->
	</button>
{/if}

{#if isContent && label == $selectedTab}
	<div transition:fade class = "tab-container" fill><slot/></div>
{/if}

<style>
	.tab-container {display: block; height: 100%; overflow:auto;}
	.tab-button {display: flex; place-items: center; padding-inline: 0.5rem;}
	/* .tab { height:100%; border: none; padding: 0 8px; cursor: pointer; background: none; margin: 0; cursor: pointer; border-bottom-left-radius: 0; border-bottom-right-radius: 0; } */
	.tab-button.selected { background: whitesmoke; border: 1px solid lightgray; border-bottom-width: 0px; cursor: default; }
</style>
