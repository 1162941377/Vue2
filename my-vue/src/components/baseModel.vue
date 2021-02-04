<script>
// <template>
//   <div class="demo">
//     <input type="text" v-model="value" />
//     <span>
//       {{ value }}
//     </span>
//   </div>
// </template>
export default {
    data() {
        return {
            value: 'zou'
        }
    },
    render(createElement) {
        const _this = this;
        return createElement('div', {
            class: 'demo'
        }, [
            createElement('input', {
                attrs: {
                    type: 'text',
                    value: _this.value
                },
                on: {
                    input(e) {
                        _this.value = e.target.value;
                    } 
                }
            }),
            <span>{ this.value }</span>
        ]);
    }
};
</script>