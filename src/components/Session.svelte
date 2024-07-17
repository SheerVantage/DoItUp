<div>
    <!-- {data.Name} -->
    {data.DateTime_Start || 'Start'}
    {data.DateTime_End || 'End'}
    {data.Duration || 'Duration'}
    {data.Progress || 'Progress'}
</div>

<script>
    export let data
</script>