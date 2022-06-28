<template>
  <div class="footer">
    <div class="detail">
      <h1>
        绘&nbsp&nbsp&nbsp&nbsp画&nbsp&nbsp&nbsp&nbsp展&nbsp&nbsp&nbsp&nbsp示&nbsp&nbsp&nbsp&nbsp网&nbsp&nbsp&nbsp&nbsp站
      </h1>
      <p>
        版权所有：湖南应用技术学院 如需下载或利用画作高清影像请联系作者
        <br />
        <span>©</span>
        <span>湖南应用技术学院 版权所有</span>
        <span>
          京ICP备2020048748号
          《网络文化经营许可证》编号：京网文[2021]0192-049号</span
        >
        <span>京公网安备11010502043494号</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
/* .footer {
  overflow: hidden;
  width: 100%;
  height: 200px;
  margin: 20px 0;
  background-color: #f6f2ee;
} */
.footer {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 300px;
  margin-top: 20px;
  text-align: center;
  background: url(./images/爱上紫禁城5.jpg) no-repeat;
  background-color: #f6f2ee;
}
.footer .detail {
  width: 100%;
  height: 100%;
  background-color: rgba(84, 84, 84, 0.3);
}
.footer h1 {
  position: absolute;
  top: 50%;
  transform: translateX(160%);
  color: #fff;
  text-align: center;
}
.footer p {
  position: absolute;
  bottom: 0;
  transform: translateX(35%);
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.footer p span {
  margin-left: 10px;
  color: #fff;
}
/* .footer h1 {
  color: #ea4a4a;
  margin-left: 605px;
  margin-top: 80px;
} */
</style>