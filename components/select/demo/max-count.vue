<docs>
---
order: 3
title:
    zh-CN: 最大选中数量
    en-US: max select count
---

## zh-CN

你可以通过设置 `maxCount` 约束最多可选中的数量，当超出限制时会变成禁止选中状态。



## en-US

You can set the `maxCount` prop to control the max number of items can be selected. When the limit is exceeded, the options will become disabled.

</docs>

<template>
  <a-select
    v-model:value="value"
    mode="tags"
    style="width: 100%"
    placeholder="Max Count"
    :max-count="2"
    :options="options"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    return {
      value: ref([]),
      handleChange,
      options: [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) })),
    };
  },
});
</script>
