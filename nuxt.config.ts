import {} from "nuxt";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  modules: [
    "nuxt-monaco-editor",
  ],

  vite: {
    plugins: [
      Components({
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
