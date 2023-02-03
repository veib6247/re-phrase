<script setup>
  const textInput = ref('')
  const isLoading = ref(false)

  /**
   *
   */
  const submitInput = async () => {
    isLoading.value = true

    try {
      const { data } = await useFetch('/api/rephrase', {
        query: { userInput: textInput.value },
      })

      console.info(data.value)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
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
            class="textarea-bordered textarea h-72 placeholder-slate-600"
            placeholder="The quick brown fox..."
            v-model="textInput"></textarea>
        </div>

        <div class="card-actions">
          <button
            class="btn-primary btn w-full uppercase"
            :class="{ loading: isLoading }"
            @click="submitInput">
            Rephrase
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
