<template lang="html">
  <div class="about">
    <div class="about_block">
      <h2>关于我</h2>
      <div class="item">
        <label>名字：</label><span>高伟健</span>
      </div>
      <div class="item">
        <label>年龄：</label><span>1992.05</span>
      </div>
      <div class="item">
        <label>职业：</label><span>前端开发</span>
      </div>
      <div class="item">
        <label>GitHub：</label><span><a href="https://github.com/Weeken" target="_blank">Weeken Gao</a></span>
      </div>
      <div class="item">
        <label>技能：</label><span>HTML5 + CSS3</span>
        <div class="skill">jQuery</div>
        <div class="skill">Vue</div>
        <div class="skill">NodeJS, Koa</div>
        <div class="skill">Mongoose</div>
        <div class="skill">WebPack</div>
      </div>
    </div>
    <div class="about_block">
      <h2>关于网站</h2>
      <div class="item">本站服务端采用 Koa2 + mongoDB 搭建, 客户端采用 Vue2 + vue-router搭建。</div>
      <div class="item">本站分成前台和后台，前台所有访问者都可以浏览，后台仅作者可见。</div>
      <div class="item">主要功能包括: 管理员, 用户, 笔记, 评论, 文章点赞。</div>
      <div class="item">源代码: <a href="https://github.com/Weeken/Weeken-blog" target="_blank">前端代码(Weeken-blog)</a>，<a href="https://github.com/Weeken/blog-management" target="_blank">后端代码(blog-management)</a>，欢迎前来点评，收藏加星。</div>
    </div>
    <div class="about_block">
      <h2>声明</h2>
      <div class="item">本站的文章是我的笔记，若有侵权行为，请联系我删除或更改。</div>
      <div class="item">访客的注册邮箱会保密，邮箱留作有必要联系的时候用。</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less" scoped>
  .about{
    width: 900px;
    // height: 900px;
    background: #fff;
    border-radius: 5px;
    margin: 30px auto;
    padding: 20px;

    .about_block{
      width: 100%;
      margin-bottom: 30px;

      & > h2{
        font: 700 18px/20px microsoft yahei;
        color: #2196f3;
        margin-bottom: 20px;
      }

      .item{
        width: 100%;
        padding-left: 30px;
        font: 300 16px/30px microsoft yahei;

        a{ color: #2196f3; }

        & > label{
          display: inline-block;
          width: 80px;
          font-weight: 300;
        }

        & > span{
          display: inline-block;
          font-weight: 300;
        }

        & > .skill{
          font-weight: 300;
          padding-left: 80px;
        }
      }
    }
  }
</style>
