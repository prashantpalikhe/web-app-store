<template>
  <div>
    <nuxt />
    <!-- <console /> -->
    <!-- <fps-counter /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Console from '~/components/Console.vue'
import FpsCounter from '~/components/FpsCouter.vue'

@Component({
  components: { FpsCounter, Console }
})
export default class DefaultLayout extends Vue {}
</script>
