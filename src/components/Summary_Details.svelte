<!-- https://codepen.io/WW3/pen/pYqRgq?editors=1010 -->
<details class = "flex w-fit relative { detailsClasses }">
    <summary aria-haspopup="menu" class = "inline-blocks cursor-pointer {summaryClasses}">{label || caption || 'Expand'} </summary>
    <!-- <ul role="menu" class = "content absolute"> -->
        <!-- <span role='menuitem'>fffff</span> -->
        <slot>Nothing here, yet...</slot>
    <!-- </ul> -->
</details>

<script type="text/javascript">
	// import {transactions} from '../store.js'
	export let label = '', caption = '', summaryClasses, detailsClasses
</script>

<style>
    
    .content {display: inline-flex; padding-inline:0.5rem; gap:0.5rem; }
    /* details {}
    summary {
        list-style-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/right-arrow.svg);
    }
    summary:focus {
        list-style-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/down-arrow.svg);
    }
    summary::-webkit-details-marker {
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/right-arrow.svg);
        color: red;
    }
    summary:focus::-webkit-details-marker {
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/down-arrow.svg);
    } */
    details {
        display: inline-block;
    }
    /* summary {
        background-color: #ddd;
        padding: 0.5rem;
        border-bottom: solid 2px transparent;
    } */
    /* [role="menu"] {
        background-color: #ddd;
        list-style: none;
        margin: 0;
        padding: 0;
    } */
    summary { /*, [role="menuitem"]*/
        /* color: black; */
        display: inline-block;
        /* line-height: 2; */
        /* padding: 0.5rem 2rem 0.5rem 1rem; */
        text-decoration: none;
    }
    /* summary:focus, [role="menuitem"]:focus {
        outline: 0;
        background-color: #777;
        border-bottom: solid 2px #000;
        color: #fff;
    } */
</style>