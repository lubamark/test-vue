<template>
    <label>
        <input
            type="checkbox"
            v-model="item.checked"
            :id="item.id"
            @change="changeChildrenState"
            :indeterminate.prop="item.indeterminate"
            ref="checkbox"
        >
        {{item.name}}
        {{item}}
    </label>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CheckboxList from '@/components/CheckboxList.vue';
    import {CheckboxItemInterface} from "@/interfaces/checkbox-item.interface";

    @Component({
        props:{
            item: {
                type: Object,
                required: true,
            },
            changed: {
                type: Number,
            }
        },
        name: 'CheckboxItem',
        components: {
            CheckboxList,
        },
        methods: {
            changeChildrenState(arr) {
                if (!arr || !(arr instanceof Array)) {
                    arr = this.item.$children;
                }

                if (arr) {
                    arr.forEach((child: CheckboxItemInterface) => {
                        child.checked = this.item.checked;
                        if (child.$children) {
                            this.changeChildrenState(child.$children);
                        }
                    });
                }

                if (this.item.parentId) {
                    this.$emit('check-state');
                }
            },
        },
    })

    export default class CheckboxItem extends Vue {}
</script>


