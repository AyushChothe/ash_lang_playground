<template id="app">
  <MonacoEditor class="editor" v-model="code" lang="rust" :options="options" />
  <div>
    <button id="run" @click="runCode">Run</button>
    <pre id="output" v-if="running">Running...</pre>
    <pre id="output" v-else>{{output}}</pre>
  </div>
</template>

<script lang="ts" setup>
import init, { run } from "https://ayushchothe-ashlang.github.io/ash_lang/pkg/ash_lang.js";
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

const running = ref(false);

const options = ref({
  "theme": "vs-dark",
});

let runCode = () => {
  running.value = true;
  try {
    var start = performance.now();
    let res = run(code.value);
    var end = performance.now();
    res += ("\nExecuted in " + (end - start).toPrecision(6) + " ms");
    output.value = res;
  } catch (err) {
    output.value = err;
  }
  running.value = false;
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

.monaco-editor,
.editor {
  width: 100%;
  height: 70vh !important;
}

#output {
  background-color: #3c3c3c;
  color: white;
  width: 100vw;
  height: 30vh;
  font-size: 16px;
  padding: 10px;
}

#run {
  margin: 10px;
  float: right;
  font-size: 18px;
}
</style>