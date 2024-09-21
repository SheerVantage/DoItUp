<!-- <svelte:head>
	<title>Perfina</title>
	<meta name="description" content="The Personal Financial App" />
</svelte:head> -->

<script>
	// import CM from '../components/Context_Menu.svelte'
	// import PWA_Installer from '../components/PWA_Installer.svelte'
	// import TA from '../components/Transaction_Analyzer.svelte'
	// import Selector from '$inputs/Selector.svelte'
	// import MD from '$containers/Modal_Dialog.svelte'
	// import GE from '$collections/GrouperElement.svelte'
	// import ME from '../components/Meta_Editor.svelte'
	// import TE from '../components/Transaction_Entry.svelte'
    import {onMount} from 'svelte'
    import Worker from '$lib/worker.js?worker'
	import GE from '$collections/GrouperElement.svelte'
	import Entry from '../components/Entry.svelte'
	import TG from '../components/TileGroup.svelte'
	import {today, formatDate, setItem, getItem} from '$libs/utilities'
	import Drawer from '$containers/Drawer.svelte'
	import FlatList from '../components/Flatlist.svelte';
	import { fly, slide } from 'svelte/transition';
	import schema from '../lib/schema.json'
	import Header from '../components/Header.svelte';
	// import Slider from '../components/Slider.svelte';
	let name, e, entry = {Effect:'-'}, transaction, worker, entities = ['parties', 'purposes', 'transactions', 'funds'], cm, ta, me, ge
	let date, party, purpose, fund, direction, isEditing = false, loaded = false, statuses = [], rnps = [], ines = []
	entities = schema.tables.reduce((obj, table)=>{
		// debugger
        obj[table.name] = {fields:table.fields, list:getItem(table.name) || []}
        return obj
    }, {})
    onMount(()=>{
		// debugger
		loaded = true
		statuses = getItem('statuses')
		rnps = getItem('rnps')
		// return
        worker = new Worker()
		e.initialize(entities, worker)
		// debugger
        worker.addEventListener('message', ({data})=>{
            if(data.ready === true){
                worker.postMessage({action:'init_schema'})
                worker.postMessage({action:'select', entity:'parties', table:'parties'})
                worker.postMessage({action:'select', entity:'party_types', table:'party_types'})
                worker.postMessage({action:'select', entity:'purposes', table:'purposes'})
                worker.postMessage({action:'select', entity:'sub_purposes'})
                worker.postMessage({action:'select', entity:'funds', table:'funds'})
                worker.postMessage({action:'select', entity:'sub_funds', table:'sub_funds'})
                reloadFunds()
        //         worker.postMessage({action:'select', entity:'sub_funds'})
		// 		// let list = data.exec('funds', '*')
		// 		// console.log(list)
				filter()
            }
            else if(data.action == 'selectOne' && data.row){
				if(data.entity == 'statuses'){
					statuses = Object.entries(data.row).map(([field, value])=>{
						return {Name:field, Value:value, url:'./transactions'}
					})
					setItem('statuses', statuses)
					// debugger
				}
				else if(data.entity == 'rnps'){
					rnps = Object.entries(data.row).map(([field, value])=>{
						return {Name:field, Value:value, url:'./transactions'}
					})
					setItem('rnps', rnps)
					// debugger
				}
				else if(data.entity == 'ines'){
					ines = Object.entries(data.row).map(([field, value])=>{
						return {Name:field, Value:value, url:'./transactions'}
					})
					// debugger
				}
			}
            else if(data.action == 'select' && data.rows){
				if(entities[data.entity] && entities[data.entity].list){
                	entities[data.entity].list = data.rows
					setItem(data.entity, data.rows)
				}
				if(data.entity == 'transactions'){
					transactions = data.rows
				// 	data.rows.forEach(row=>{
				// 		if(!row.Amount || row.Amount == '' || row.Amount == '0'){
				// 			e.updateAll(row)
				// 		}
				// 	})
				}
            }
			// else{
			// 	// console.log(data)
			// }
        //     else if(data.action == 'insert' && data.iid){
        //         // entities[data.entity].fields = {...entities[data.entity].fields, ID:data.iid}
        //         let list = entities[data.entity].list 
        //         entities[data.entity].list = [...list, data.row]
        //         // entities[data.entity].fields = {}
        //     }
        //     else if(data.action == 'update' && data.row){
		// 		let index = entities[data.entity].list.findIndex(item=>item.ID == data.row.ID)
		// 		entities[data.entity].list[index] = data.row
        //         entities[data.entity].list = entities[data.entity].list
        //     }
        //     else if(data.action == 'delete' && data.id){
        //         entities[data.entity].list = entities[data.entity].list.filter(item => item.ID != data.id)
        //     }
        })
        // cm.showMenu()        
    })
	function reloadFunds(){
		worker.postMessage({
					action:'selectOne', entity:'statuses', 
					table:'parties', fields:'SUM(Amount_Receivable) Receivables, SUM(Amount_Payable) Payables',
					conditions:"1", log:false
				})
		worker.postMessage({
			action:'selectOne', entity:'rnps',
			// table:'transactions t inner join purposes p on p.ID = t.Purpose_ID', fields:"SUM(iif(p.Effect = '+', t.Amount, 0)) Receipts, SUM(iif(p.Effect = '-', t.Amount, 0)) Payments, SUM(iif(p.Effect = '+' AND p.ID = 1, t.Amount, 0)) Incomes, SUM(iif(p.Effect = '-' AND p.ID = 1, t.Amount, 0)) Expenses",
			table:'transactions t inner join purposes p on p.ID = t.Purpose_ID', fields:"SUM(iif(p.Effect = '+', t.Amount, 0)) Receipts, SUM(iif(p.Effect = '-', t.Amount, 0)) Payments",
			conditions:"1", log:false
		})
		// worker.postMessage({
		// 	action:'selectOne', entity:'ines',
		// 	table:'transactions t inner join purposes p on p.ID = t.Purpose_ID', fields:"SUM(iif(p.Effect = '+', t.Amount, 0)) Inomes, SUM(iif(p.Effect = '-', t.Amount, 0)) Expenses",
		// 	conditions:"1", log:true
		// })
	}
	function editItem(item){
		selectItem(item)
		nameLast = item.Name
		isEditing = true
	}
	function update(uEntry, fullEntry){
		if(uEntry){
			worker.postMessage({entity:'transactions', action:'update', row:fullEntry, table:'transactions', fields_values:uEntry, conditions:`ID = ${uEntry.ID}`})
			entities.transactions.list = entities.transactions.list.map(item => {
				return item.ID == fullEntry.ID ? fullEntry : item
			})
		}
		// debugger
		// entry = {Name:''}
	}
	function selectItem(item){ 
		entry = item 
	}
	function remove(item, e){
		worker.postMessage({entity:'transactions', action:'delete', conditions:'ID = '+item.ID})
		item.deleted = true
		item.Name = ''
		item.ID = ''
	}
	function confirm(item, e){
		e.stopPropagation()
		worker.postMessage({action:'confirm', item})
		worker.postMessage({action:'select', entity:'funds', table:'funds', fields:'ID, Name, Amount'})
		// worker.postMessage({entity:'transactions', action:'update', fields_values:'Is_Confirmed = 1', conditions:"ID = " + item.ID})
		// item.Is_Confirmed = '1'
	}
	let bgs = {'+':'bg-green-300', '-':'bg-red-300', '<':'bg-lime-200', '>':'bg-orange-200'}
	let transactions = []
	function filter(){
		// debugger

		date = date || getItem('date')

		let date_conditions = `DATE(t.Date) = '${today('YYYY-MM-DD')}' OR DATE(t.Date_Modified) = '${today('YYYY-MM-DD')}'`

		if(date){
			// date_conditions += ` OR DATE(t.Date) = '${formatDate(date, 'YYYY-MM-DD')}' OR DATE(t.Date_Created) = '${formatDate(date, 'YYYY-MM-DD')}'`
			date_conditions = `DATE(t.Date) = '${formatDate(date, 'YYYY-MM-DD')}' OR DATE(t.Date_Created) = '${formatDate(date, 'YYYY-MM-DD')}'`
			setItem('date', date)
		}

		worker.postMessage({
			action:'select', 
			entity:'transactions', 
			table:'transactions t left join parties p on p.ID = t.Party_ID left join purposes pp on pp.ID = t.Purpose_ID left join sub_purposes sp on sp.ID = t.Sub_Purpose_ID left join funds f on f.ID = t.Fund_ID', 
			fields:"t.*, p.Name Party, iif(sp.Name, sp.Name, pp.Name) Purpose, pp.Effect, iif( t.Effect != '', t.Effect, pp.Effect ) Effect, f.Name Fund", 
			conditions:date_conditions, 
			orders:"t.Date desc",
			log:false
		})
	}
  let visible;
  function handleClose(){
    visible = false;
  }
  $:if(date){
	filter()
  }
  import { Badge } from "$shadcn/badge";
  import { Synch_Transactions as ST } from "$specials";
</script>

<Header>
	<button on:click={()=>(visible=true)}>📜</button>
	<Drawer --width = "20rem" placement = "right">
		<div slot = "header" class = "bg-gradient-to-tr from-indigo-300 to-yellow-200 p-4 py-12 flex flex-col items-start gap-2">
			<span class = "rounded bg-white p-6"></span>
			Navigation Bar
		</div>
        <ul class = "navigation-menu"> {#each [{label:'Transactions', url:'./transactions'}, {label:'Budget', url:'./budget'}, {label:'Settings', url:'./settings'}] as link} <li><a href = {link.url}>{link.label}</a></li> {/each} </ul>
    </Drawer>
</Header>


<section class = "backdrop-blur-2xls flex-grow bg-blue-300s p-0 flex flex-col grids gap-2 md:px-60s content" style = "grid-template-rowsssss:3rem minmax(4rem, 6rem) 1fr; heights:calc(100vh)">

	<!-- <Badge>Badge</Badge> -->
	<!-- <Slider/> -->

	<ST />

	<!-- <ME label = "⚙" bind:this = {me} {worker}/> -->
	<!-- <PWA_Installer classes = "ml-auto"/> -->
	<!-- <CM bind:this = {cm} addMeta = {me?.addMeta}/> -->
	<!-- <Entry bind:this = {e} {entry} {entities} {worker}/> -->

	<TG items = {entities.funds?.list} classes = "p-3 bg-darker rounded-3xls shadow-inner gap-3" labelField = "Name" tileClasses = "bg-opacity-70 rounded-md drop-shadow shadow-raised p-2 px-3 text-blue-600 bg-blue-100a bg-white" valueField = 'Amount' labelClasses = "text-green-800 text-xs font-normal text-shadow" valueClasses = "text-xls"/>

	<div class = "px-3 grid gap-2">
		<TG items = {statuses || []} labelField = "Name" tileClasses = "bg-opacity-80 rounded-md shadow-md shadow-raised p-2 px-3 bg-blue-100 border-2 border-blue-200" valueClasses = " text-blue-600" />
		<TG items = {rnps || []} labelField = "Name" tileClasses = "bg-opacity-80 rounded-md shadow-md p-2 px-3 bg-blue-100 border-2 border-blue-200" valueClasses = " text-blue-600" />
		<Entry on:entry-updated = {reloadFunds} bind:this = {e} {entry} {entities} {worker} on:changed = {filter}/>
	</div>
	<!-- <div type="text" style = "user-select: all" > testing this one </div> -->
	<!-- <TE {entities} bind:entry = {entry} on:changed = {filter} /> -->
	<!-- <MD label = "Add"> -->
		<!-- <Entry bind:this = {e} {entry} {entities} {worker} on:changed = {filter}/> -->
	<!-- </MD> -->
		
	<FlatList on:close={handleClose} bind:visible>
		<div><input type="date" bind:value = {date} ></div>
		<GE bind:selectedItem = {entry} {bgs} bgField = "Effect" on:selectItem = {()=>{ visible = false}} bind:this = {ge} classes = "w-full" groupField = 'Date' groupHeaderClasses = "text-gray-400" groupFieldFormat = "Date" items = {transactions} fields = {['Purpose', 'Sub_Purpose', 'Party', 'Amount', 'Fund']} remove = {remove} confirm = {confirm} {selectItem} {editItem} />
	</FlatList>

</section>

<style></style>