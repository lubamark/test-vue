<template>
    <li>
        <CheckboxItem
            :item="checkbox"
            @check-state="checkState"
        />
        <ul v-if='checkbox.$children'>
            <CheckboxList
                v-for="list of checkbox.$children"
                :checkbox="list"
                :key="list.id"
                @check-children="checkIndeterminate"
            />
        </ul>
    </li>
    
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CheckboxItem from '@/components/CheckboxItem.vue';
    import {CheckboxItemInterface} from "@/interfaces/checkbox-item.interface";

    @Component({
        props:['checkbox'],
        name: 'CheckboxList',
        components: {
            CheckboxItem,
        },
        methods: {
            checkState() {
                this.$emit('check-children');
            },
            checkIndeterminate() {
                if (this.checkbox.$children) {
                    const count = this.checkbox.$children.length;
                    const checked = this.checkbox.$children.filter((el: CheckboxItemInterface) => el.checked);
                    const indeterminate = this.checkbox.$children.filter((el: CheckboxItemInterface) => console.log(el.indeterminate));

                    if (checked.length < count && checked.length > 0 || indeterminate.length) {
                        this.checkbox.indeterminate = true;
                        this.checkbox.checked = false;
                    } else if (checked.length === 0){
                        this.checkbox.indeterminate = false;
                        this.checkbox.checked = false;
                    } else {
                        this.checkbox.indeterminate = false;
                        this.checkbox.checked = true;
                    }
                    this.checkbox.$children.forEach(el => {this.checkState(); })
                }
            }
        }
    })

    export default class CheckboxList extends Vue {}
</script>

<style scoped>

</style>

