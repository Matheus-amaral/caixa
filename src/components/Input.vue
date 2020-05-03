<template>
  <div class="field">
    <div :class="error != '' ? 'label-and-message' : 'label'">
      <label :class="error != '' ? 'error-label': ''">{{ label }}</label>
      <div class="error-label">{{ error }}</div>
    </div>
    <input v-if="currency" v-model.lazy="value" v-money="money" :class="error != '' ? 'input error': 'input'" :type="type" :name="name" :placeholder="placeholder" v-on:change="change"/>
    <input v-else :class="error != '' ? 'input error': 'input'" :type="type" :name="name" :placeholder="placeholder" v-on:change="change" :value="value"/>
  </div>
</template>

<script>
  import {VMoney} from 'v-money'

  export default {
    name: 'Input',
    props: {
      label: String,
      type: String,
      name: String,
      value: String,
      placeholder: String,
      error: String,
      currency: Boolean
    },
    data() {
      return {
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
        }
      }
    },
    methods: {
      change(event) {
        this.$emit('change', this.name, event.target.value)
      }
    },
    directives: {money: VMoney}
  }
</script>

<style scoped>
  .field {
    display: grid;
    justify-content: center
  }
  .input {
    width: 278px;
    margin-bottom: 10px;
    padding: 12.5px;
    border-radius: 20px;
    border: 1px solid grey;
  }
  .input:focus {
    outline-width: 0;
  }
  .error {
    border: 1px solid red;
  }
  .error-label {
    color: red;
  }
  .label {
    padding-left: 12.5px;
    text-align: left
  }
  .label-and-message {
    padding-left: 12.5px;
    padding-right: 12.5px;
    display: flex;
    justify-content: space-between
  }
</style>