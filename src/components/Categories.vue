<template>
  <Menu class="app">
    <div class="texts">
      <h1 class="title light-text">Categorias cadastradas</h1>
      <Button style="width:278" @click="show()" label="Nova categoria"/>
    </div>

    <div class="card-list" v-if="categories.length">
      <Card v-for="category in categories" v-bind:key="category" @click="show(category)">
        {{ category.name }}
      </Card>
    </div>
    <div style="margin-left:20px" v-else>Você não possui nenhum categoria cadastrada!</div>
    <modal name="category" classes="dialog" height="auto">
      <FloatingActionButton @click="$modal.hide('category')" class="close" icon="times"/>
      <p>Informe o nome da nova categoria!</p>
      <Input name="name" label="Nome" placeholder="Nome" @change="change" :value="form.name" :error="error"/>
      <Button label="Cadastrar" :sending="sending" @click="save()"/>
    </modal>
  </Menu>
</template>

<script>
  import Menu from './Menu.vue'
  import Card from './Card.vue'
  import Input from './Input.vue'
  import Button from './Button.vue'
  import FloatingActionButton from './FloatingActionButton.vue'
  import axios from 'axios'

  export default {
    name: 'Categories',
    components: { Menu, Card, Input, Button, FloatingActionButton },
    data() {
      return {
        categories: [],
        form: {},
        error: '',
        sending: false, 
        type: 'insert'
      };
    },
    mounted() {
      axios.get('https://caixa-api.uc.r.appspot.com/api/categories?' + 'filter=' + JSON.stringify({"where":{"user_id":localStorage.getItem('id')}}) + '&access_token='+localStorage.getItem('token')).then(response => {
        this.categories = response.data;
      }).catch(error=> {
        console.log(error);
      });
    },
    methods: {
      show (category) {
        this.type = category ? 'update' : 'insert';
        this.sending = false;
        this.form = {
          id: category ? category.id : null,
          name: category ? category.name : ''
        };
        this.error = '';
        this.$modal.show('category');
      },
      hide () {
        this.$modal.hide('category');
      },
      change(index, value) {
        this.form[index] = value;
      },
      validate() {
        console.log(this.error)
        this.error = this.form['name'] != '' && this.form['name'] ? '' : 'Informe o nome';
        return this.error == '';
      },
      save () {
        this.sending = true;
        if(this.validate()) {
          if(this.type == 'insert') {
            this.form['user_id'] = localStorage.getItem('id');
            axios.post('https://caixa-api.uc.r.appspot.com/api/categories', this.form, {headers: {'content-type': 'application/json'}}).then(response => {
              this.sending = false;
              axios.get('https://caixa-api.uc.r.appspot.com/api/categories?' + 'filter=' + JSON.stringify({"where":{"user_id":localStorage.getItem('id')}}) + '&access_token='+localStorage.getItem('token')).then(response => {
                this.categories = response.data;
              }).catch(error=> {
                console.log(error);
              });
              this.hide();
              console.log(response);
            }).catch(error => {
              this.sending = false;
              console.log(error);
            });
          } else {
            axios.put('https://caixa-api.uc.r.appspot.com/api/categories/'+this.form.id, this.form, {headers: {'content-type': 'application/json'}}).then(response => {
              this.sending = false;
              axios.get('https://caixa-api.uc.r.appspot.com/api/categories?' + 'filter=' + JSON.stringify({"where":{"user_id":localStorage.getItem('id')}}) + '&access_token='+localStorage.getItem('token')).then(response => {
                this.categories = response.data;
              }).catch(error=> {
                console.log(error);
              });
              this.hide();
              console.log(response);
            }).catch(error => {
              this.sending = false;
              console.log(error);
            });
          }
        }
        this.sending = false;
      }
    }
  }
</script>

<style>
  .app {
    text-align: left;
    justify-content: left;
    display: flex;
    min-height: 100vh;
  }

  .card-list {
    display: grid !important;
    grid-template-columns: 300px 300px 300px 300px;
  }

  .title{
    background: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .light-text {
    font-weight: 100;
  }

  .texts {
    margin: 20px;
  }

  .dialog {
    padding: 25px;
    margin: auto !important;
    width: 500px !important;
    top: 0 !important;
    left: 0 !important;
    border-radius: 10px !important;
    text-align: center;
  }

  .close {
    position: absolute
  }

  .vm--container {
    width: 100%;
    height: 100vh;
    display: flex;
  }
</style>