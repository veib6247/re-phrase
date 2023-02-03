<script setup>
  const textInput = ref('')
</script>

<template>
  <div class="my-10">
    <PageTitle
      title="RE:Phrase"
      sub-title="AI-powered text reconstruction tool." />

    <div class="card bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-teal-300">Input Here</h2>
        <div class="form-control">
          <textarea
            class="textarea-bordered textarea h-56"
            v-model="textInput"></textarea>
        </div>

        <div class="card-actions">
          <button class="btn-primary btn w-full uppercase">Rephrase</button>
        </div>
      </div>
    </div>
  </div>
</template>
