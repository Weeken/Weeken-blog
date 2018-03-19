<template>
  <div class="body">
    <div class="nav clear">
      <div class="logo"><router-link to="/home">Weeken</router-link></div>
			<ul>
				<li v-for="item in tabs" :key="item.path">
          <router-link :to="item.path" :class="$route.path.includes(item.path) ? 'router-link-active' : ''">{{item.name}}</router-link>
        </li>
			</ul>
      <div class="user clear" v-if="user.id">
        <div class="avatar" @click="gotoUserInfo">
          <img :src="user.avatar || avatar" alt="">
        </div>
        <div class="user_info">
          <p class="name">{{user.name}}</p>
          <p class="type">{{user.type}}</p>
        </div>
      </div>
      <div class="operation" v-else>
        <p class="name" @click="showLogin = true">登 录</p>
        <p class="type" @click="showRegister = true">注 册</p>
      </div>
		</div>
    <transition name="backToTop" mode="out-in">
      <back-to-top v-if="showBackToTop"></back-to-top>
    </transition>
    <div class="view" id="view">
      <transition name="fade" mode="out-in">
        <router-view :user-info="user" @logout="logout"></router-view>
      </transition>
    </div>
    <!-- <my-footer></my-footer> -->
    <transition name="fade" mode="out-in">
      <login v-if="showLogin" @close="closeForm" @goto="goTo" @isLogin="checkLogin"></login>
      <register v-if="showRegister" @close="closeForm" @goto="goTo"></register>
    </transition>
  </div>
</template>

<script>
// import MyFooter from './footer'
import defaultUser from "../assets/user.png"
import Login from './login'
import Register from './register'
import BackToTop from './backToTop/backToTop'
export default {
  name: 'Navigator',
  components: { BackToTop, Login, Register },
  data () {
    return {
      isLogin: false,
      showLogin: false,
      showRegister: false,
      avatar: '',
      showBackToTop: false,
      tabs: [
        { path: '/memo', name: '便笺' },
        { path: '/note', name: '笔记' },
        { path: '/about', name: '关于' }
      ],
      user: {}
    }
  },
  methods: {
    closeForm (name) {
      this[`show${name}`] = false
    },
    goTo (name) {
      this.showLogin = false
      this.showRegister = false
      this[`show${name}`] = true
    },
    gotoUserInfo () {
      if (this.user) {
        this.$router.push({path: '/user'})
      } else {
        this.goTo('Login')
      }
    },
    checkLogin (val) {
      this.user = val
    },
    logout () {
      location.reload()
    }
  },
  created () {
    let user = this.$storage.getItem('user')
    if (user) this.user = user
  },
  mounted () {
    this.avatar = defaultUser
    let view = document.querySelector('#view')
    view.onscroll = () => {
      let osTop = view.scrollTop
      this.showBackToTop = osTop >= 800
    }
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: "Lobster";
  src: url("../assets/font/Lobster-Regular.ttf");
  font-display: swap;
}

.body{
  width: 100%;
  height: 100%;
}

.nav{
  background: #2196f3;
  // box-shadow: 0 0 14px rgba(0,0,0,.4);
  height: 70px;
  width: 100%;
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .logo{
    width: 90px;
    float: left;
    transition: all .2s linear;
    &:hover{
      transform: scale(1.2);
    }
    & > a{
      width: 90px;
      font: 28px/70px Lobster;
      font-family: Lobster !important;
      color: #fff;
    }
  }

  ul{
    float: left;
    margin-left: 30px;

    li{
      display: inline-block;
      float: left;
      width: 60px;
      line-height: 70px;
      margin: 0 20px;
      white-space: nowrap;

      & > a{
        display: block;
        // width: 70px;
        height: 100%;
        font: 700 20px/70px microsoft yahei;
        letter-spacing: 5px;
        color: rgba(255,255,255,.6);
        text-align: center;
        transition: all .2s linear;
        &:hover{
          color: rgba(255,255,255,.8);
        }
        &.router-link-active{
          color: #fff;
          font-size: 26px;
        }
      }

    }
  }

  .user{
    float: right;
    height: 100%;
    .avatar{
      float: left;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #eee;
      margin-top: 10px;
      margin-right: 20px;
      cursor: pointer;

      & > img{
        width: 100%;
        height: 100%;
      }
    }

    .user_info{
      float: left;
      height: 50px;
      margin-top: 10px;
      & > p{
        font: 12px/25px microsoft yahei;
        color: #fff;
      }
    }
  }

  .operation{
    float: right;
    height: 50px;
    margin-top: 10px;
    & > p{
      font: 12px/25px microsoft yahei;
      color: #fff;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}

.view{
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
}
</style>
