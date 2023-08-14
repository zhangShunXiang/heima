<template>
    <div>
        <div>
            <div class="container">
                <div class="user-panel" v-if="user">
                    <div class="user-inf">
                        <van-image round class="user-avatar" :src='userInf.photo' />
                        <div class="nickname">{{ userInf.name }}</div>
                        <van-button class="edit" type="default" size="mini" round> <span>编辑资料</span> </van-button>
                    </div>
                    <div class="item">
                        <div>
                            <span class="n">{{ userInf.art_count }}</span> <span>头条</span>
                        </div>
                        <div>
                            <span class="n">{{ userInf.follow_count }}</span> <span>关注</span>
                        </div>
                        <div>
                            <span class="n">{{ userInf.fans_count }}</span> <span>粉丝</span>
                        </div>
                        <div>
                            <span class="n">{{ userInf.like_count }}</span> <span>获赞</span>
                        </div>
                    </div>
                </div>
                <div class="go-login " v-else @click="$router.push('/login')">
                    <img src='@/assets/head-icon.png'>
                    <span>登录/注册false</span>
                </div>

                <van-tabbar class="category" active-color="" inactive-color="" :fixed=fixed>
                    <van-tabbar-item icon="friends-o">
                        <template #icon>
                            <i class="iconfont icon-shoucang"></i>
                        </template>
                        <span>收 藏</span>
                    </van-tabbar-item>
                    <van-tabbar-item icon="setting-o">
                        <template #icon>
                            <i class="iconfont icon-lishi"></i>
                        </template>
                        <span>历 史</span>
                    </van-tabbar-item>
                </van-tabbar>
            </div>
            <div class="pain-list">
                <van-cell-group>
                    <van-cell title="消息通知" is-link />
                    <van-cell title="小智同学" is-link />
                </van-cell-group>
            </div>
            <van-cell v-if="user" clickable @click="confirm" title-class="logout" class="mt15" title="退出登录" />
        </div>

    </div>
</template>

<script>
import api from '@/api'
import logo from '@/assets/head-icon.png'
import store from '@/store'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            logo,
            fixed: false,
            userInf: {},
            // token: store.state.user.token,
        }
    },
    computed: {

        ...mapState(['user'])
    }, methods: {
        logout() {
            console.log(this.user);
            this.$store.commit('setUserToken', null)
        }
        ,
        confirm() {

            this.$dialog.confirm({
                title: '标题',
                message: '弹窗内容',
            })
                .then(() => {
                    this.logout()
                    // this.$router.push('./login')
                })
                .catch(() => {
                    // on cancel
                });
        }
    },
    async created() {
        // console.log(this.token);
        try {
            // console.log(this.$store.user.token);
            const res = await api.getUserInf()
            this.userInf = res.data.data
        }
        catch (err) {
            console.log(err);
            this.$router.back()
        }

        console.log(this.userInf);

    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
.container {
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;

    .go-login {
        height: 400px;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 28px;

        img {
            width: 134px;
            height: 134px;
            padding-bottom: 15px;
        }
    }

    .category {
        height: 140px;

        span {
            color: #333333;
            line-height: 35px;
        }

        .iconfont {
            font-size: 46px;
            line-height: 55px;
        }

        .icon-shoucang {
            color: #eb5253;
        }

        .icon-lishi {
            color: #ff9d1d;
        }

    }

    .user-panel {
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        img {
            width: 132px;
        }


        .item {
            width: 685px;
            height: 130px;
            padding-top: 22px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            font-size: 23px;
            color: #fff;
            text-align: center;

            .n {
                font-size: 35px;
            }

            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
    }

    .user-inf {
        margin: 0 auto;
        width: 685px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
    }

    .nickname {
        color: #fff;
        font-size: 30px;
        width: 400px;

    }

    .edit {
        width: 117px;
        height: 32px;

        span {
            font-size: 20px;
        }
    }

    .user-avatar {
        width: 135px;
        height: 135px;
        border: 2px solid #fff;
    }
}


.pain-list {
    margin-top: 10px;
}

.logout {
    text-align: center;
    color: #d86262;

}

.mt15 {
    margin-top: 10px;
}
</style>