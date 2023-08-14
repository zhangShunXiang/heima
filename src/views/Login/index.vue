<template>
  <div>
    <MeatTitle></MeatTitle>
    <van-form @submit="onSubmit" ref="subForm">
      <van-cell-group>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field name="mobile" v-model="tel" type="tel" :rules="[{ required: true, message: '请输入手机号' }]"
          placeholder="请输入手机号">
          <i slot="left-icon" class="iconfont icon-shouji"></i>
        </van-field>
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <van-field name="code" :rules="[{ required: true, message: '请输入手机号' }]" v-model="code" type="digit"
          placeholder="请输入验证码">
          <i slot="left-icon" class="icon-yanzhengma iconfont"></i>
          <template #button>
            <van-button size="mini" native-type="button" color="#ededed" @click="sendCode(tel)" style="color:#666666"
              round><span class="send-button">发送验证码</span></van-button>
          </template>

        </van-field>
      </van-cell-group>
      <van-button class="submit-button" block type="info" native-type="submit">登录</van-button>
    </van-form>
  </div>
</template>

<script>
import MeatTitle from '@/components/MeatTitle'
import request from 'axios'
import api from '@/api/index'
export default {
  components: { MeatTitle },
  data() {
    return {
      tel: '13911111111'
      , code: '246810'


    }
  },
  methods: {
    async onSubmit(values) {
      console.log('submit', values)
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      try {
        const res = await api.login(values)
        this.$store.commit('setUserToken', res.data.data)
        this.$store.commit('getUserInf')


        // console.log(res.data.data);
        this.$toast.success({
          message: '登录成功'
          , duration: 300
        })
        this.$router.push('/my')

      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    },
    async sendCode() {
      console.log(this.tel);

      try {
        const res = await api.sendCode(this.tel)
        this.$toast.success('发送成功')
        console.log(res.data.data)
      } catch (err) {
        this.$toast.fail('手机号有误')
        console.log(err)
      }
    },

  },
  mounted() {

  },
  async created() {
    // const  getChannels = () =>  request({
    //   method: 'GET',
    //   url: 'https://toutiao.itheima.net/v1_0/articles',
    //   data: {
    //     channel_id: '0', // 频道 id
    //     timestamp: '1687928164952', // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳

    //   }

    // })
    // const res1 = await request({
    //   method: 'GET',
    //   url: 'https://toutiao.itheima.net/v1_0/articles',
    //   data: {
    //     channel_id: '1', // 频道 id
    //     timestamp: '1687928164952', // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳

    //   }

    // })
  }

}
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px;

}

.send-button {
  color: #666;
}

.van-button--mini {
  padding: 0 19px;
}

.submit-button {
  border-radius: 5px;
  width: 694px;
  margin: 53px auto 0;
  background: #6db4fb;
  border: none;

}
</style>