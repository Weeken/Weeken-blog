<template lang="html">
  <div v-show="showPage">
    <div class="banner">
      <h3>If you want to understand a knowledge, the first to admit his own ignorance.</h3>
      <div class="card1"><img src="../../../assets/card1.jpg" alt=""></div>
      <div class="card2"><img src="../../../assets/card2.jpg" alt=""></div>
      <div class="card3"><img src="../../../assets/card3.jpg" alt=""></div>
      <div class="card4"><img src="../../../assets/card4.jpg" alt=""></div>
    </div>

    <div class="memos">

      <div class="heading-wrapper">
        <h2>便笺盒子</h2>
        <div class="hr"></div>
        <div class="sub-heading">什么是知识？它不是别的，是记录下来的经验。——卡莱尔</div>
      </div>

      <div class="memo-wrapper" ref="memoWrapper">

        <!-- <div class="add" @click="addMemos">添加便签</div> -->

        <transition-group name="fade">
          <!-- <button class="memo_button" key="button" v-show="!show" @click="showMemos">点 我</button> -->
          <div v-for="(item, $index) in memos" :key="item._id" ref="memo" class="memo" @click="selectMemo($index)">
            <div class="memo-wrap">
              <div class="side side-front">
                <p class="image">
                  <img :src="item.imageUrl">
                </p>
                <p class="caption">{{item.caption}}</p>
              </div>
              <div class="side side-back">
                <div class="desc">
                  <h6>{{item.title}}</h6>
                  <div v-html="item.desc" class="p_wrap"></div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'components/loading'
let loading
export default {
  name: 'Memo',
  data () {
    return {
      showPage: false,
      memos: [],
      imageUrls: []
    }
  },
  computed: {
    ranges () {
      const range = {
        left: { x: [], y: [] },
        right: { x: [], y: [] }
      }
      const wrap = {
        w: this.$refs.memoWrapper.getBoundingClientRect().width,
        h: this.$refs.memoWrapper.getBoundingClientRect().height
      }
      const memo = {
        w: this.$refs.memo[1].getBoundingClientRect().width,
        h: this.$refs.memo[1].getBoundingClientRect().height
      }
      range.wrap = wrap
      range.memo = memo

      range.left.x = [0 + memo.w / 5, wrap.w / 2 - memo.w / 2]
      range.left.y = [0 + memo.w / 5, wrap.h - memo.w / 5]
      range.right.x = [wrap.w / 2 + memo.w / 2, wrap.w - memo.w / 5]
      range.right.y = range.left.y

      return range
    }
  },
  methods: {
    showMemos () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.selectMemo(this.random([1, this.memos.length - 1]))
        }, 50)
      })
    },
    async getMemos () {
      let res = await this.$http.getMemos()
      if (res) {
        this.memos = res.data
        this.imageUrls = res.data.map(item => {
          return item.imageUrl
        })
        if (this.imageUrls.length > 0) {
          loading = Loading.show()
          this.preloadImg()
        }
      }
    },
    random (range) {
      // 计算随机数
      const max = Math.max(range[0], range[1])
      const min = Math.min(range[0], range[1])
      const diff = max - min
      const number = Math.ceil(Math.random() * diff + min)
      return number
    },
    allocation (arr, derection) {
      arr.map(item => {
        item.style.top = this.random(this.ranges[derection].y) + 'px'
        item.style.left = this.random(this.ranges[derection].x) + 'px'
        item.style.transform = 'rotate(' + this.random([-150, 150]) + 'deg) scale(1)'
      })
    },
    selectMemo (n) {
      const nodes = this.$refs.memo
      const memoCache = nodes.slice(0)
      //
      memoCache.map(item => {
        item.className = 'memo'
      })
      const centerMemo = memoCache.splice(n, 1)[0]
      centerMemo.className += ' center_memo'
      centerMemo.style.top = ''
      centerMemo.style.left = ''
      centerMemo.style.transform = 'rotate(360deg) scale(1.3)'

      const leftMemo = memoCache.slice(0, Math.ceil(memoCache.length / 2))
      const rightMemo = memoCache.slice(Math.ceil(memoCache.length / 2))

      this.allocation(leftMemo, 'left')
      this.allocation(rightMemo, 'right')
    },
    preloadImg () {
      let num = 0
      let len = this.imageUrls.length
      this.imageUrls.map(item => {
        let img = new Image()
        img.src = item
        img.onerror = () => {
          console.log('error')
        }
        img.onload = () => {
          img.onload = null
          num++
          if (num === len) {
            if (loading) loading.hide()
            this.showMemos()
            this.showPage = true
          }
        }
      })
    }
  },
  created () {
    this.getMemos()
  }
}
</script>

<style lang="less">

@font-face {
  font-family: "Pacifico";
  src: url("../../../assets/font/Pacifico-Regular.ttf");
  font-display: swap;
}
.banner{
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  background: #fff;

  h3{
    width: 30%;
    position: absolute;
    top: 34%;
    left: 25%;
    z-index: 10;
    color: #0d47a1;
    text-indent: 2em;
    font: bold 30px/50px Pacifico;
  }

  .card1,.card2,.card3,.card4{
    width: 260px;
    height: 320px;
    padding: 20px;
    background-color: #eee;
    position: absolute;
    box-shadow: -8px 8px 16px rgba(0,0,0,.3);
    img{
      width: 100%;
      height: 100%;
    }
  }

  .card1{
    bottom: -5%;
    right: 20%;
    transform: rotate(-45deg);
  }

  .card2{
    bottom: -14%;
    right: 8%;
    transform: rotate(16deg);
  }

  .card3{
    bottom: 20%;
    right: -2%;
    transform: rotate(-70deg);
  }

  .card4{
    bottom: 4%;
    left: -2%;
    transform: rotate(60deg);
    box-shadow: 8px -8px 16px rgba(0,0,0,.3);
  }
}

.memos{
  padding: 80px 0 0 0;
  background-color: #fff;
  color: #fff;

  .heading-wrapper{
    text-align: center;

    h2{
      font-size: 30px;
      color: #64b5f6;
    }
    .hr{
      height: 2px;
      margin: 20px auto;
      background: #64b5f6;
      width: 40%;
    }
    .sub-heading{
      margin: 30px 0;
      color: #64b5f6;
    }
  }
  .memo-wrapper{
    position: relative;
    width: 100%;
    height: 800px;
    background-color: #ddd;
    box-shadow: inset 0 0 16px rgba(0,0,0,.4);
    overflow: hidden;
    perspective: 800px;

    .memo{
      width: 260px;
      height: 320px;
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      margin: -160px 0 0 -130px;
      color: #666;
      cursor: pointer;
      transition: all .6s linear;
      // box-shadow: 0 0 10px rgba(0,0,0,.3);

      .side{
        width: 100%;
        height: 100%;
        background-color: #eee;
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        box-sizing: border-box;
        backface-visibility: hidden;
      }
      .side-front{
        .image{
          width: 100%;
          height: 250px;
          line-height: 250px;
          overflow: hidden;

          img{ width: 100%; height: 100%; }
        }
        .caption{
          width: 100%;
          height: 50px;
          text-align: center;
          font: bold 13px/50px "Time New Roman";
          overflow: hidden;
        }
      }
      .side-back .desc{
        .p_wrap > p,.p_wrap > ul,.p_wrap > ol{
           margin-bottom: 5px;
           font-size: 12px;
           line-height: 16px;
        }
        .p_wrap > ul {
          padding-left: 20px;
          & > li { list-style: disc; }
        }
        .p_wrap > ol {
          padding-left: 20px;
          & > li { list-style: decimal; }
        }
        h6{
          margin-bottom: 15px;
          font: bold 14px/1 'weiruanyahei';
        }
      }
      .memo-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: all .5s ease;
        transform-origin: 0% 50%;


        .side-front{ transform: rotateY(0deg); }
        .side-back{ transform: rotateY(180deg); }
      }
    }

    .center_memo{
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -160px 0 0 -130px;
      z-index: 999;
      box-shadow: none;

      .memo-wrap{
        transform: translate(0px,0px) rotateY(0deg);
        box-shadow: 0 0 10px rgba(0,0,0,.3);
      }

      &:hover{
        .memo-wrap{
          transform: translate(260px,0px) rotateY(180deg);
          box-shadow: 0 0 10px rgba(0,0,0,.3);
        }
      }
    }

  }
}
</style>
