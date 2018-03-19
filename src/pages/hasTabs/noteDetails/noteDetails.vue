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
              <div key="no" class="no" v-if="!like" @click="tuggleLike('like')"></div>
              <div key="yes" class="yes" v-else @click="tuggleLike('dislike')"></div>
            </transition>
            <transition name="fade" mode="out-in">
              <div key="no" class="text" v-if="!like">赞一下</div>
              <div key="yes" class="text" v-else>谢谢你的赞</div>
            </transition>
          </div>
        </div>

        <div class="back"><span @click="back">&lt; 返回笔记列表</span></div>

        <div class="comment_list" id="commentList">
          <div class="comment_top">{{note.comments}} 个评论</div>

          <div class="comment_item clear" v-for="comment in commentList" :key="comment._id">
            <div class="comment_left">
              <div class="comment_avatar"><img :src="comment.userAvatar" alt=""></div>
            </div>
            <div class="comment_right">
              <div class="comment_user">{{comment.userName}}</div>
              <div class="comment_time">时间：{{comment.time | time}}</div>
              <div class="comment_content">
                <div v-html="comment.content"></div>
              </div>

              <div class="comment_discuss" v-if="comment.replies > 0">
                回复：({{comment.replies}}条)
                <span v-if="!showDiscussId.includes(comment._id)" @click="showDiscuss(comment._id)">展开</span>
                <span v-else @click="hideDiscuss(comment._id)">收起</span>
              </div>
              <!-- 第一个回复 -->
              <div v-else class="comment_first_reply">
                <span v-if="userInfo.id && userInfo.id !== comment.userId && showFirstReplyId !== comment._id" @click="showReply('FirstReply', comment._id, comment.userId)">回复</span>
                <span v-if="showFirstReplyId === comment._id" @click="hideReply('FirstReply', comment._id)">收起</span>
                <span v-if="showFirstReplyId === comment._id" @click="addReply">提交</span>
              </div>
              <transition name="scaleY" mode="out-in">
                <textarea class="discuss_first_reply_content" v-if="showFirstReplyId.includes(comment._id)" v-model="reply.content"></textarea>
              </transition>
              <!-- 回复列表 -->
              <transition name="scaleY" mode="out-in">
                <div class="discuss_list" v-if="showDiscussId.includes(comment._id)">
                  <div class="discuss_item" v-for="item in comment.replyList" :key="item._id">
                    <p class="discuss_user"><span style="color: #2196f3;">{{item.replierName}}</span> 回复 @<span style="color: #2196f3;">{{item.observerName}}</span>：</p>
                    <span class="discuss_time">时间：{{item.time | time}}</span>
                    <p class="discuss_content">{{item.content}}</p>
                    <p class="discuss_reply">
                      <span v-if="userInfo.id && userInfo.id !== item.replierId && showReplyId !== item._id" @click="showReply('Reply', comment._id, item._id, item.replierId)">点击回复</span>
                      <span v-if="showReplyId === item._id" @click="addReply">点击提交</span>
                      <span v-if="showReplyId === item._id" @click="hideReply('Reply')">收起</span>
                    </p>
                    <transition name="scaleY" mode="out-in">
                      <textarea class="discuss_reply_content" v-if="showReplyId === item._id" v-model="reply.content"></textarea>
                    </transition>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div class="commemt_editor" v-if="userInfo.id && showEditor">
            <vue-wangeditor id="commentEditor" :options="editorOptions" v-model="comment.content" :text.sync="commentText" :init-content="initContent"></vue-wangeditor>
            <div class="comment_submit clear">
              <p>本站采用的是PrismJs进行代码高亮，若评论要插入代码，请写上类名：<br>language-html / language-css / language-less / language-js.</p>
              <button type="button" name="button" :disabled="!commentText" @click="addComment">提交</button>
            </div>
          </div>
          <div class="no_user" v-else>评论请登录</div>
        </div>

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
            <span><i class="comment"></i>{{item.comments}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import defaultUser from "../assets/user.png"
import Format from '../../../lib/format'
import commentEditorOption from '../../../mixins/comment-editor-option'
export default {
  name: 'noteDetails',
  props: ['userInfo'],
  mixins: [commentEditorOption],
  data () {
    return {
      like: false,
      showEditor: false,
      showDiscussId: [],
      showReplyId: '',
      showFirstReplyId: '',

      note: {},
      hotNotes: [],

      commentList: [],
      commentText: '',
      initContent: '',
      comment: {
        userId: '',
        noteId: '',
        content: ''
      },

      reply: {
        commentId: '',
        observerId: '',
        replierId: '',
        content: ''
      }
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
      this.showEditor = false
      this.note = {}
      this.commentList = []
      this.$route.query.id = id
      this.getNoteDetails(id)
      this.getComments(id)
    },
    // 显示/隐藏评论
    showDiscuss (id) {
      if (!this.showDiscussId.includes(id)) {
        this.showDiscussId.push(id)
      }
    },
    hideDiscuss (id) {
      if (this.showDiscussId.includes(id)) {
        this.showDiscussId.splice(this.showDiscussId.indexOf(id), 1)
      }
    },
    // 显示/隐藏回复
    showReply (type, commentId, replyId, observerId) {
      this[`show${type}Id`] = replyId
      this.reply.commentId = commentId
      this.reply.observerId = observerId
      this.reply.replierId = this.userInfo.id
    },
    hideReply (type) {
      this[`show${type}Id`] = ''
      this.reply.commentId = ''
      this.reply.observerId = ''
      this.reply.replierId = ''
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
          this.showEditor = true
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
    async getComments (noteId) {
      let res = await this.$http.getComments(noteId)
      if (res) {
        this.commentList = res.data
        setTimeout(() => {
          this.$prism.highlightAllUnder(document.querySelector('#commentList'))
        }, 500)
      }
    },
    async addComment () {
      if (this.userInfo.id) {
        this.comment.userId = this.userInfo.id
        this.comment.noteId = this.$route.query.id
      }
      let res = await this.$http.addComment(this.comment)
      if (res) {
        this.Alert.success('评论成功')
        this.initContent = '<p><br></p>'
        this.getComments(this.$route.query.id)
        setTimeout(() => {
          this.initContent = ''
        }, 200)
      }
    },
    async tuggleLike (type) {
      if (!this.userInfo.id) {
        this.Alert.error('请先登录')
        return
      } else {
        let params = {
          noteId: this.$route.query.id,
          userId: this.userInfo.id
        }
        let res = await this.$http[`${type}Note`](params)
        if (res) {
          this.getNoteDetails(this.$route.query.id)
          this.like = type === 'like'
        }
      }
    },
    async addReply () {
      let res = await this.$http.addReply(this.reply)
      if (res) {
        this.Alert.success('回复成功')
        this.hideReply('Reply')
        this.hideReply('FirstReply')
        this.getComments(this.reply.commentId)
      }
    }
  },
  created () {
    this.getNoteDetails(this.$route.query.id)
    this.getHotNotes()
    this.getComments(this.$route.query.id)
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

    .comment_list{
      border-radius: 5px;
      padding: 20px;
      background: #fff;
      margin-top: 10px;

      .comment_top{
        font: 16px/40px microsoft yahei;
        color: #2196f3;
        border-bottom: 1px solid #eee;
      }

      .comment_item{
        min-height: 80px;
        margin: 10px 0;
        padding: 5px;
        border-bottom: 1px solid #eee;

        .comment_left{
          float: left;
          height: 100%;
          .comment_avatar{
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #ddd;
            background-image: url('../../../assets/user.png');
            background-repeat: no-repeat;
            background-size: cover;

            & > img{
              width: 100%;
              height: 100%;
            }
          }
        }

        .comment_right{
          float: left;
          width: 600px;
          position: relative;

          .comment_user{
            font: 14px/40px microsoft yahei;
            color: #2196f3;
          }

          .comment_time{
            position: absolute;
            top: 0;
            right: 5px;
            font: 200 12px/40px microsoft yahei;
            color: #aaa;
          }

          .comment_content{
            font: 14px/24px microsoft yahei;
          }

          .comment_discuss{
            height: 30px;
            margin-top: 5px;
            font: 14px/30px microsoft yahei;

            & > span{
              color: #2196f3;
              margin-left: 10px;
              cursor: pointer;
              &:hover{
                text-decoration: underline;
              }
            }

          }

          .comment_first_reply{
            & > span{
              color: #2196f3;
              cursor: pointer;
              margin-right: 10px;
              font: 14px/30px microsoft yahei;
              &:hover{
                text-decoration: underline;
              }
            }
          }

          .discuss_first_reply_content{
            width: 100%;
            height: 80px;
            padding: 5px;
            border: 1px solid #eee;
            font: 12px/24px microsoft yahei;
          }

          .discuss_list{
            width: 580px;
            padding: 10px;
            margin: 5px 0 5px 20px;
            background-color: #f2f2f2;
            border-radius: 5px;

            .discuss_item{
              min-height: 72px;
              font: 12px/24px microsoft yahei;
              border-bottom: 1px solid #ddd;
              position: relative;

              .discuss_user{
                font-size: 14px;
              }

              .discuss_time{
                position: absolute;
                top: 0;
                right: 5px;
                font: 200 12px/24px microsoft yahei;
                color: #aaa;
              }

              .discuss_reply{
                text-align: right;
                & > span{
                  color: #2196f3;
                  margin-right: 10px;
                  cursor: pointer;
                  &:hover{
                    text-decoration: underline;
                  }
                }
              }

              .discuss_reply_content{
                width: 100%;
                height: 60px;
                padding: 5px;
              }
            }
          }
        }
      }

      .commemt_editor{
        margin-top: 20px;
        font-size: 14px;
      }

      .comment_submit{

        & > p{
          float: left;
          width: 500px;
          margin-top: 10px;
          font: 200 12px/20px microsoft yahei;
          color: #aaa;
        }
        & > button{
          float: right;
          width: 120px;
          height: 40px;
          border: 0;
          margin: 10px 10px 0 0;
          cursor: pointer;
          color: #fff;
          border-radius: 5px;
          background-color: #64b5f6;
          box-shadow: 2px 2px 12px rgba(0,0,0,.3);
          &:hover{
            // background-color: #90caf9;
            box-shadow: 2px 2px 12px rgba(0,0,0,0);
          }
          &[disabled="disabled"]{
            cursor: not-allowed;
            background-color: #ddd;
          }
        }
      }

      .no_user{
        color: #2196f3;
        text-align: center;
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
