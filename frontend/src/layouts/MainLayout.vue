<template>
  <q-layout view="hhh lpr fff">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-h5">
          Raspadinha
        </q-toolbar-title>
        <q-btn 
          dense 
          flat 
          round 
          icon="menu_open" 
          size="lg"
          @click="toggleRightDrawer" 
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>