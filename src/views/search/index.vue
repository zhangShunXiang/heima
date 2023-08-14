<template>
  <div>
    <form action="/" class="search-form">
      <van-search v-model="value" show-action background="#3296fa" placeholder="请输入搜索关键词" @search="onSearch"
        @cancel="onCancel" />
    </form>
    <List v-if="isListShow" :list="list"></List>
    <Result v-else-if="isResultShow" :value="value"></Result>
    <History v-else></History>

  </div>
</template>

<script>
import List from './components/List.vue'
import Result from './components/Result.vue'
import History from './components/History.vue'


import api from '@/api'
export default {
  data() {
    return {
      value: '',
      list: [],
      isResultShow: false,
      isListShow: false,
      history:[]
    };
  },
  components: {
    List, Result, History
  },
  methods: {


    async onSearch(value) {
      this.isResultShow = true
      this.isListShow = false

      const resHistory=this.history.find((item)=>{
        return item===value
      })
      if(resHistory){
       return this.history.splice(resHistory,1).unshift(value) 
        
      }
      this.history.unshift(value)
      const res = await api.search({
        q: value
      })

    },
    onCancel() {
      this.$toast('取消');
    },
  },
  watch: {
    "value": {
      async handler(nVal, oVal) {
        this.isListShow = true
        this.isResultShow = false
        if (this.value === '') {
          return this.isListShow = false
        }
        console.log(nVal, oVal);
        const res = await api.searchSuggestion({
          q: nVal
        })
        this.list = res.data.data.options

      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-search__action {
  color: #fff;
}
.search-form{ 
   top:0 ;
  left: 0;
  right: 0;
}
</style> 