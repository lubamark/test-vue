<template>
  <div id="app">
    <CheckboxTree v-bind:tree="tree"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CheckboxTree from "@/components/CheckboxTree.vue";
import {CheckboxItemInterface} from "@/interfaces/checkbox-item.interface";

@Component({
  components: {
    CheckboxTree
  },
  data() {
    return {
      treeArray: [
        {id: 1, parentId: null, name: 'Parent 1', checked: true},
        {id: 2, parentId: null, name: 'Parent 2', checked: true},
        {id: 3, parentId: 1, name: 'Child/parent', checked: true},
        {id: 4, parentId: 3, name: 'Child', checked: true},
        {id: 5, parentId: 3, name: 'Child', checked: true},
        {id: 6, parentId: 1, name: 'Child', checked: true},
        {id: 7, parentId: 1, name: 'Child', checked: true},
        {id: 8, parentId: 5, name: 'Child', checked: true},
        {id: 9, parentId: 5, name: 'Child', checked: true},
        {id: 10, parentId: 5, name: 'Child', checked: true},
      ],
    }
  },
  methods: {

  },
  computed: {
    tree: function() {
      const map = new Map(this.treeArray.map((item: CheckboxItemInterface) => [item.id, item]));

      for (const item of map.values()) {
        if (!map.has(item.parentId))continue;

        const parent: CheckboxItemInterface  = map.get(item.parentId);
        if (parent) {
          parent.$children = [...parent.$children || [], item];
        }
      }
      return [...map.values()].filter(item => !item.parentId);
    }
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

  ul {
    list-style: none;
  }
</style>
