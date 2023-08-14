<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
                <div class="article-list" v-for="(obj, index) in list" :key="index">
                    <div class="article-item " v-if="obj.cover.type !== 1">
                        <div class="">
                            <div class="title">
                                {{ obj.title }}
                            </div>
                            <div class="imgs">
                                <img v-for="(imgSrc, index) in obj.cover.images" :key="index" :src="imgSrc" alt="" />

                            </div>
                        </div>
                        <div class="description">
                            <span class="top" v-if="obj.is_top === 1">置顶</span>
                            <span class="author">{{ obj.aut_name }}</span>
                            <span class="comments">{{ obj.comm_count }} 评论</span>
                            <span class="time">{{ obj.pubdate }}</span>
                        </div>
                    </div>
                    <div class="article-item one-img" v-else>
                        <div>
                            <div class="title">
                                {{ obj.title }}
                            </div>
                            <div class="description">
                                <span class="top" v-if="obj.is_top === 1">置顶</span>
                                <!-- {{ obj.is_top===0?isTop:"" }}  -->
                                <span class="author">{{ obj.aut_name }}</span>
                                <span class="comments">{{ obj.comm_count }} 评论</span>
                                <span class="time">{{ obj.pubdate }}</span>
                            </div>
                        </div>
                        <div class="my-img">
                            <img v-for="(imgSrc, index) in obj.cover.images" :key="index" :src="imgSrc" alt="" />
                        </div>
                    </div>
                </div>
                <!-- </van-pull-refresh> -->
            </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
import api from '@/api'
import request from '@/utils/request';
export default {
    props: {
        cId: Number
    },
    data() {
        return {
            isTop: "<span class='top'>置顶</span>",
            isLoading: false,
            list: [],
            loading: false,
            finished: false,
            preTimestamp: '',
            immediateCheck: false,
            refreshing: false,
            count: 1
        }
    },
    methods: {

        async onLoad() {
            const res = await api.getArtList({
                channel_id: this.cId,
                timestamp: this.preTimestamp || Date.now()
            })
            const results = res.data.data.results

            this.list.push(...results);
            // console.log(this.list);
            // console.log(this.preTimestamp);

            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成

            if (results.length) {
                this.preTimestamp = res.data.data.pre_timestamp
                // console.log(this.pre);
            } else {
                this.finished = true
            }

        },


        // async getArtList() {
        //     const res = await api.getArtList({
        //         channel_id: this.cId,
        //         timestamp: this.preTimestamp || Date.now()

        //     })
        //      this.list.push(...res.data.data.results)
        //     // this.list = res.data.data.results
        //     this.preTimestamp = res.data.pre_timestamp
        //     console.log(this.pr);
        //     console.log(this.list);
        // },

        async onRefresh() {
            const res = await api.getArtList({
                channel_id: this.cId,
                timestamp: this.preTimestamp || Date.now()
            })
            const results = res.data.data.results
            this.list.unshift(...results);
            this.$toast('刷新成功');
            this.isLoading = false;
            // setTimeout(() => {
            //     // this.toast('刷新成功');
            //     this.isLoading = false;
            //     this.count++;
            // }, 1000);
        },
    },
    created() {
        // this.getArtList()
        //     console.log(Date.now(),this.cId);
        //   const res= await api.getArtList()
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
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