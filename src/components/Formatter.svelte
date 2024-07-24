<span class = "text-red-400">{formatter(value, format, includeSuffix)}</span>

<script context = "module">
    
    export let value, format, precision = 2, includeSuffix = false
    // import {toNumber, toDecimal} from '../lib/utilities'
    let result

    export function formatter(value, format, includeSuffix){
        if(!value) return format == 'm2hm' ? '0' : ''
        switch(format){
            // case 'amount':
            //     result = toDecimal(value, format, precision)
            //     break
            // case 'number':
            //     result = toNumber(value, format)
            //     break
            case 'date':
                result = value
                break
            case 'datetime':
                result = value
                break
            case 'm2hm':
                let hour = Math.floor(value / 60)
                result = ( hour == 0 ? '' : hour + '.' ) + ('0'+value % 60).slice(-2) + (includeSuffix ? ( hour == 0 ? ' mns' : ' hrs' ) : '')
                break
            default:
                result = value
        }
        return result

    }

    // $: if(value && format){
    // }
    // export {toNumber, toDecimal}
</script>