<template lang="html">
  <div class="note_details clear">
    <transition name="translateY" mode="out-in">
      <div class="wrap" v-if="note._id">
        <div class="note_wrap">
          <h1 class="note_title">{{note.title}}</h1>
          <div class="note_info">
            <span style="flex: 2;">分类：{{note.tag}}</span>
            <span style="flex: 2;">浏览：{{note.read}}</span>
            <span style="flex: 2;">赞：{{note.like}}</span>
            <span style="flex: 4;">创建时间：{{note.time | time}}</span>
          </div>
          <div class="note_content" v-html="note.content" id="noteContent"></div>
          <div class="like_note">
            <transition name="scale" mode="out-in">
              <div key="no" class="no" v-if="!like" @click="likeNote"></div>
              <div key="yes" class="yes" v-else @click="dislikeNote"></div>
            </transition>
            <transition name="fade" mode="out-in">
              <div key="no" class="text" v-if="!like">赞一下</div>
              <div key="yes" class="text" v-else>谢谢你的赞</div>
            </transition>
          </div>
        </div>
        <div class="back"><span @click="back">&lt; 返回列表</span></div>
      </div>
    </transition>

    <transition name="translateY" mode="out-in">
      <div class="hot" v-if="hotNotes.length > 0">
        <h3>热门笔记</h3>
        <div class="hot_note" v-for="item in hotNotes" :key="item._id">
          <h4 @click="readNote(item._id)">{{item.title}}</h4>
          <div class="hot_note_info">
            <span><i class="read"></i>{{item.read}}</span>
            <span><i class="like"></i>{{item.like}}</span>
            <span><i class="comment"></i>{{item.comment}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Format from '../../../lib/format'
export default {
  name: 'noteDetails',
  props: ['userInfo'],
  data () {
    return {
      like: false,
      // user: {},
      note: {},
      hotNotes: []
    }
  },
  filters: {
    time (stamp) {
      return Format.formatDate(stamp, '-', 'minute')
    }
  },
  methods: {
    back () {
      this.$router.push('/note')
    },
    readNote (id) {
      this.note = {}
      this.getNoteDetails(id)
    },
    async getNoteDetails (id) {
      let res = await this.$http.getNoteDetails(id)
      if (res) {
        this.note = res.data
        if (this.userInfo) {
          this.like = this.note.likeUserId.includes(this.userInfo.id)
        } else {
          this.like = false
        }
        setTimeout(() => {
          this.$prism.highlightAllUnder(document.querySelector('#noteContent'))
        }, 500)
      }
    },
    async getHotNotes () {
      let res = await this.$http.getHotNotes()
      if (res) {
        this.hotNotes = res.data
      }
    },
    async likeNote () {
      if (!this.userInfo) {
        this.Alert.error('请先登录')
        return
      } else {
        let res = await this.$http.likeNote({
          noteId: this.$route.query.id,
          userId: this.userInfo.id
        })
        if (res) {
          this.like = true
          this.getNoteDetails(this.$route.query.id)
        }
      }
    },
    async dislikeNote () {
      if (!this.userInfo) {
        this.Alert.error('请先登录')
        return
      } else {
        let res = await this.$http.dislikeNote({
          noteId: this.$route.query.id,
          userId: this.userInfo.id
        })
        if (res) {
          this.like = false
          this.getNoteDetails(this.$route.query.id)
        }
      }
    }
  },
  created () {
    this.getNoteDetails(this.$route.query.id)
    this.getHotNotes()
  }
}
</script>

<style lang="less">
@import '../../../css/content.less';
@font-face {
  font-family: "icon";
  src: url("../../../assets/font/icon.woff");
  font-display: swap;
}
.note_details{
  width: 1020px;
  margin: 30px auto;

  .wrap{
    float: left;
    width: 700px;

    .back{
      height: 40px;
      border-radius: 5px;
      padding: 0 30px;
      font: 200 14px/40px microsoft yahei;
      color: #2196f3;
      background: #fff;
      margin-top: 10px;
      text-align: right;
      & > span{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }

    .note_wrap{
      width: 100%;
      border-radius: 5px;
      padding-bottom: 20px;
      background: #fff;

      .note_title{
        width: 100%;
        height: 80px;
        padding: 0 20px;
        font: 700 24px/80px microsoft yahei;
        color: #2196f3;
        // border-bottom: 1px solid #eee;
      }

      .note_info{
        height: 40px;
        padding: 0 20px;
        margin-bottom: 30px;
        display: flex;

        & > span{
          text-align: center;
          font: 300 14px/40px microsoft yahei;
          color: #666;
        }
      }

      .note_content{
        padding: 20px;
        .content;
      }

      .like_note{
        width: 100%;
        height: 80px;
        text-align: center;
        & > .no, & > .yes{
          width: 50px;
          height: 50px;
          margin: 0 auto;
          cursor: pointer;
          font: 200 40px/50px icon;
          &:before{
            content: "\e9da";
          }

          &.no{
            color: #eee;
          }
          &.yes{ color: #e91e63; }
        }

        .text{
          font: 300 16px/30px mircosoft yahei;
          color: #ccc;
        }
      }
    }
  }

  .hot{
    float: left;
    width: 300px;
    min-height: 500px;
    margin-left: 20px;
    padding-bottom: 10px;
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
