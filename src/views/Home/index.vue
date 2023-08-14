<template>
  <div>

    <div class="search">
      <van-button type="info" to="/search" round>
        <i slot="icon" class="iconfont icon-sousuo"></i>搜索</van-button>
    </div>
    <div class="category">
      <van-tabs class="list-w" color="#3296fa" v-show="show" ref="tabs" v-model="activeName" animated swipeable>
        <div slot="nav-right" class="more " @click="showPopup"> <i class=" iconfont icon-gengduo"></i> </div>
        <div slot="nav-right" class="blank van-tab"> </div>
        <van-tab v-for="obj in channels" :title="obj.name" :key="obj.id" :name="obj.name">
          <ArticleList :cId=obj.id></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="showEditChannel" closeable close-icon-position="top-left" round position="bottom"
      :style="{ height: '93%' }">
      <EditChannel ></EditChannel>
    </van-popup>
  </div>
</template>

<script>
import MeatTitle from '@/components/MeatTitle.vue'
import api from '@/api'
import ArticleList from '@/components/ArticleList.vue'
import EditChannel from '@/components/EditChannel'
export default {
  data() {
    return {
      index: 0,
      active: 0,
      count: 0,
      show: true,
      isLoading: false,
      channels: '',
      myChannels: '',
      activeName: '',
      showEditChannel: false,
      allChannels: []
    }
  },
  mounted() {


  },
  async created() {
    this.getChannels()
    this.getMychannels()
  },

  methods: {
    async getMychannels() {
      const res = await api.getUserChannels()
      this.myChannels = res.data.data.channels
    },
    showPopup() {
      // console.log(12);
      this.showEditChannel = true;
    },
    async getChannels() {
      const res = await api.getChannels()
      this.channels = res.data.data.channels
      this.activeName = res.data.data.channels[0].name
      // console.log(this.activeName);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
  components: { MeatTitle, ArticleList, EditChannel },

}
</script>

<style lang="less" scoped >
.search {
  display: flex;
  height: 97px;
  justify-content: center;
  align-items: center;
  background: #3296fa;

  .van-button {
    width: 555px;
    height: 64px;
    background: #5babfb;
    border: none;
  }

  .van-button__text {
    font-size: 28px;
  }
}

/deep/ .van-tab__pane-wrapper {
  padding-bottom: 100px;
}

.category {

  /deep/.van-tabs__content {
    width: 750px;
  }

  /deep/.van-tabs__wrap {
    border: 1px solid #edeff3;
    height: 80px;
  }

  /deep/.van-tab {
    border-left: 1px solid #edeff3;
  }

  /deep/.van-tab:first-child {
    border: none
  }

  /deep/.van-tab:last-child {
    border: none
  }

  .more {
    width: 66px;
    height: 80px;
    background: #fff;
    opacity: .9;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #edeff3;

    &i {
      font-size: 33px;
    }
  }

  .blank {
    width: 66px;
    height: 44px;
  }
}


.article-list {
  background: #fff;
  box-sizing: border-box;

  .article-item {
    padding: 15px 23px 0;
    border-bottom: 1px solid #edeff3;
  }

  .description {
    color: #b4b4b4;
    font-size: 23px;
    display: flex;
    height: 70px;
    line-height: 70px;

    span {
      padding-right: 20px;
    }

    .top {
      color: #e22829;
    }

  }

  .title {
    letter-spacing: 2px;
    line-height: 60px;
    color: #3a3a3a;
    font-size: 32px;
    padding-bottom: 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    // # 不换行出现省略号
    overflow: hidden;
    white-space: no-wrap;
    text-overflow: ellipsis;
  }

  .imgs {
    display: flex;
    justify-content: space-between;

    img {
      height: 146px;
      width: 232px;
    }
  }

  .one-img {
    display: flex;

    .my-img {
      width: 267px;
      height: 215px;

      >img {
        width: 232px;
        height: 146px;
      }
    }
  }
}
</style>