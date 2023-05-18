<template>
    <div class="control">
        <div class="line">
            <span class="label">Image:</span>
            <el-select v-model="formData.gameImg" :disabled="games.isStart" @change="changeGameImg">
                <el-option v-for="item in formInline.imgList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="line">
            <span class="label">Level: </span>
            <el-select v-model="formData.level" :disabled="games.isStart">
                <el-option v-for="item in formInline.levelList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="line" v-if="games.isStart">Step Limit:{{ games.stepLimit }}</div>
        <div class="line" v-if="games.isStart">Steps:{{ games.step }}</div>
        <div class="line">
            <el-button type="primary" @click="changeGame">{{
                games.isStart ? "End Game" : "Start Game"
            }}</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, ref } from 'vue'
import { Puzzle } from '@/utils/puzzle'
const props = defineProps({
    games: {
        type: Puzzle,
        required: true
    }
})

const changeGame = () => {
    props.games.init(formData.value)
}

const changeGameImg = img => {
    props.games.setImg(img)
    props.games.setLevel(Number(img.split("_")[1]) + 2)
    formData.value.level = Number(img.split("_")[1]) + 2
    console.log(`level:${props.games.level} stepLimit:${props.games.stepLimit}`)
}

const data = reactive({
    formData: {
        gameImg: 'game_1',
        level: 3,
    },
    formInline: {
        imgList: [
        ],
        levelList: [
            { label: 'beginner', value: 3 },
            { label: 'intermediate', value: 4 },
            { label: 'advanced', value: 5 },
        ],
    },
})

onMounted(async () => {
    const imageModules = import.meta.glob('../assets/images/gameImgs/*');
    for (const path in imageModules) {
        const module = await imageModules[path]();
        // The default export of a file processed by url-loader will be the final URL.
        // Split the path into parts, get the last part, and remove the extension
        const filename = path.split('/').pop().split('.')[0];
        data.formInline.imgList.push({ label: filename.split("_")[0], value: filename, level: Number(filename.split("_")[1]) + 2});
    }
    console.log(data.formInline.imgList)
})

const { formData, formInline } = toRefs(data)
</script>

<style lang="scss" scoped>
.line {
  display: flex;
  align-items: center;
  justify-content: center;
  & + .line {
    margin-top: 20px;
  }
  .el-select {
    flex: 1;
  }
}
</style>