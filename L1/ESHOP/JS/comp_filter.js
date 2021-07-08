const filter_el = {
    data () {
        return {
            userSearch: ''
        }
    },
    template: `<div>
                    <form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
                        <input type="text" class="search-field" v-model='userSearch'>
                        <button class="btn-search" type="submit">Искать</button>
                    </form>
               </div>`,
}