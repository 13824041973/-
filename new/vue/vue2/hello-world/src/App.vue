<template>
  <div>
    <div>foo:{{ foo }}</div>
    <div><button @click="foo -= 1">-foo</button></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      foo: 2,
    };
  },
  rules: {
    foo: {
      validate: (val) => val > 0,
      message: "不可以小于0哦",
    },
  },
  beforeCreate() {
    console.log("Component beforeCreate");
  },
  created() {
    console.log("Component created");
  },
};
</script>
