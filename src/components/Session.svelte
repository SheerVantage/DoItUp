<div>
    <!-- {data.Name} -->
    {toTime( data.DateTime_Start ) || 'Start'}
    {toTime( data.DateTime_End ) || 'End'}
    {data.Duration || 'Duration'}
    {data.Progress || 'Progress'}
</div>

<script>
    import { toTime } from '../lib/utilities'
    export let data
</script>