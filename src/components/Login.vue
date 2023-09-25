<script setup>
import { ref } from 'vue';
import Http from "../api/config";
import { ElMessage } from 'element-plus'
import { routerKey } from 'vue-router';
import{ useRouter, useRoute} from 'vue-router'


const router = useRouter()
const route = useRoute()

const username1 = ref('')// 注册用户名
const password1 = ref('') // 注册密码
const email1 = ref('') // 注册邮箱
const username2 = ref('') // 登陆用户名
const password2 = ref('') // 登陆密码
const class0 = ref('container') //
const class1 = ref('form-container sign-up-container') //
const class2 = ref('form-container sing-in-container') //
const class3 = ref('overlay-pannel overlay-left') //
const class4 = ref('overlay-pannel overlay-right') //

async function SignIn() {
  const res = await Http.post('/api/login/',{
    "username": username2.value,
    "password": password2.value
  });
  if(res.data.status==0){
    ElMessage.success(res.data.message)
    localStorage.setItem('email', res.data.email)
    console.log(res.data.email);
    router.push('/home')
  }else{
    ElMessage.error(res.data.message)
  } 
}
async function SignUp() {
  const res = await Http.post('/api/register/',{
    "username": username1.value,
    "password": password1.value,
    "email":email1.value,
  });
  if(res.data.status==0){
    ElMessage.success(res.data.message)
    class0.value = 'container'
    username2.value=username1.value
  }else{
    ElMessage.error(res.data.message)
  }
}
function showSignIn() {
  // 显示登陆表单
  class0.value = 'container'
}
function showSignUp() {
  // 显示注册表单
  class0.value = 'container right-panel-active'
}

</script>


<template>
  <div class="cctn">
    <div :class="class0" id="container">
      <div :class="class1">
        <!-- 注册 -->
        <form>
          <h1>用户注册</h1>
          <span>您可以选择以上几种方式注册一个您的账户!</span>
          <input v-model="username1" type="text" name='username' placeholder="用户名">
          <input v-model="password1" type="password" name='password' placeholder="密码">
          <input v-model="email1" type="text" name='email' placeholder="请输入注册邮箱" @keyup.enter.native="SignIn">
          <button type='button' @click="SignUp">注册</button>
        </form>
      </div>
      <div :class="class2">
        <!-- 登陆 -->
        <el-image class="diting" src="https://qgdd.oss-cn-hangzhou.aliyuncs.com/img/diting%20(1).png"
                            fit="contain" />
        <form>
          <div style="margin-bottom:30px">

    <h2 style="color: #9aa99a;">谛听DiTing</h2>
            <h2 style="color: #9aa99a;">代码审查与项目分析系统</h2>
</div>
          <h1>用户登陆</h1>
          <input v-model="username2" type="text" name="username" placeholder="用户名">
          <input v-model="password2" type="password" name="password" placeholder="密码" @keyup.enter.native="SignIn">
          <button type='button' @click="SignIn" style="margin-bottom: 50px;">登陆</button>
        </form>
      </div>
      <!-- 侧边栏内容 -->
      <div class="overlay-container">
        <div class="overlay">
          <div :class="class3">
            <h1>已有账号?</h1>
            <p>亲爱的快快点我去进行登陆吧。</p>
            <button class="ghost" @click="showSignIn">登陆</button>
          </div>
          <div :class="class4">
            <h1>没有帐号？</h1>
            <p>点击注册去注册一个属于你的账号吧。</p>
            <button class="ghost" @click="showSignUp">注册</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  

<style scoped>
.diting{
  height: 70px;
  position: absolute;
  left: 20px;
  top:20px;
}
.cctn {
  height: 100%;
  width: 100%;
  background-image: url("picture2.png");
  background-size: cover;
}

@font-face {
  font-family: "iconfont";
  src: url('iconfont.eot?t=1586686594169');
  /* IE9 */
  src: url('iconfont.eot?t=1586686594169#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAXAAAsAAAAACpgAAAV0AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqINIcEATYCJAMUCwwABCAFhG0HSxsTCVGUTk6N7GeCbcthC0Yj1KIppNyyeDhYDLuKion5uIiH7/f7/drnnHtRaZBEG0TR6SQ8u0QaQ4JEq9Qvof3pnn9+V9O2X9rNG7EDMukyitbUN5+yl1zahcvli6U4jcYySF5IEI7h39OSNzLFCBYTkI4sZh3sNDlAX3AOfP0fHEv+sgbLA3qXrgB8euC3x+hVc+OG0w2YxjwNuGWHj1TRtxNoNczUW795WsFUIYgDeWciDWHq0igxpNAsr0NOLeJdpTm9ph8Ab/rvxz/wY0pSZcKdNg6uEzj72fp66bmB2s8vnssz4XYWGTNAIW5CLWcGpmhGl7SGLR5aBlo1S1JZ84yfwc/lYwt6JGsV2fQPLysSURMk7ZAt36OFn0xWCZIaUMmQBuDES5eISpivU2lFN4gtgPgOAnbEpUKzWsy2s4Hu+clzySSymJic9Gm86lHMg8eHOBiNjbuJH8VIOE5mEchpHMZwZYIg42cQ4oXu6jM67xSNw6ePYww4m70GocsSvZswi2vPVmQjCI9sfhcml3TZZy9mcJTvuH7OvlfiAGF8AqeNXdTpua7EJU+euHDOcH0+CcNofD6dIJg4nriF+Szp2JzHna7j1gRz9cI6hYJC+qsH9A9sU2FzkEt8BneFy2XxJGDeOUPONIXNFidxixHRDYT4rQi347hiD3eCR+bxXW9V9+riOKPs69GY+85J9OrPwATBWF5H13o2WJs0RdTrUJQmqVu9oE9n3CDSQnX0FcNcj72MMy3z4BE4QJ5x2lhFlg9Rt/GdZ40zXo21x3hiUZl1jn6h15e4AI3PU9Z3QaWlr09TIJSj37HLvrazOAp0IjQifM3tabZ+KJRSR9XT0lOMKSjkfBzN3s/cQ0MnAoRXUhu8FBJpBR7CkT5a1B8iWXl5MlNP1vIRirSgFYTu96I2hFdCMKXzNF1aUlpKNlr94H+urUzotHbcDmTXh939RmvfHaL6xVY0cvrM/24pyXQ/6r1VkbiSkleiJ3UEw1VMGjO2G/sBeWXH44J//woeF5lgKQL7ryB7PYi2UK5M1TmZhmxEqiQfdKltcMq1vSxGEhe3sqmz0Dw3HFpwR54S5Ha5e//XI3JHxKAIJb+akVjymogHq5/iV+ZAXhcVYE2LSgTay4ZJWIgdhjfR1DSZy8LQXjM5mFp0oacT5oLLGwItUGBQjZeZVn6Dm/CGphy0qA9qNmY98ks+m39hkz4/L6J8tgBL3vteVqBw+0gDaAEbI6AQFKlM86S5WG6ajVJMjk9OX4YcXUu07QEQiiEUoJ8FokBY+dpjW++HLODP4mHJ0h6+yH3m3lWPqIDd0SFItPVYpFBzgkCzdnPNNrWrAPc0nKme8TI8D66qTdfMaAugaEKEoOxvcpPkRzBkvqnIB8Crv6fAE0CjLR8HnTrleP4aeFE++8Uwdhs+YJzQ6+x8af2dzPz/qcRBPvXjU+KF3I22Avk5Z6VUau7py005VL58QVuVd6vMeedWPjSz+7lnatNJ6+j1V45sILXE/pcN2JA0GYKs2QiiYGag0mYOas2WoNW027Pb9FEGorRgyjsDodsHJJ0+Iet2RBTML1QG/UOtOwbQajP6LtlmLARbUxRqSjA6oIhlzSW9Zkb+gtKuDJWTr5M3pFrhR892vfFbqkmVcaDdpr7WHLmSFd4wd6OylNgomVOs7UzrJnAcHvZMdiwrYNYoJKSRBIocICEm1bg6WWO+n18gqU4ppGLafhg3iNISsyOPzU2BuJXUqdq2pbS1lfJpCnGI33KlCrohEynFiISa8FU5EtNsWY5QI+DQOJ5WYtcvq5Yx9+LpKDylihQ5SlRRS9fP7JFEJK1YNoextXQv6vGh0FkXAQA=') format('woff2'),
    url('iconfont.woff?t=1586686594169') format('woff'),
    url('iconfont.ttf?t=1586686594169') format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('iconfont.svg?t=1586686594169#iconfont') format('svg');
  /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-qq:before {
  content: "\e60a";
}

.icon-weibo-copy:before {
  content: "\e653";
}

.icon-weixin:before {
  content: "\e62b";
}

.icon-github:before {
  content: "\e63a";
}

* {
  margin: 0;
  padding: 0;
  /*标准盒子 */
  box-sizing: border-box;
}

#alertmess {
  position: fixed;
  top: 30px;
  left: 40%;
  right: 40%;
  padding: 20px 30px;
  background: rgba(0, 0, 0, .6);
  color: #fff;
  font-size: 20px;
  text-align: center;
  z-index: 999;
  display: none;
}

body {
  background: url(../img/picture1.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

html {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
}

h1 {
  margin: 0.2rem;
  font-size: 1.2rem;
}

p {
  font-size: 1rem;
  line-height: 1.5rem;
  /* 字体变淡 */
  font-weight: 100;
  margin: 1.2rem 0;
  /* 字间距 */
  letter-spacing: 0.1rem;
}

span {
  font-size: 0.8rem;
  margin: 1.2rem 0;
}

a {
  color: #333;
  font-size: 1rem;
  /* 下划线消失 */
  text-decoration: none;
}

.container {
  /* 相对定位 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.6rem;
  width: 50rem;
  height: 35rem;
  /* 溢出隐藏 */
  overflow: hidden;
  max-width: 100vw;
  min-height: 50vh;
}

.form-container form {
  background: #fff;
  /* 弹性布局 */
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.social-container {
  margin: 0.6rem 0;
}

.social-container a {
  border: 1px solid #eee;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 1.8rem;
  width: 1.8rem;
}

.social-container a:hover {
  opacity: 0.8;
}

.form-container input {
  width: 100%;
  height: 2.2rem;
  text-indent: 1rem;
  border: 1px solid #ccc;
  /* 把input上左右边框取消 */
  border-left: none;
  border-right: none;
  border-top: none;
  /* 点击input边框消失 */
  outline: none;
  margin: 0.6rem 0;
}


/* 被选中时候缩小 */

.form-container button:active {
  transform: scale(0.95, 0.95);
}

.form-container button {
  padding: 0.4rem 1rem;
  background: #465b5c;
  color: white;
  border: 1px solid #fff;
  outline: none;
  /* 鼠标放上变小手 */
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  font-size: 0.6rem;
  padding: 0.5rem 0;
}

button#send_code {
  width: 100%;
}

button.ghost {
  background: transparent;
  border-color: #fff;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 800ms ease-in;
  margin: 0.6rem 0;
  padding: 0.5rem 0;
  color: white;
  font-size: 0.6rem;
}

button.ghost:active {
  transform: scale(0.95, 0.95);
}

.form-container {
  /* 绝对定位 */
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in;
}

.sing-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.overlay {
  background: #465b5c;
  width: 200%;
  height: 100%;
  position: relative;
  left: -100%;
  transition: all 0.6s ease-in-out;
  color: white;
}

.overlay-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 99;
}

.overlay-pannel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 2.2rem;
}

.overlay-right {
  right: 0;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sing-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
  transition: all 0.6s ease-in-out;
}</style>