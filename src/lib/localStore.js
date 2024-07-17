//https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores

import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const localStore = (key, initial) => {  // receives the key of the local storage and an initial value

    const toString = (value) => JSON.stringify(value, null, 2)
    const toObj = JSON.parse

    if (browser && localStorage.getItem(key) === null) {
        console.warn(`nothing save for ${key}`);

        localStorage.setItem(key, toString(initial)) // initialize local storage with initial value
    }

    let saved = browser ? toObj(localStorage.getItem(key)) : ''              // convert to object

    const { subscribe, set, update } = writable(saved)          // create the underlying writable store

    return {
        subscribe,
        // getItem:(key) => {
        //     debugger
        //     return localStorage.getItem(key)
        // },
        set: (value) => {
            browser && localStorage.setItem(key, toString(value))              // save also to local storage as a string
            return set(value)
        },
        update
    }
}