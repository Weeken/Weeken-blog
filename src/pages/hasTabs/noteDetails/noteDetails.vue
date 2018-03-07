<template lang="html">
  <div class="note_details clear">
    <div class="note_wrap">
      <h1 class="note_title">{{note.title}}</h1>
      <div class="note_info">
        <span style="flex: 2;">分类：{{note.tag}}</span>
        <span style="flex: 2;">浏览：{{note.read}}</span>
        <span style="flex: 2;">赞：{{note.like}}</span>
        <span style="flex: 4;">创建时间：{{note.time | time}}</span>
      </div>
      <div class="note_content" v-html="note.content" id="noteContent"></div>
    </div>
    <div class="hot">
      <h3>热门笔记</h3>
      <div class="hot_note" v-for="item in hotNotes" :key="item._id">
        <h4>{{item.title}}</h4>
        <div class="hot_note_info">
          <span><i class="like"></i>{{item.like}}</span>
          <span><i class="comment"></i>{{item.comment}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Format from '../../../lib/format'
export default {
  name: 'noteDetails',
  data () {
    return {
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
    async getNoteDetails () {
      let res = await this.$http.getNoteDetails(this.$route.query.id)
      if (res) {
        this.note = res.data
        setTimeout(() => {
          this.$prism.highlightAllUnder(document.querySelector('#noteContent'))
        }, 20)
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
    this.getNoteDetails()
    this.getHotNotes()
  }
}
</script>

<style lang="less">
@import '../../../css/content.less';
.note_details{
  width: 1020px;
  min-height: 900px;
  margin: 30px auto;

  .note_wrap{
    float: left;
    width: 700px;
    background: #fff;
    border-radius: 5px;

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
