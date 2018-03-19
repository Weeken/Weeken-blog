<template lang="html">
  <div class="note clear">
    <div class="list">
      <div class="item_wrap">
        <transition-group name="translateX" mode="out-in">
          <div class="note_item" v-for="item in notes" :key="item._id" v-if="notes.length > 0">
            <div class="info clear">
              <div class="tag">分类：<span>{{item.tag}}</span></div>
              <div class="time">创建时间：{{item.time | time}}</div>
            </div>
            <h2 class="title" @click="readNote(item._id)">{{item.title}}</h2>
            <p class="abstract">{{item.abstract}}</p>
            <div class="item_bottom">
              <div class="part">
                <i class="icon like" :class="{'active': item.likeUserId.includes(userInfo.id)}"></i><span class="number">{{item.like}} 赞</span>
              </div>
              <div class="part">
                <i class="icon comment"></i><span class="number">{{item.comments}} 评论</span>
              </div>
              <div class="part">
                <i class="icon read"></i><span class="number">{{item.read}} 浏览</span>
              </div>
            </div>
          </div>
          <div class="note_item none" key="no_note" v-else>还没有笔记。。。</div>
        </transition-group>
        <div class="pagination_wrap" v-if="pageCount > 1">
          <pagination :page-count="pageCount" :curpage.sync="currentPage" @current-change="pageChange"></pagination>
        </div>
      </div>
    </div>
    <transition name="translateY" mode="out-in">
      <div class="hot" v-if="hotNotes.length > 0">
        <h3>热门笔记</h3>
        <div class="hot_note" v-for="item in hotNotes" :key="item._id">
          <h4 @click="readNote(item._id)">{{item.title}}</h4>
          <div class="hot_note_info">
            <span><i class="read"></i>{{item.read}}</span>
            <span><i class="like"></i>{{item.like}}</span>
            <span><i class="comment"></i>{{item.comments}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Pagination from '../../../components/pagination/pagination'
import Format from '../../../lib/format'
export default {
  name: 'Note',
  props: ['userInfo'],
  components: { Pagination },
  data () {
    return {
      hotNotes: [],
      notes: [],
      pageCount: 0,
      currentPage: 1
    }
  },
  filters: {
    time (stamp) {
      return Format.formatDate(stamp, '-', 'minute')
    }
  },
  methods: {
    readNote (id) {
      this.$router.push({path: '/note/noteDetails', query: {id: id}})
    },
    scrollToTop (i) {
      let timer = setInterval(() => {
        //获取滚动条距离顶部的高度
        let view = document.querySelector('#view')
        let osTop = view.scrollTop
        let speed = Math.floor(-osTop / 5)
        view.scrollTop = osTop + speed

        if(osTop === 0){
          clearInterval(timer)
          this.getNotes(i)
        }
      }, 30)
    },
    pageChange (i) {
      this.scrollToTop(i)
      window.localStorage.setItem('currentPage', i)
    },
    async getNotes (page) {
      let res = await this.$http.getNotes(page)
      if (res) {
        this.notes = res.data
        this.pageCount = res.pageCount
      }
    },
    async getHotNotes () {
      let res = await this.$http.getHotNotes()
      if (res) {
        this.hotNotes = res.data
      }
    }
  },
  created () {
    let page = parseInt(window.localStorage.getItem('currentPage'))
    if (page) {
      this.currentPage = page
      this.getNotes(page)
    } else {
      this.getNotes(this.currentPage)
    }
    this.getHotNotes()
  }
}
</script>

<style lang="less">
@font-face {
  font-family: "icon";
  src: url("../../../assets/font/icon.woff");
  font-display: swap;
}
  .note{
    width: 1020px;
    margin: 30px auto;

    .list{
      float: left;
      width: 700px;
      padding: 0 0 1px;
      position: relative;

      .item_wrap{
        position: absolute;
        width: 100%;

        .note_item{
          width: 100%;
          // height: 250px;
          background: #fff;
          border-radius: 5px;
          margin-bottom: 10px;

          &.none{
            height: 500px;
            font-size: 24px;
            line-height: 500px;
            text-align: center;
            color: #ddd;
            background: #f3f3f3;
          }

          .info{
            width: 100%;
            height: 30px;
            padding: 0 20px;

            .tag,.time{
              float: left;
              width: 50%;
              color: #999;
              font: 200 12px/30px microsoft yahei;
            }
            .tag > span{
              color: #111;
            }
            .time{
              text-align: right;
            }
          }

          .title{
            width: 100%;
            height: 50px;
            padding: 0 20px;
            font: 700 20px/50px microsoft yahei;
            color: #2196f3;
            cursor: pointer;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;

            &:hover{
              color: #60b1f2;
            }
          }

          .abstract{
            padding: 0 20px;
            min-height: 80px;
            color: #333;
            font: 14px/24px microsoft yahei;
            text-indent: 2em;
            text-align: justify;
            margin-bottom: 10px;
            word-wrap: break-word;
            word-break: normal;
          }

          .item_bottom{
            border-top: 1px solid #eee;
            display: flex;
            justify-content: center;
            .part{
              flex: 1;
              height: 40px;
              border-right: 1px solid #eee;
              text-align: center;
              color: #999;

              &:last-child{
                border-right: 0;
              }

              .icon{
                font: 12px/40px icon;
                &.like:before{
                  content: "\e9da";
                }
                &.like.active{
                  color: #e91e63;
                }
                &.comment:before{
                  content: "\e96f";
                }
                &.read:before{
                  content: "\e9d3";
                }
              }
              .number{
                margin-left: 10px;
                font: 200 12px/40px microsoft yahei;
              }
            }
          }
        }

        .pagination_wrap{
          width: 100%;
          height: 40px;
          border-radius: 5px;
          background: #fff;
          margin-bottom: 30px;
        }
      }

    }

    .hot{
      float: left;
      width: 300px;
      min-height: 500px;
      padding-bottom: 10px;
      margin-left: 20px;
      background: #fff;
      border-radius: 5px;

      & > h3{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        text-align: center;
        font: 14px/50px microsoft yahei;
      }

      & > .hot_note{
        width: 100%;
        padding: 10px 20px;

        & > h4{
          font: 16px/20px microsoft yahei;
          color: #333;
          cursor: pointer;
          &:hover{
            color: #60b1f2;
          }
        }

        & > .hot_note_info{
          width: 100%;
          height: 20px;
          span{
            color: #ddd;
            font: 200 12px/20px microsoft yahei;
            margin-right: 20px;
            & > i{
              font: 200 12px/20px icon;
              margin-right: 10px;
              &.read:before{
                content: "\e9d3";
              }
              &.like:before{
                content: "\e9da";
              }
              &.comment:before{
                content: "\e96f";
              }
            }
          }
        }
      }
    }
  }
</style>
