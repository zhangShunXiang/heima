<template>
    <div>

        <div class="gird-wraper">
            <van-cell title="我的频道" :border='border' value-class="my-channel">
                <van-button @click="edit" class="edit-button" slot="extra" round type="default"><span class="button-text">
                        {{ isEdit ? '完成' : '编辑' }}

                    </span></van-button>
            </van-cell>
            <van-grid :gutter="10">
                <van-grid-item v-for="(obj, index) in myChannels" :key="index"><van-icon v-show="isEdit"
                        @click="delChannel(obj)" name="clear" class="clear-icon" />
                    <span class=" grid-text ">{{ obj.name }}</span> </van-grid-item>
                <!-- <span>{{ obj.name }}</span> -->
            </van-grid>
            <van-cell title="频道推荐" :border='border' class="recommend" />
            <van-grid :gutter="10">
                <van-grid-item v-for="(obj, index) in newChannel" :key="index">
                    <span v-if="isEdit" @click="addChannel(obj)" class=" grid-text ">+ {{ obj.name }}</span>
                    <span v-else class=" grid-text ">{{ obj.name }}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import api from '@/api'
export default {
    props: {
        // allChannels: Array,
        // myChannels: Array
    },
    data() {
        return {
            border: false,
            myChannels: [],
            allChannels: [],
            isEdit: false


        }
    },
    computed: {
        newChannel() {
            const channels = []
            this.allChannels.forEach(channel => {
                // this.myChannels.some(myChannel => {
                //     if (myChannel.id !== channel.id) {
                //         channels.push(channel)
                //         return true

                //     }
                // })
                const res = this.myChannels.find(myChannel => {

                    return myChannel.id === channel.id
                })
                console.log(res);
                if (!res) {

                    channels.push(channel)
                }

            })
            // return this.allChannels.filters(item => {
            //     return this.myChannels.findIndex(userItem => {
            //         return userItem.id === item.id
            //     }) === -1
            // })
            return channels
        }
    },
    async created() {
         await this.getChannels()
        if (localStorage.getItem('MyChannel') && localStorage.getItem('MyChannel') != '[]') {
            this.myChannels = JSON.parse(localStorage.getItem('MyChannel'))
        } else {
            await this.getMychannels()
        }

    },
    methods: {
        edit() {
            {
                this.isEdit = !this.isEdit
                localStorage.setItem('MyChannel', JSON.stringify(this.myChannels))
            }
        },
        delChannel(obj) {
            console.log(obj);
            this.myChannels.pop(obj, 1)

        },
        addChannel(obj) {
            this.myChannels.push(obj)
        },
        async getMychannels() {
            const res = await api.getUserChannels()
            this.myChannels = res.data.data.channels
        },

        async getChannels() {
            const res = await api.getChannels()
            this.allChannels = res.data.data.channels
            this.activeName = res.data.data.channels[0].name
        },


    }
}
</script>
<style lang="less" scoped>
.edit-button {
    border: 1px solid red;
    height: 50px;
}

.gird-wraper {
    padding-top: 70px;
    padding-bottom: 50px;

    /deep/ .van-grid-item__content {
        height: 86px;
        background: #f4f5f6;
    }

    /deep/ .van-grid-item__text {
        color: #222222;
        // font-size: 20px;

    }

    .van-cell {
        .button-text {
            font-size: 16px;
            color: red;

        }

        span {
            font-size: 32px;
            color: #333333;
        }
    }

    .recommend {
        margin-top: 40px;
    }

    /deep/.van-button__text {
        line-height: 100%;
    }

    .clear-icon {
        font-size: 30px;
        right: -5px;
        top: -5px;
        position: absolute;
        color: red;
        z-index: 2;
    }

    .grid-text {
        font-size: 20px;
    }
}
</style>