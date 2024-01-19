<template>
  <span
    style="width: 700px"
    id="raspadinha"
  >
    <span class="float bg-red">Teste</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';

export default defineComponent({
  name: 'ComponentScrachCard',
  setup() {
    const data = reactive({});

    onMounted(() => {
      const scContainer = document.getElementById('raspadinha');
      const sc = new ScratchCard(scContainer, {
        scratchType: SCRATCH_TYPE.CIRCLE,
        containerWidth: scContainer.offsetWidth,
        containerHeight: 200,
        imageForwardSrc: 'pelicula.png',
        imageBackgroundSrc: 'minion.jpg',
        htmlBackground: '<div></div>',
        clearZoneRadius: 10,
        nPoints: 0,
        pointSize: 0,
        brushSrc: '',
        enabledPercentUpdate: true,
        percentToFinish: 10,
        callback: callbackTeste,
      });
      sc.init();
    });

    function callbackTeste() {
      console.log('Teste');
    }

    return {
      ...toRefs(data),
    };
  },
});
</script>
