import {} from "nuxt";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  modules: [
    "nuxt-monaco-editor",
  ],
  head: {
    script: [{
      src: "https://ayushchothe-ashlang.github.io/ash_lang/pkg/ash_lang.js",
      async: true,
    }],
  },
  vite: {
    plugins: [
      Components({
        // add option {resolveIcons: true} as parameter for resolving problem with icons
        resolvers: [AntDesignVueResolver({ resolveIcons: true })],
      }),
    ],
    ssr: {
      noExternal: [
        "moment",
        "compute-scroll-into-view",
        "ant-design-vue",
        "@ant-design/icons-vue",
      ],
    },
  },
});
