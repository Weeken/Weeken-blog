<template>
  <div class="body">
    <div class="nav clear">
      <div class="logo"><router-link to="/home">Weeken</router-link></div>
			<ul>
				<li v-for="item in tabs" :key="item.path">
          <router-link :to="item.path" :class="$route.path.includes(item.path) ? 'router-link-active' : ''">{{item.name}}</router-link>
        </li>
			</ul>
		</div>
    <transition name="fade" mode="out-in">
      <back-to-top v-if="showBackToTop"></back-to-top>
    </transition>
		<transition name="fade" mode="out-in">
      <div class="view"><router-view></router-view></div>
		</transition>
    <my-footer></my-footer>
  </div>
</template>

<script>
// const MyFooter = resolve => require(['./footer'], resolve)
import MyFooter from './footer'
import BackToTop from './backToTop/backToTop'
export default {
  name: 'Navigator',
  components: { MyFooter, BackToTop },
  data () {
    return {
      showBackToTop: false,
      tabs: [
        { path: '/memo', name: '便笺' },
        { path: '/note', name: '笔记' },
        { path: '/about', name: '关于' }
      ]
    }
  },
  mounted () {
    window.onscroll = () => {
      let osTop = document.documentElement.scrollTop|| document.body.scrollTop
      this.showBackToTop = osTop >= 1000
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
  z-index: 1000;

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
}

.view{
  margin-top: 70px;
  overflow: auto;
}
</style>
