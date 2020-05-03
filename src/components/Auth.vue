<template>
  <div class="content">
    <Input name="username" placeholder="Usuário" label="Usuário" type="text" @change="change" :error="errors['username']"/>
    <Input name="password" placeholder="Senha" label="Senha" type="password" @change="change" :error="errors['password']"/>
    <Button label="Login" @click="login" :sending="sending"/>
    <p>Ainda não está cadastrado? <a class="link" @click="register">Crie uma conta!</a></p>
  </div>
</template>

<script>
  import Input from './Input.vue'
  import Button from './Button.vue'
  import axios from "axios"
  import moment from "moment"

  export default {
    name: 'Auth',
    components: {
      Input,
      Button
    },
    data: function() {
      return {
        sending: false,
        form: {},
        errors: {
          'username': '',
          'password': ''
        }
      }
    },
    mounted() {
      if(localStorage.getItem('token')) {
        this.$router.push('/home');
      }
    },
    methods: {
      validate() {
        this.errors['username'] = this.form['username'] != '' ? '' : 'Informe o usuário';
        this.errors['password'] = this.form['password'] != ''  ? '' : 'Informe a senha';
        let errors = Object.keys(this.errors).filter((error) => this.errors[error] != '');
        return errors.length == 0;
      },
      change(index, value) {
        this.form[index] = value;
      },
      login() {
        this.sending = true;
        if(this.validate()) {
          axios.post('https://caixa-276110.uc.r.appspot.com/api/users/login', this.form, {headers: {'content-type': 'application/json'}}).then(response => {
            this.sending = false;
            console.log(response);
            localStorage.setItem('token', response.data['id']);
            localStorage.setItem('id', response.data['userId']);
            localStorage.setItem('expires', moment().add(5, 'minutes'));
            this.$router.push('/home');
          }).catch(error => {
            this.sending = false;
            console.log(error);
            this.$swal({
              html:
                'Ocorreu um erro, ' +
                'o usuário ou senha não são válidos!'      
            });
          });
        }
        this.sending = false;
      },
      register() {
        this.$router.push('/register');
      }
    }
  }
</script>

<style>
  .link {
    cursor: pointer;
    font-weight: bold;
    transition: 0.25s
  }

  .link:hover {
    color: #2cb5e8;
  }

  .content {
    margin: auto;
  }

  .swal2-confirm {
    width: 258px !important;
    height: 20 !important;
    margin: auto !important;
    margin-top: 10px !important;
    padding: 10px !important;
    border-radius: 20px !important;
    justify-content: center !important;
    display:flex !important;
    background-color: #1fc8db !important;
    background-image: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    color: white; 
    height: 40px !important;
    font-size: 12px !important;
    font-weight: 300 !important;
    transition: 2s;
  }

  .swal2-confirm:focus {
    outline-width: 0;
  }
</style>
