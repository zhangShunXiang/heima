<template>
  <div>
    <MeatTitle></MeatTitle>
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <div class="warper">
      长：<van-field v-model="c" type="digit" label="整数" /> <!-- 允许输入正整数，调起纯数字键盘 -->
      宽：<van-field v-model="k" type="digit" label="整数" /><!-- 允许输入正整数，调起纯数字键盘 -->
      高：<van-field v-model="g" type="digit" label="整数" />
    </div>
  </div>
</template>
  
<script>
import MeatTitle from '@/components/MeatTitle.vue'
export default {
  components: { MeatTitle },
  data() {
    return {
      fiveK: 5000,
      sixK: 6000,
      c: '', k: '', g: ''
    }
  },methods:{

  }

}
</script>
  
<style scoped>
.warper {
  display: flex;
}
</style>