<input type = "file" on:change = {loadContent}/>

<script>
    import {restore} from '../lib/db'
    function loadContent(event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (event) {
            // debugger
            restore(JSON.parse(reader.result))
        };

        let text = reader.readAsText(file);
        // debugger
    
    }
</script>