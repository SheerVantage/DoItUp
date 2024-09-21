<script>
    import MD from './Modal_Dialog.svelte'
	import Selector from '$inputs/Selector.svelte'
	import Form from '$inputs/Form.svelte'
	// import ListPanel from '$collections/ListPanel.svelte'
    import Worker from '$lib/worker.js?worker'
	import schema from '$lib/schema.json'
	import { onMount } from 'svelte';
	import { getItem } from '../../../svelte/web-components/src/lib/utilities';
	// import { format } from '$libs/utilities';

	export let worker, label

	onMount(()=>{
		
		if(!worker){
			worker = new Worker()
		}

		worker.onmessage = ({data})=>{
			// debugger
			if(data.action == 'select' && data.rows){
				list = data.rows
			}
		}

		// worker.addEventListener('message', ({data})=>{
		// 	// console.log(data.rows)
		// 	if(data.action == 'select' && data.rows){
		// 		list = data.rows
		// 	}
		// })

	})
    export function save(item){
		if(item.ID)
    	    worker.postMessage({entity:currentEntity.name, action:'update', table:currentEntity.name, fields_values:`Name='${item.Name}'`, conditions:`ID = ${item.ID}`})
		else
	        worker.postMessage({entity:currentEntity.name, action:'insert', table:currentEntity.name, fields_values:`Name='${item.Name}'`})
	}
	export function removeMeta(table, item){
        worker.postMessage({entity:table, action:'delete', table:table, conditions:`ID = ${item.ID}`})
	}
    export function removeItem(entity, id){
        worker.postMessage({entity, action:'delete', table:items[entity].table, id, conditions:'ID = ' + id})
    }
	export const addMeta = function(entity){
        let item = {Name:getSelection()?.toString().trim().capitalize()}
		// entities.parties.list.push(item)
		worker.postMessage({entity, action:'insert', table:entity, fields:'Name', values:[item.Name]})
	}
    function addItem(entity){
        worker.postMessage({entity, action:'insert', table:entity, fields:'Name', values:[entities[entity].fields.Name]})
    }
	function listItems({detail}){
		list = getItem(detail.item.name)
		worker.postMessage({action:'select', entity:detail.item.name, log:true})
	}
	let form, id, list = [], data = {}, currentEntity //= schema.tables[0]
</script>
<MD {label}>
<div class = "p-4 grids gap-3 flex flex-col" styles = "grid-template-columns: 1fr 2fr 4fr">
	<!-- <ul>
		{#each schema.tables as form}
			<li class:selected = {currentEntity == form}><button class="text-left" on:click = {()=>{currentEntity = form}}>{form.name.replace('_', ' ').capitalize()}</button></li>
		{/each}
	</ul> -->
	
	<div class="flex gap-2">
		<!-- {currentEntity.name} -->
		<Selector bind:value = {currentEntity} on:change = {listItems} options = {schema.tables}/>
		<Selector bind:value = {data} on:change = {({detail})=>{
			// debugger
			form.setData(detail.item)
		}} options = {list}/>
		<!-- <ListPanel caption = {'List of ' + currentEntity.name} fields = {['ID', 'Name']} autoload = {false} {loader} entity = {currentEntity.name} bind:items = {list} /> -->
		<!-- <ul>
			{#each list as item}
				<li on:click = {()=>{form.setData(item)}}>{item.Name}</li>
			{/each}
		</ul> -->
	</div>
	
	<Form caption = "Metas" saver = {save} bind:this = {form} bind:template = {currentEntity} bind:data = {data}/>
	
    <!-- <ul class = "w-full">
		<input type="text" bind:value = {entities.parties.fields.Name} />
        <button on:click = {()=>addItem('parties')}>Add Party</button>
		{#each entities.parties.list as item}
			<li class = "flex gap-1"> 
				{item.ID}. <input bind:value = {item.Name} /> <button on:click = {()=>{updateMeta('parties', item)}}>Update</button><button on:click={removeMeta('parties', item)}> x </button>
			</li>
		{/each}
	</ul> -->

	<!-- <ul class = "w-full">
		<input type="text" bind:value = {entities.purposes.fields.Name} />
        <button on:click = {()=>addItem('purposes')}>Add Purpose</button>
		{#each entities.purposes.list as item}
			<li class = "flex gap-1"> 
				{item.ID}. <input bind:value = {item.Name} /> <button on:click = {()=>{updateMeta('purposes', item)}}>Update</button><button on:click={removeMeta('purposes', item)}> x </button>
			</li>
		{/each}
	</ul>

	<ul class = "w-full">
		<input type="text" bind:value = {entities.funds.fields.Name} />
        <button on:click = {()=>addItem('funds')}>Add Fund</button>
		{#each entities.funds.list as item}
			<li class = "flex gap-1"> 
				{item.ID}. <input bind:value = {item.Name} /><button on:click = {()=>{updateMeta('funds', item)}}>Update</button>
			</li>
		{/each}
	</ul> -->
</div>
</MD>