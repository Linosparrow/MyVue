<template>
    <div class="container">
        <div class="stage">
            <div class="game-name" v-show="!isStart">华容道</div>
            <div class="content clearfix">
                <div v-for="(item, index) in randomData" :key="item" :class="`img${level}`" @click="handleMove(item)">
                    <!-- <img v-if="item != randomData.length" :src="imgUrls[index]" :alt="'Image ' + index" /> -->
                    <div>ss</div>
                </div>
            </div>
        </div>
        <div>
            <img :src="smallImgDataUrl" v-if="smallImgDataUrl" />
        </div>
    </div>
</template>

<script>

</script>