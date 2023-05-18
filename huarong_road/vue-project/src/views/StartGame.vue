<template>
    <div class="container">
        <div class="stage">
            <div class="game-name" v-show="!isStart">Huarong Road</div>
            <div class="content clearfix" v-show="isStart">
                <div v-for="item in randomData" :key="item" :class="`img${level}`" @click="handleMove(item)">
                    <el-image v-if="item != randomData.length" :src="imgUrls[item-1]" />
                </div>
            </div>
        </div>
        <div class="other">
            <div class="point">
                <el-image :src="getGameImgFile(gameImg)" @contextmenu.prevent/>
            </div>
            <ControlCase :games="games"></ControlCase>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, toRefs, ref, watch } from "vue"
import { getGameImgFile, getSmallImg } from "@/utils/utils"
import Puzzle from "@/utils/puzzle"
import ControlCase from "@/components/control.vue"

let games = reactive(new Puzzle())
let imgUrls = ref([])  // 创建一个响应式变量来保存图片的 URL

const { level, gameImg, randomData, isStart } = toRefs(games)

console.log(isStart.value)

// 鼠标移动图片
const handleMove = (index) => {
  games.move(index)
}

onMounted(async () => {
    // for (let i = 0; i < level * level; i++) {
    //     const imgUrl = await getSmallImg(gameImg.value, level.value, randomData.value[i]);
    //     imgUrls.value.push(imgUrl);
    // }
})

watch(isStart, async (newGames, oldGames) => {
    imgUrls.value = []

    // 创建一个空数组来存储所有的 Promise
    let promises = [];

    for (let i = 0; i < randomData.value.length; i++) {
        // 对每一个索引，创建一个新的 Promise，并添加到 promises 数组中
        promises.push(getSmallImg(gameImg.value, level.value, i + 1));
    }

    // 等待所有的 Promise 都完成
    let results = await Promise.all(promises);

    // 将结果按照顺序添加到 imgUrls 中
    imgUrls.value = results;
})

watch(gameImg, async (newGames, oldGames) => {
    imgUrls.value = []
    // 根据 randomData 的值来获取图片
    for (let i = 0; i < randomData.value.length; i++) {
        const imgUrl = await getSmallImg(gameImg.value, level.value, i + 1);
        imgUrls.value.push(imgUrl);
    }
})

console.log(level.value)
</script>

<style scoped></style>