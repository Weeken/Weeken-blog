<template lang="html">
  <div class="user_mask" @click.self="closeRegister">
    <form class="form">
      <h3>注  册</h3>
      <div class="field">
        <input type="email" placeholder="邮箱" v-model.trim="registerForm.email" @blur="$v.registerForm.email.$touch()">
        <span>邮箱</span>
        <ul class="noti_list">
          <li v-if="$v.registerForm.email.$dirty && !$v.registerForm.email.required">请输入邮箱地址</li>
          <li v-if="$v.registerForm.email.$dirty && !$v.registerForm.email.email">请输入正确的邮箱地址</li>
        </ul>
      </div>
      <div class="field">
        <input type="text" placeholder="昵称" v-model.trim="registerForm.name" @input="$v.registerForm.name.$touch()">
        <span>昵称</span>
        <ul class="noti_list">
          <li v-if="$v.registerForm.name.$dirty && !$v.registerForm.name.required">请输入昵称</li>
        </ul>
      </div>
      <div class="field">
        <input type="password" placeholder="密码" v-model.trim="registerForm.password" @blur="$v.registerForm.password.$touch()">
        <span>密码</span>
        <ul class="noti_list">
          <li v-if="$v.registerForm.password.$dirty && !$v.registerForm.password.required">请输入密码</li>
          <li v-if="$v.registerForm.password.$dirty && !$v.registerForm.password.minLength">密码至少6个字符</li>
        </ul>
      </div>
      <div class="field">
        <input type="password" placeholder="确认密码" v-model.trim="registerForm.repeatPassword" @blur="$v.registerForm.repeatPassword.$touch()">
        <span>确认密码</span>
        <ul class="noti_list">
          <li v-if="$v.registerForm.repeatPassword.$dirty && !$v.registerForm.repeatPassword.required">请输入密码</li>
          <li v-if="$v.registerForm.repeatPassword.$dirty && !$v.registerForm.repeatPassword.sameAsPassword">两次密码输入不一致</li>
        </ul>
      </div>
      <!-- <input type="button" value="Forgot Password ?"> -->
      <button class="submit" :disabled="$v.registerForm.$invalid" @click.prevent="register">立即注册</button>
      <div class="form_bottom" @click="gotoLogin">已有账号，去登录</div>
    </form>
  </div>
</template>

<script>
import '../css/form.less'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data () {
    return {
      registerForm: {
        email: '',
        name: '',
        password: '',
        repeatPassword: ''
      }
    }
  },
  validations: {
    registerForm: {
      email: { required, email },
      name: { required },
      password: { required, minLength: minLength(6) },
      repeatPassword: { required, sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    async register () {
      let res = await this.$http.register(this.registerForm)
      if (res) {
        this.Alert.success(res.message)
        this.gotoLogin()
      }
    },
    closeRegister () {
      this.$emit('close', 'Register')
    },
    gotoLogin () {
      this.$emit('goto', 'Login')
    }
  }
}
</script>
