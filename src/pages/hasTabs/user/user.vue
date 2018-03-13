<template lang="html">
  <div class="user">
    <div class="user_field">
      <h2>个人资料</h2>
      <div class="block">
        <label>邮箱：</label><span>{{userInfo.email}}</span>
      </div>
      <div class="block">
        <label>昵称：</label><span>{{userInfo.name}}</span>
      </div>
      <div class="block">
        <label>身份：</label><span>{{userInfo.type}}</span>
      </div>
    </div>
    <div class="user_field">
      <h2>修改密码</h2>
      <div class="block">
        <label>原密码：</label><input type="password" v-model="form.oldPassword" @blur="$v.form.oldPassword.$touch()">
        <span class="error_massage" v-if="$v.form.oldPassword.$dirty && !$v.form.oldPassword.minLength">密码至少6个字符</span>
      </div>
      <div class="block">
        <label>新密码：</label><input type="password" v-model="form.newPassword" @blur="$v.form.newPassword.$touch()">
        <span class="error_massage" v-if="$v.form.newPassword.$dirty && !$v.form.newPassword.minLength">密码至少6个字符</span>
      </div>
      <div class="block">
        <label>确认新密码：</label><input type="password" v-model="form.repeatPassword" @blur="$v.form.repeatPassword.$touch()">
        <span class="error_massage" v-if="$v.form.repeatPassword.$dirty && !$v.form.repeatPassword.sameAsPassword">两次密码输入不一致</span>
      </div>
      <div class="block">
        <button class="submit" :disabled="$v.form.$invalid" @click.prevent="resetPassword">提交</button>
      </div>
    </div>
    <div class="user_field">
      <h2>退出登录</h2>
      <div class="block">
        <button class="logout" @click.prevent="logout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'user',
  props: ['userInfo'],
  data () {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      }
    }
  },
  validations: {
    form: {
      oldPassword: { required, minLength: minLength(6) },
      newPassword: { required, minLength: minLength(6) },
      repeatPassword: { required, sameAsPassword: sameAs('newPassword') }
    }
  },
  methods: {
    logout () {
      this.Alert.success('退出登录')
      this.$storage.removeItem('user')
      setTimeout(() => {
        this.$router.replace('/note')
      }, 2000)
    },
    // async getUserInfo (id) {
    //   let res = await this.$http.getUserInfo(id)
    //   if (res) {
    //     this.userInfo = res.data
    //   }
    // },
    async resetPassword () {
      let res = await this.$http.resetPassword(this.userInfo._id, this.form)
      if (res) {
        this.Alert.success('修改成功，请重新登录')
        this.$storage.removeItem('user')
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    }
  },
  created () {
    // let user = this.$storage.getItem('user')
    // if (user && user.id) {
    //   this.getUserInfo(user.id)
    // } else {
    //   // this.$router.replace('/note')
    // }
  }
}
</script>

<style lang="less" scoped>
  .user{
    width: 800px;
    // height: 800px;
    margin: 30px auto;
    background: #fff;
    border-radius: 5px;
    padding: 20px 30px;

    .user_field{
      margin-bottom: 20px;

      h2{
        width: 100%;
        font: 18px/30px microsoft yahei;
        color: #2196f3;
        margin-bottom: 20px;
      }

      .block{
        width: 100%;
        height: 40px;
        margin-bottom: 10px;

        & > label,& > span,& > input{
          display: inline-block;
          vertical-align: middle;
          font: 14px/40px microsoft yahei;
        }

        & > .error_massage{
          color: red;
          margin-left: 10px;
        }

        & > label{
          margin: 0 20px;
          width: 100px;
        }
        & > input{
          width: 200px;
          height: 40px;
          background: #f3f3f3;
          border-radius: 3px;
          padding: 0 10px;
        }

        & > .submit, & > .logout{
          width: 200px;
          height: 40px;
          background: #2196f3;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
          margin: 0 140px;
          &:hover{
            background-color: #3fa4f4;
          }
          &[disabled="disabled"]{
            cursor: not-allowed;
            background-color: #ccc;
          }
        }
      }
    }
  }
</style>
