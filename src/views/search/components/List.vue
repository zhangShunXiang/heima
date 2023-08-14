<template>
    <div>
        <van-cell v-for="(item,index) in list" :key="index" :title="item" icon="search" is-link>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="delete" class="search-icon" @click="del(val)" />
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
    props:{
        list:Array
    },
    data(){
        return{

        }
    },
    methods: {
        del(val){

        }
    }
}
</script>

<style lang="less" scoped>
.search-icon {
    font-size: 32px;
    line-height: 48px;
}
</style>