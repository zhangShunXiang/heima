<template>
    <div>
        <van-tabbar route  >
            <van-tabbar-item replace  to="/home">
                <template #icon>
                    <i class="iconfont icon-shouye"></i>
                </template>
                <span>首页</span>
            </van-tabbar-item>
            <van-tabbar-item replace  to="/qa">
                <template #icon>
                    <i class="iconfont icon-wenda"></i>
                </template>
                 <span>问题</span>
            </van-tabbar-item>
            <van-tabbar-item replace  to="/video">
                <template #icon>
                    <i class="iconfont icon-shipin"></i>
                </template>
                 <span>视频</span>
                </van-tabbar-item>
            <van-tabbar-item replace  to="/my">
                <template #icon>
                    <i class="iconfont icon-wode"></i>
                </template>
                 <span>{{$store.state.user?`我的`:'未登录'}}</span>
                </van-tabbar-item>
        </van-tabbar>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data() {
        return {
          }
    }
}
</script>

<style scoped></style>
 