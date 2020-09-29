<template>
    <ul>
        <CheckboxList
            v-for="checkbox of tree"
            :checkbox="checkbox"
            :key="checkbox.id"
        />
    </ul>
    
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CheckboxList from "@/components/CheckboxList.vue";


    @Component({
        props:{
            tree: {
                type: Array,
                required: true,
            }
        },
        name: 'CheckboxTree',
        components: {
            CheckboxList,
        },
    })

    export default class CheckboxTree extends Vue {}
</script>

<style scoped>

</style>
