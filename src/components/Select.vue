<template>
  <div class="field">
    <div :class="error != '' ? 'label-and-message' : 'label'">
      <label :class="error != '' ? 'error-label': ''">{{ label }}</label>
      <div class="error-label">{{ error }}</div>
    </div>
    <div class="input">
      <select name="name" class="select" v-on:change="change">
        <option>{{placeholder}}</option>
        <option v-for="option in options" v-bind:key="option" :value="option.id">{{option.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vSelect from 'vue-select'

  Vue.component('v-select', vSelect)

  export default {
    name: 'Input',
    props: {
      label: String,
      type: String,
      name: String,
      placeholder: String,
      error: String,
      options: []
    },
    data() {
      return {
        category: null,
      }
    },
    methods: {
      change(event) {
        console.log(event)
        this.$emit('change', this.name, event.target.value)
      }
    },
  }
</script>

<style scoped>
  .field {
    display: grid;
    justify-content: center
  }
  .input {
    font-size: 12px;
    width: 251px;
    height: 38px;
    margin-bottom: 10px;
    padding-left: 12.5px;
    padding-right: 12.5px;
    border-radius: 20px;
    border: 1px solid grey;
    text-align: left
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

  .select {
    appearance: none;
    padding: 5px;
    padding-left: 0;
    border: none;
    width: 251px;
    height: 38px;
    background: white;
  }

  .select:focus {
    outline-width: 0;
  }

  .option {
    margin:0px !important;
    padding: 10;
  }
</style>