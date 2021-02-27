<template>
  <div class="home">
    <FormMain/>
    <ParserResult/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormMain from '@/components/core/FormMain.vue'
import ParserResult from '@/components/core/ParserResult.vue'

export default {
  name: 'Home',
  components: {
    FormMain,
    ParserResult
  }
}
</script>
