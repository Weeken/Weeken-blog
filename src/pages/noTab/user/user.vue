<template lang="html">
  <div class="bg">
		<div class="wrap" ref="wrap">
			<div class="face faceA">
				<div class="A_wrap" :style="{opacity: flag ? 1 : 0}">
					<form class="login">
						<div class="field">
							<input type="eamil" placeholder="Email" v-model.trim="loginForm.email" @input="$v.loginForm.email.$touch()">
              <span>Email</span>
              <div class="noti_list">
                <ul>
                  <li v-if="$v.loginForm.email.$dirty && !$v.loginForm.email.required">请输入邮箱地址</li>
                  <li v-if="$v.loginForm.email.$dirty && !$v.loginForm.email.email">请输入正确的邮箱地址</li>
                </ul>
              </div>
						</div>
						<div class="field">
							<input type="password" placeholder="Password" v-model.trim="loginForm.password" @input="$v.loginForm.password.$touch()">
							<span>Password</span>
              <div class="noti_list">
                <ul>
                  <li v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.required">请输入密码</li>
                  <li v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.minLength">密码至少6个字符</li>
                </ul>
              </div>
						</div>
						<input type="button" value="Forgot Password ?">
						<button :disabled="$v.loginForm.$invalid" @click.prevent="login">LOG IN</button>
					</form>
				</div>
			</div>
			<div class="face faceB">
				<div class="B_wrap" :style="{opacity: flag ? 0 : 1}">
					<form class="signup">
						<div class="field">
							<input type="eamil" placeholder="Email" v-model.trim="registerForm.email" @input="$v.registerForm.email.$touch()">
              <span>Email</span>
              <div class="noti_list">
                <ul>
                  <li v-if="$v.registerForm.email.$dirty && !$v.registerForm.email.required">请输入邮箱地址</li>
                  <li v-if="$v.registerForm.email.$dirty && !$v.registerForm.email.email">请输入正确的邮箱地址</li>
                </ul>
              </div>
						</div>
            <div class="field">
							<input type="text" placeholder="Name" v-model.trim="registerForm.name" @input="$v.registerForm.name.$touch()">
              <span>Name</span>
              <div class="noti_list">
                <ul>
                  <li v-if="$v.registerForm.name.$dirty && !$v.registerForm.name.required">请输入昵称</li>
                </ul>
              </div>
						</div>
						<div class="field">
							<input type="password" placeholder="Password" v-model.trim="registerForm.password" @input="$v.registerForm.password.$touch()">
							<span>Password</span>
              <div class="noti_list">
                <ul>
                  <li v-if="$v.registerForm.password.$dirty && !$v.registerForm.password.required">请输入密码</li>
                  <li v-if="$v.registerForm.password.$dirty && !$v.registerForm.password.minLength">密码至少6个字符</li>
                </ul>
              </div>
						</div>
						<div class="field">
							<input type="password" placeholder="Confirm Password" v-model.trim="registerForm.repeatPassword" @input="$v.registerForm.repeatPassword.$touch()">
							<span>ConfirmPassword</span>
              <div class="noti_list">
                <ul>
                  <li v-if="$v.registerForm.repeatPassword.$dirty && !$v.registerForm.repeatPassword.required">请输入密码</li>
                  <li v-if="$v.registerForm.repeatPassword.$dirty && !$v.registerForm.repeatPassword.sameAsPassword">两次密码输入不一致</li>
                </ul>
              </div>
						</div>
						<button :disabled="$v.registerForm.$invalid" @click.prevent="register">SIGN UP</button>
					</form>
				</div>
			</div>
		</div>
		<button class="button" v-text="flag ? 'SIGN UP': 'LOG IN'" @click="rotation"></button>
	</div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'LoginRegister',
  data () {
    return {
      deg: 0,
      flag: true,
      hidden: 'hidden',
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        name: '',
        password: '',
        repeatPassword: ''
      }
    }
  },
  validations: {
    loginForm: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    },
    registerForm: {
      email: { required, email },
      name: { required },
      password: { required, minLength: minLength(6) },
      repeatPassword: { required, sameAsPassword: sameAs('password') }
    }
  },
  watch: {
    flag (val) {
      val ? this.resetRegisterForm() : this.resetLoginForm()
    }
  },
  methods: {
    async register () {
      let res = await this.$http.register(this.registerForm)
      if (res) {
        this.Alert.success(res.message)
      }
    },
    async login () {
      let res = await this.$http.login(this.loginForm)
      if (res) {
        this.Alert.success(res.message)
      }
    },
    rotation () {
      this.flag = !this.flag
      this.deg += 180
      this.$refs.wrap.style.transform = `rotateY(${this.deg}deg)`
    },
    resetLoginForm () {
      this.loginForm = { email: '', password: '' }
    },
    resetRegisterForm () {
      this.registerForm = { email: '', password: '', repeatPassword: '' }
    }
  }
}
</script>

<style lang="css">
.bg{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #413469;
	perspective: 1000px;
}
.wrap{
	width: 300px;
	height: 300px;
	transform-style: preserve-3d;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -150px;
	margin-left: -150px;
	transition: all .4s ease-in-out;
}

.face{
	position: absolute;
	bottom: 0;
	width: 300px;
	height: 380px;
	color: #fff;
	text-align: center;
	box-shadow: 1px 1px 20px rgba(0,0,0,.4);
}
.faceA{
	transform: translateZ(300px);
}
.faceB{
	transform: rotateY(180deg) translateZ(300px);
}

.A_wrap,.B_wrap{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #7169a6;
  transition: all .4s ease-in-out;
	backface-visibility: hidden;
}
.login,.signup{
	width: 100%;
	height: 100%;
	padding: 30px;
	text-align: center;
	position: relative;
}

.login input{
	width: 100%;
	height: 60px;
	margin-bottom: 30px;
	padding: 0 20px;
	color: #fff;
	background: rgba(255,255,255,.4);
}
.signup input{
  width: 100%;
	height: 40px;
	margin-bottom: 30px;
	padding: 0 20px;
	color: #fff;
	background: rgba(255,255,255,.4);
}
.field{
	position: relative;
}
.noti_list{
  position: absolute;
  left: 124%;
  top: 0;
  /*width: 160px;*/
}
.noti_list li{
  white-space: nowrap;
  padding: 0 20px;
  background: #aaa3d8;
  height: 60px;
  line-height: 60px;
  box-shadow: 5px 5px 20px rgba(0,0,0,.4);
}
.noti_list li:after{
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  width: 0;
  height: 0;
  margin-top: -10px;
  border: 10px solid #aaa3d8;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
}
.login span,.signup span{
	position: absolute;
	left: 0;
	top: 20px;
	z-index: -10;
	padding: 0 10px;
	height: 20px;
	font: 14px/20px "microsoft yahei";
	color: #7169a6;
	background: #fff;
	opacity: 0;
	box-shadow: 0 0 3px rgba(0,0,0,.5);
	transition: all .3s ease-in-out;
}
.login input:focus,.signup input:focus{
	outline: 1px solid #fff;
}
.login input:focus + span,
.signup input:focus + span{
	opacity: 1;
	left: 50%;
	top: -10px;
	z-index: 10;
	transform: translateX(-50%);
}

/* .login input::-moz-placeholder,
.login input:-ms-input-placeholder, */
.login input::-webkit-input-placeholder,
.signup input::-webkit-input-placeholder{
	color: #fff;
}
.login input[type="button"]{
	cursor: pointer;
	opacity: .5;
	outline: none;
}
.login input[type="button"]:hover{
	opacity: .8;
}
.login button,.signup button{
	position: absolute;
	left: 0;
	bottom: 0;
  z-index: 10;
	border: 0;
	outline: none;
	width: 100%;
	height: 80px;
	background: #8ac754;
	color: #fff;
	font: 600 30px "microsoft yahei";
	cursor: pointer;
}

.login button[disabled="disabled"],.signup button[disabled="disabled"]{
  cursor: not-allowed;
  background: #ddd;
}

.button{
	position: absolute;
	left: 50%;
  z-index: 2;
	bottom: 180px;
	width: 120px;
	height: 50px;
	border: none;
	margin-left: -60px;
	/*border-radius: 5px;*/
	outline: none;
	background: #8ac65a;
	font: 500 20px/50px "microsoft yahei";
	text-align: center;
	cursor: pointer;
	color: #fff;
}
.button:hover{
	background: #608a3f;
}

</style>
