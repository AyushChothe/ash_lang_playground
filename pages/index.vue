<template>
    <a-layout>
        <a-page-header style="border: 1px solid rgb(235, 237, 240); padding: 5px 25px;" title="AshLang Playground"
            sub-title="Created by Ayush Chothe">
            <template #extra>
                <a-button key="2" @click="runCode"><a href="https://sh0rt.now.sh/ASH" target="_blank">Portfolio</a>
                </a-button>
                <a-button key="2" @click="runCode"><a href="https://github.com/AyushChothe-AshLang/ash_lang"
                        target="_blank">GitHub</a></a-button>
                <a-button key="1" type="primary" @click="runCode">Run</a-button>
            </template>
        </a-page-header>
        <a-layout-content :style="{ padding: '0 25px' }">
            <div :style="{ background: '#ccc', minHeight: '100%' }">
                <MonacoEditor class="editor" v-model="code" lang="rust" :options="options" />
            </div>
            <div class="output" :style="{ background: '#333', minHeight: '20%' }">
                {{ output }}
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            Ayush Chothe © 2022
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import init, { run } from "../ashlang";

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
.monaco-editor,
.editor {
    width: 100%;
    height: 70vh !important;
}



.output {
    background-color: #3c3c3c;
    color: white;
    width: 100%;
    height: 30vh;
    font-size: 16px;
    padding: 10px;
    overflow: auto;
    white-space: pre;
}
</style>
  