<template>
  <div class="footer_wrap">
    <footer>
      <!-- eslint-disable-next-line -->
      <div class="copy"> Copyright &copy Weeken - 2018 </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less">
.footer_wrap{
  // position: absolute;
  // width: 100%;
  // bottom: 0;

  footer{
    background: #7c7f81;
    color: #fff;
    text-align: center;
    min-height: 150px;

    .copy{
      font-size: 16px;
      line-height: 150px;
    }
  }
}
</style>
