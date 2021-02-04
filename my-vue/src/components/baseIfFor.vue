<script>
// <template>
//   <div class="demo">
//     <ul v-if="items.length">
//       <li
//        v-for="item in items"
//        :key="item"
//       >
//         {{ item }}
//       </li>
//     </ul>
//     <p v-else>No items found</p>
//   </div>
// </template>
export default {
    data() {
        return {
            items: [1, 2, 3, 4, 5]
        }
    },
    render(createElement) {
        if (this.items.length) {
            return createElement('ul', {
                class: 'demo'
            }, [
                this.items.map(item => createElement('li', item))
            ]);
        } else {
            return createElement('p', 'No items found');
        }
    }
}
</script>