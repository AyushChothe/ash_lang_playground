<template id="app">
  <MonacoEditor class="editor" v-model="code" lang="rust" :options="options" />
  <div>
    <button id="run" @click="runCode">Run</button>
    <pre id="output">{{ output }}</pre>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import init, { run } from "https://ayushchothe-ashlang.github.io/ash_lang/pkg/ash_lang.js?url";
import { onMounted } from "vue";

const code = ref(`fn fib(n) {
	if (n<=1) {
		return n;
	}
	return fib(n-1) + fib(n-2);
}

fn main() {
	return fib(25);
}`);

const output = ref('');
const options = ref({
  "theme": "vs-dark",
});

let runCode = async () => {
  try {
    var start = performance.now();
    let res = await run(code.value);
    var end = performance.now();
    res += ("\nExecuted in " + (end - start).toPrecision(6) + " ms");
    output.value = res;
  } catch (err) {
    output.value = err;
  }
}

onMounted(async () => {
  await init();
  runCode();
});

</script>

<style>
*,
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>