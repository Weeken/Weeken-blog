<template lang="html">
  <div class="user">
    <div class="user_avatar">
      <div class="avatar_wrap">
        <input type="file" ref="file" @change="getImg($event)">
        <img v-if="croppedImg" :src="croppedImg" alt="">
        <img v-else :src="userInfo.avatar" alt="">
        <div class="tips">点击修改头像</div>
      </div>
      <div class="avatar_submit" v-if="croppedImg">
        <button type="button" name="button" @click="changeAvatar">提交</button>
      </div>
    </div>
    <vue-cropper
      v-if="showCropper"
      :img="originImg"
      :ratio="1/1"
      :result.sync="croppedImg"
      :imgData.sync="imageData.imageOptions"
      @close="hideCropper"></vue-cropper>

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
      token: '',
      showCropper: false,
      originImg: '',
      croppedImg: '',
      imageData: {
        src: '',
        imageOptions: {}
      },
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
    hideCropper () {
      this.showCropper = false
      this.originImg = ''
    },
    logout () {
      this.Alert.success('退出登录')
      this.$storage.removeItem('user')
      setTimeout(() => {
        this.$router.replace('/note')
        this.$emit('logout')
      }, 2000)
    },
    async resetPassword () {
      let res = await this.$http.resetPassword(this.userInfo.id, this.form)
      if (res) {
        this.Alert.success('修改成功，请重新登录')
        this.$storage.removeItem('user')
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    },
    async changeAvatar () {
      let res = await this.$http.changeAvatar(this.userInfo.id, this.imageData)
      if (res) {
        this.Alert.success('修改成功')
        let newUserInfo = await this.$http.getUserInfo(this.userInfo.id)
        if (newUserInfo) {
          this.$storage.setItem('user', newUserInfo.data)
          this.croppedImg = ''
          location.reload()
        }
      }
    },
    async uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      let res = await this.$http.upload(this.token, formdata)
      if (res) {
        formdata.delete('file')
        this.originImg = this.createNativePic(file)
        this.imageData.src = `http://p0ry9w0d5.bkt.clouddn.com/${res.key}`
        this.showCropper = true
        this.$refs.file.value = ''
      }
    },
    createNativePic (file) {
      let url
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    getImg (e) {
      let file = e.target.files[0]
      const isType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.Alert.error('上传头像图片只能是 JPG 或 PNG 格式!')
      } else if (!isLt2M) {
        this.Alert.error('上传头像图片大小不能超过 2MB!')
      } else {
        this.uploadImg(file)
      }
    },
    async getToken () {
      this.token = (await this.$http.getUpToken()).token
    }
  },
  created () {
    this.getToken()
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
    position: relative;

    .user_avatar{
      position: absolute;
      width: 100px;
      height: 140px;
      right: 80px;
      top: 80px;

      & > .avatar_wrap{
        width: 100%;
        height: 100px;
        background: #f3f3f3;
        background-image: url('../../../assets/user.png');
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        overflow: hidden;
        position: relative;

        & > img{
          width: 100%;
          height: 100%;
          border: 0;
        }

        & > input[type="file"]{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          &:hover ~ .tips{
            transform: translateY(-100%);
          }
        }

        & > .tips{
          position: absolute;
          top: 100%;
          z-index: 5;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.2);
          font: 12px/100px microsoft yahei;
          text-align: center;
          color: #fff;
          transition: all .3s ease;
        }
      }

      & > .avatar_submit{
        position: absolute;
        width: 100%;
        bottom: 0;

        & > button{
          display: block;
          width: 60%;
          height: 30px;
          margin: 0 auto;
          font: 14px/30px microsoft yahei;
          background: #2196f3;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
        }
      }
    }

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
