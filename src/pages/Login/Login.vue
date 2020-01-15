<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">懵人外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" @click="isUserNameLogin=false" :class="{on:!isUserNameLogin}">短信登录</a>
          <a href="javascript:;" @click="isUserNameLogin=true" :class="{on:isUserNameLogin}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: !isUserNameLogin}">
            <section class="login_message">
              <!-- 这里的回车input和button没有设置@keyup.entr事件,但是按回车可以发送验证码请求 -->
              <input
                ref="BUG"
                name="phone"
                v-validate="'required|phone'"
                v-model="phone"
                type="tel"
                maxlength="11"
                placeholder="手机号"
              />
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button
                @click.prevent="getCode"
                :disabled="!rightPhoneNumber || countDownTime>0"
                class="get_verification"
                :class="{rightPhone:rightPhoneNumber}"
              >{{countDownTime?`${countDownTime}s以后重新获取`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                name="code"
                v-validate="'required|code'"
                v-model="code"
                type="tel"
                maxlength="8"
                placeholder="验证码"
              />
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: isUserNameLogin}">
            <section>
              <section class="login_message">
                <input
                  v-model="username"
                  name="username"
                  v-validate="'required'"
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                />
                <span
                  style="color: red;"
                  v-show="errors.has('username')"
                >{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input
                  v-model="psw"
                  name="psw"
                  v-validate="'required'"
                  :type="isShowPws?'el':'password'"
                  maxlength="8"
                  placeholder="密码"
                />
                <span style="color: red;" v-show="errors.has('psw')">{{ errors.first('psw') }}</span>
                <div
                  class="switch_button"
                  :class="isShowPws?'on':'off'"
                  @click="isShowPws=!isShowPws"
                >
                  <!-- <div class="switch_circle" :class="isShowPws?'right':''"></div> -->
                  <div class="switch_circle" :class="{right:isShowPws}"></div>
                  <!-- 切换小圆点,输入的密码就没了 -->
                  <span class="switch_text">{{isShowPws?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  @keyup.enter="login"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                />
                <span
                  style="color: red;"
                  v-show="errors.has('captcha')"
                >{{ errors.first('captcha') }}</span>
                <img
                  ref="captcha"
                  @click="toggleCaptcha"
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantouzuo"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
// import {sentCode} from '../../api'
export default {
  data() {
    return {
      isUserNameLogin: false, // 是否是用户名登录，默认为false
      isShowPws: false, // 是否是用密码,默认不显示
      phone: "", // 手机号,
      countDownTime: 0,
      code: "", //验证码
      username: "",
      psw: "",
      captcha: ""
    };
  },
  // created() {
  //   console.log("haha");
  //   this.$API.autoLogin();
  // },
  methods: {
    toggleCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
    goProfile() {
      this.$router.replace("/profile");
    },
    async getCode() {
      console.log(this.$refs.BUG);
      //重置倒计时
      this.countDownTime = 5;
      let interValId = setInterval(() => {
        this.countDownTime--;
        this.countDownTime === 0 && clearInterval(interValId);
        // console.log(this.countDownTime);
      }, 1000);
      //调用发送验证码请求的方法
      let result = await this.$API.sentCode({ phone: this.phone });
      console.log(result);
      if (result.code === 0) {
        alert("请求发送成功");
      } else {
        alert(result.msg);
      }
    },
    async login() {
      //前端验证
      let { isUserNameLogin, phone, code, username, psw, captcha } = this; //通过结构赋值的方式收集数据
      let names = isUserNameLogin
        ? ["username", "psw", "captcha"]
        : ["phone", "code"]; //收集到names中
      const success = await this.$validator.validateAll(names); //对所有表单项统一验证
      //前端验证通过在进行后端验证
      if (success) {
        //收集表单数据
        let result;
        //发送请求,判断用户登录的方式
        if (isUserNameLogin) {
          //如果isUserNameLogin位true,登录方式是用户名/密码登录
          result = await this.$API.loginWithUserName({
            username,
            psw,
            captcha
          });
          if (result.code === 1) {
            alert("请输入正确的用户名/密码/验证码");
            //刷新验证码
            this.toggleCaptcha();
            //清空之前输入的验证码
            this.captcha = "";
          }
        } else {
          result = await this.$API.loginWithPhone({ phone, code });
          if (result.code === 1) {
            //这里是手机号验证码登录,目前生活中手机号使用频率很高,用户输错机率很小,所以一般不提示手机号错误
            alert("请输入正确的验证码");
            //验证码置空
            this.code = "";
          }
        }

        //统一处理成功的请求
        if (result.code === 0) {
          //登录成功
          alert("we can take the long way");
          //跳转到
          this.goProfile();
          //通过dispatch把用户数据传给actions
          this.$store.dispatch("getUserInfoAction", result.data);
        }
      } else {
        //前端验证失败
        alert("前端验证失败");
      }
    }
  },
  computed: {
    rightPhoneNumber() {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone);
    }
  }
};
</script>

<style lang="stylus">
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.rightPhone {
                color: #333;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
