const filter_el = {
    data () {
        return {
            userSearch:''
        }
    },
    template: `<div>
                    <form action="#" class="search-form" @submit.prevent=$parent.filter>
                        <input type="text" class="search-field" :v-model=userSearch>
                        <button class="btn-search" type="submit">Искать</button>
                    </form>
               </div>`,
}