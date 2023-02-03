<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },

    subTitle: {
      type: String,
      required: false,
    },
  })
</script>

<template>
  <div class="my-5">
    <h1 class="text-4xl font-bold text-teal-300">
      {{ title }}
    </h1>

    <p class="text-sm uppercase text-teal-500" v-if="subTitle">
      {{ subTitle }}
    </p>
  </div>
</template>
