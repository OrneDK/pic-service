# pictrue-bed

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 开发指南

### 组件数据

组件的 data 必须是一个函数。

```
export default {
  data() {
    return {
      foo: 'bar',
    };
  },
};

```

### 单文件组件文件名称

单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。

```
my-component.vue
MyComponent.vue
```

### 紧密耦合的组件名

```
components/
|- TodoList.vue
|- TodoListItem.vue
└─ TodoListItemButton.vue

```

### 自闭合组件

在单文件组件中没有内容的组件应该是自闭合的。

```
<my-component />
```

### Prop 名大小写

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板中应该始终使用 kebab-case。

```
export default {
  props: {
    greetingText: String,
  },
};


<welcome-message greeting-text="hi" />

```

### 指令缩写

指令缩写，用 : 表示 v-bind: ，用 @ 表示 v-on:

```
<input :value="value" @input="onInput" />
```

### Props 顺序

标签的 Props 应该有统一的顺序，依次为指令、属性和事件。

```
<my-component
  v-if="if"
  v-show="show"
  v-model="value"
  ref="ref"
  :key="key"
  :text="text"
  @input="onInput"
  @change="onChange"
/>

```

### 组件选项的顺序

组件选项应该有统一的顺序。

```
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
};

```

### 组件选项中的空行

组件选项较多时，建议在属性之间添加空行。

```
export default {
  computed: {
    formattedValue() {
      // ...
    },

    styles() {
      // ...
    },
  },

  methods: {
    onInput() {
      // ...
    },

    onChange() {
      // ...
    },
  },
};

```

### 单文件组件顶级标签的顺序

单文件组件应该总是让顶级标签的顺序保持一致，且标签之间留有空行。

```
<template>
  ...
</template>

<script>
  /* ... */
</script>

<style>
  /* ... */
</style>

```
