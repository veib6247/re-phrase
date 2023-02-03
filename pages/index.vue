<script setup>
  const textInput = ref('')
  const isLoading = ref(false)
  const isInputInvalid = ref(false)
  const aiResponse = ref('')

  /**
   * submit user provided text input to server for AI processing
   */
  const submitInput = async () => {
    resetStates()

    //
    if (textInput.value !== '') {
      try {
        const { data } = await useFetch('/api/rephrase', {
          query: { userInput: textInput.value },
        })

        // remove any extra '\n' or '\r'
        const cleanString = data.value.replace(/[\n\r]/g, '')
        aiResponse.value = cleanString

        //
      } catch (error) {
        console.error(error)
        isInputInvalid.value = true

        //
      } finally {
        isLoading.value = false
      }
    } else {
      isLoading.value = false
      isInputInvalid.value = true
      aiResponse.value = ''
    }
  }

  /**
   * helper func to reset data
   */
  const resetStates = () => {
    isLoading.value = true
    isInputInvalid.value = false
    aiResponse.value = ''
  }
</script>

<template>
  <div class="my-10">
    <PageTitle title="RE:Phrase" sub-title="AI-powered text rephrasing tool." />

    <div class="card bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-teal-300">Input Here:</h2>
        <div class="form-control">
          <textarea
            class="textarea-bordered textarea h-72 placeholder-slate-600"
            :class="{ 'textarea-error': isInputInvalid }"
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
            <label class="label">
              <span class="label-text text-lg font-medium text-teal-300">
                Open AI Says:
              </span>
            </label>
            <textarea
              class="textarea-bordered textarea h-72 placeholder-slate-600"
              v-model="aiResponse"
              readonly></textarea>
          </div>
        </Transition>

        <div class="text-center">
          <a
            class="link gap-2 text-sm uppercase"
            href="https://github.com/veib6247/re-phrase"
            target="_blank">
            Github
          </a>
        </div>
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
