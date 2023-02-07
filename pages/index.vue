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
        isLoading.value = true

        const { data } = await useFetch('/api/rephrase', {
          query: { userInput: textInput.value },
        })

        // remove any extra '\n' or '\r'
        // const cleanString = data.value.replace(/[\n\r]/g, '')
        // aiResponse.value = cleanString

        aiResponse.value = data.value.slice(2)

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
          <div
            class="mt-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-600 p-8 hover:from-slate-900 hover:to-slate-500"
            v-if="aiResponse">
            <h1 class="text-2xl font-medium text-white">Open AI</h1>

            <p class="my-1">
              <span class="text-sm font-medium">GPT-3 model: </span>
              <span class="font-mono text-sm">text-davinci-003</span>
            </p>

            <p class="my-1">
              <span class="text-sm font-medium">temperature: </span>
              <span class="font-mono text-sm">0.7</span>
            </p>

            <div class="mt-6">
              <p class="italic text-white">
                {{ aiResponse }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="mt-3 text-center">
      <a
        class="link gap-2 text-sm uppercase"
        href="https://github.com/veib6247/re-phrase"
        target="_blank">
        Github
      </a>
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
