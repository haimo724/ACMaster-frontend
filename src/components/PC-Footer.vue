<template>
    <div class="footer-bg">
        <div class="footer wc1000">
            <ul class="flink">
                <li>
                    <a class="tit" href="javascript:">友情链接: </a>
                </li>
                <li>
                    <a href="https://www.nwpu.edu.cn/">西北工业大学官网</a>
                </li>
                <li>
                    <a href="http://ruanjian.nwpu.edu.cn/">软件学院</a>
                </li>
                <li>
                    <a href="http://tushuguan.nwpu.edu.cn/">图书馆</a>
                </li>
                <li>
                    <a href="https://ecampus.nwpu.edu.cn/main.html#/">翱翔门户</a>
                </li>
            </ul>
            <a href="https://www.nwpu.edu.cn/" class="flogo"><img src="https://www.nwpu.edu.cn/images/logo2.png" alt=""></a>
        </div>
    </div>
</template>

<script>
export default {
    
}

</script>
<style scoped>
.footer-bg {
  /* background-image: url("../assets/pattern.jpg"); */
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 120px;
  margin-top:50px;
  border-top: solid 1px #e5e5e5;
}
.footer-bg .footer {
  height: 72px;
  width: 70%;
  margin: 0 10%;
  padding-top: 10px;
  color: #6F7071;
  font-size: 12px;
  position: relative;
}
.footer-bg .footer .flink {
  height: 34px;
  line-height: 34px;
  overflow: hidden;
  list-style: none;
}
.footer-bg .footer .flink li {
  float: left;
}
.footer-bg .footer .flink li a {
  text-decoration: none;
  display: block;
  height: 34px;
  margin: 0 20px 0 0;
  color: #6F7071;
}
.footer-bg .footer .flink li a:hover,
.footer-bg .footer .flink li a.tit {
  color: #29E6D3;
}
.footer-bg .footer .flogo {
  display: block;
  position: absolute;
  top: 30px;
  right: 20px;
  width: 60px;
  height: 60px;
}
.flogo img{
    vertical-align: middle;
    width:107px;
    height: 21px;
}
</style>