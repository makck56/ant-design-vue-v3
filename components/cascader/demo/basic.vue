<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

省市区级联。

## en-US

Cascade selection box for selecting province/city/district.

</docs>
<template>
  <a-cascader v-model:value="value" :options="options" placeholder="Please select">
    <template #option="option">{{ option.label }}+++</template>
    <template #dropdownRender="{ level, options, menuNodes }">
      <v-nodes :vnodes="menuNodes" />
      <div v-if="level === 2" :style="{ display: 'flex', padding: 2 }">
        <a-input />
        <a-button @click="addHandle(options)">添加</a-button>
      </div>
    </template>
  </a-cascader>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
const options: CascaderProps['options'] = ref([
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xihu',
            label: 'West Lake1',
          },
          {
            value: 'xihu',
            label: 'West Lake2',
          },
          {
            value: 'xihu',
            label: 'West Lake3',
          },
          {
            value: 'xihu',
            label: 'West Lake4',
          },
          {
            value: 'xihu',
            label: 'West Lake5',
          },
          {
            value: 'xihu',
            label: 'West Lake6',
          },
          {
            value: 'xihu',
            label: 'West Lake7',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]);
export default defineComponent({
  components: {
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
  setup() {
    const addHandle = (opts: any[]) => {
      opts.push({ label: 'test', value: 0 });
      debugger;
    };
    return {
      addHandle,
      value: ref<string[]>([]),
      options,
    };
  },
});
</script>
