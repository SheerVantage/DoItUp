<!-- https://codepen.io/WW3/pen/pYqRgq?editors=1010 -->
<details aria-hidden="true" on:mouseover={hoverIn} on:focus={hoverIn} on:mouseout={hoverOut} on:blur={hoverOut} class = "flex w-fit relative { detailsClasses }" open = {isOpen}>
    <summary aria-haspopup="menu" class = "inline-blocks cursor-pointer {summaryClasses}">{label || caption || 'Expand'} </summary>
    <!-- <ul role="menu" class = "content absolute"> -->
        <!-- <span role='menuitem'>fffff</span> -->

        <div class="dropdown-wrapper">
            <slot>Nothing here, yet...</slot>
        </div>

        <!-- </ul> -->
</details>

<script type="text/javascript">
	// import {transactions} from '../store.js'
	export let label = '', caption = '', summaryClasses, detailsClasses, isOpen = false

    // $(function() {
    //     $('details').on('mouseover focus', function() {
    //         $(this).attr('open', true);
    //     }).on('mouseout blur', function() {
    //         $(this).attr('open', false);
    //     })
    // });

    function hoverIn(){
        // debugger
        // isOpen = true
    }
    function hoverOut(){
        // isOpen = false
    }
    
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

    
details[open] .dropdown-wrapper {
	animation: fade-in 0.5s forwards;
}

details.summary-closing[open] .dropdown-wrapper {
	animation: fade-out 0.5s forwards;
}

@keyframes fade-in {
	0% {
		/* transform: translateY(-20px); */
		opacity: 0;
	}
	100% {
		/* transform: translateY(0); */
		opacity: 1;
	}
}

@keyframes fade-out {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		/* transform: translateY(-20px); */
	}
}

</style>