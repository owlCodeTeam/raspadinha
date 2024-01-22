import { boot } from 'quasar/wrappers';
import { createApp } from 'vue';
import * as VueQrcodeReader from "vue-qrcode-reader";

console.log('before create qrcodereader');

const app = createApp({});
app.use(VueQrcodeReader);

console.log(VueQrcodeReader);