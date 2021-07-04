Vue.component('error', {
    props:['status'],
    template: `<div class="error">
            <p v-if="$root.errorstatus"> Произошла ошибка {{ $root.errormessage }}</p>
             </div>`
})
