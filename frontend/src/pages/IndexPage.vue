<template>
  <q-page class="row items-center justify-evenly">
    <ScratchCard />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScratchCard from '../components/ScratchCard.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ScratchCard
  }
});
</script>