import {base, assets} from "$app/paths";
export {base, assets}
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
export { get as getValue } from "svelte/store"

export const storeProject = writable()
export const storeScreen = writable()
export const storePage = writable()
export const storeComponent = writable()
export const storeComponentUpdated = writable()
export const storeCC = writable()
// export const storeScreenReader = readable('screen')
export const storeBlock = writable('block')
export const storeField = writable('field')

import { onMount } from 'svelte'
// let isBrowser = false
export const configs = writable({link:'', server:''})
// onMount(async ()=>{})
if(browser){
      load()
// onMount(async ()=>{
//       // configs.set(await fetch(base+'configs.json').then(r=>r.json()))

//       // setItem('configs', $configs)
//       // configs.set(conf)
//       // console.log(conf)
// //   })
// })
}
export async function load(){
      // debugger
      let conf = await fetch(base+'/configs.json').then(r=>r.json())
      configs.set(conf)
      // debugger
      links.set(conf.links)
}

export const user = writable({})
// debugger

export function setItem(key, value){
      if(browser){
            value = typeof value == 'string' ? value : JSON.stringify(value)
            localStorage.setItem(key, value)
      }
}
export function getItem( key ){
      let value
      // if(browser){
            //       debugger
            value = localStorage.getItem(key)
            value = value?.startsWith('{') || value?.startsWith('[') ? JSON.parse(value) : value
      // }
      return value
}

export const task = writable(undefined)
export const order = writable({})
export const orders = writable([])
export const links = writable([])
export const token = writable('')
export const title = writable('')
export const url = writable('')