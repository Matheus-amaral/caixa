<template>
  <div class="content">
    <FloatingActionButton @click="$router.push('/auth')" icon="arrow-left"/>
    <Input name="username" placeholder="Usuário" label="Usuário" type="text" @change="change" :error="errors['username']"/>
    <Input name="email" placeholder="E-mail" label="E-mail" type="text" @change="change" :error="errors['email']"/>
    <Input name="password" placeholder="Senha" label="Senha" type="password" @change="change" :error="errors['password']"/>
    <Input name="passwordRepeat" placeholder="Senha" label="Repita a senha" type="password" @change="change" :error="errors['passwordRepeat']"/>
    <Button label="Finalizar cadastro" @click="login" :sending="sending"/>
  </div>
</template>

<script>
  import Input from './Input.vue'
  import Button from './Button.vue'
  import FloatingActionButton from './FloatingActionButton.vue'
  import axios from "axios"
  import moment from "moment"

  export default {
    name: 'Register',
    components: {
      Input,
      Button,
      FloatingActionButton
    },
    data: function() {
      return {
        sending: false,
        form: {
          "realm": "admin",
          "emailVerified": true
        },
        errors: {
          'username': '',
          'email': '',
          'password': '',
          'passwordRepeat': ''
        }
      }
    },
    methods: {
      validate() {
        this.errors['username'] = this.form['username'] != '' && this.form['username'] ? '' : 'Informe o usuário';
        this.errors['email'] = this.form['email'] != '' && this.form['email'] ? '' : 'Informe o e-mail';
        this.errors['password'] = this.form['password'] != '' && this.form['password'] ? '' : 'Informe a senha';
        this.errors['password'] = this.form['password'] == this.form['passwordRepeat'] ? '' : 'As senhas devem ser iguais';
        this.errors['passwordRepeat'] = this.form['passwordRepeat'] != '' && this.form['passwordRepeat'] ? '' : 'Informe a senha';
        this.errors['passwordRepeat'] = this.form['password'] == this.form['passwordRepeat'] ? '' : ' ';
        let errors = Object.keys(this.errors).filter((error) => this.errors[error] != '');
        return errors.length == 0;
      },
      change(index, value) {
        this.form[index] = value;
      },
      login() {
        this.sending = true;
        if(this.validate()) {
          axios.post('https://caixa-276110.uc.r.appspot.com/api/users', this.form, {headers: {'content-type': 'application/json'}}).then(response => {
            this.sending = false;
            console.log(response);
            axios.post('https://caixa-276110.uc.r.appspot.com/api/users/login', this.form, {headers: {'content-type': 'application/json'}}).then(response => {
              localStorage.setItem('token', response.data['id']);
              localStorage.setItem('id', response.data['userId']);
              localStorage.setItem('expires', moment().add(5, 'minutes'));
              this.$router.push('/home');
            });
            // this.$router.push('/componente-a');
          }).catch(error => {
            this.sending = false;
            this.$swal({
              html:
                'Ocorreu um erro, ' +
                'o usuário ou o e-mail não são válidos!'      
            });
            console.log(error);
          });
        }
        this.sending = false;
      },
    }
  }
</script>

<style>
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