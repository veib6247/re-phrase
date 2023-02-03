<script setup>
  const textInput = ref('')
  const isLoading = ref(false)
  const aiResponse = ref('')

  /**
   *
   */
  const submitInput = async () => {
    isLoading.value = true
    aiResponse.value = ''

    try {
      const { data } = await useFetch('/api/rephrase', {
        query: { userInput: textInput.value },
      })

      // remove any extra '\n' or '\r'
      const cleanString = data.value.replace(/[\n\r]/g, '')

      aiResponse.value = cleanString
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

        <button
          class="btn-primary btn w-full uppercase"
          :class="{ loading: isLoading }"
          @click="submitInput">
          Rephrase
        </button>

        <Transition>
          <div class="form-control" v-if="aiResponse">
            <textarea
              class="textarea-bordered textarea h-72 placeholder-slate-600"
              v-model="aiResponse"></textarea>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* we will explain what these classes do next! */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
