<template>
    <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(value)">
            <van-cell  v-for="(item, index) in result" :key="index"  icon="search" is-link  >
                <div class="van-ellipsis">{{ item.title }}</div></van-cell>
         </van-list>
    </div>
</template>


<script>
import api from '@/api'
export default {
    props: {
        // result: Array,
        value: String
    },
    data() {
        return {
            loading: false,
            finished: false,
            result: [],
            page: 1
        }
    },
    methods: {
        async onLoad(value) {
            const res = await api.search({
                q: value,
                page: this.page
            })
            this.result.push(...res.data.data.results)
            // this.result =[this.result, ...res.data.data.results]
            this.loading = false,
                console.log(res);
            // 4. 判断数据是否加载完毕
            if (res.data.data.results.length) {
                this.page++ // 更新获取下一页数据的页码
            } else {
                this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
            }
        }
    }
}
</script>

<style></style>
