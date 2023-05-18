<template>
    <div class="container">
        <!-- 底部挡板 -->
        <div class="board" :style="{left: boardX + 'px'}"></div>
        <!-- 弹球 -->
        <div class="ball" :style="{left:ballX+'px',top:ballY+'px'}"></div>
        <!-- 游戏结束 -->
        <h1 v-if="fail" class="game-over" style="text-align: center;">game over</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            boardX:0,
            ballX:0,
            ballY:0,
            rateX:0.1,
            rateY:0.1,
            fail:false
        }
    },
    //生命周期函数
    mounted() {
        this.enterKeyup();
        this.rateX = (Math.random() + 0.1)
        this.rateY = (Math.random() + 0.1)
        this.timer = setInterval(()=>{
            if (this.ballX + this.rateX >= 440 -30) {
                this.rateX *= -1
            }
            if (this.ballX + this.rateX <= 0){
                this.rateX *= -1
            }
            if (this.ballY + this.rateY <= 0) {
                this.rateY *= -1
            }
            this.ballX += this.rateX
            this.ballY += this.rateY

            if (this.ballY >= 440 - 30 - 10) {
                //挡板挡住了
                if (this.boardX <= this.ballX + 30 && this.boardX + 80 >= this.ballX) {
                    this.rateY *= -1
                } else {
                    clearInterval(this.timer)
                    this.fail = true
                }
            }
        },2)
    },
    methods: {
        keydown(event) {
            if (event.key == "ArrowLeft") {
                if (this.boardX > 10) {
                    this.boardX -= 20
                }
            } else if (event.key == "ArrowRight") {
                if (this.boardX < 440 - 80) {
                    this.boardX += 20
                }
            }
        },
        enterKeyup() {
            document.addEventListener("keydown", this.keydown)
        }
    }
}
</script>
<style>
body {
    margin: 0;
    padding: 0;
}
.container {
    position: relative;
    margin: 0 auto;
    width: 440px;
    height: 440px;
    background-color: blanchedalmond;
}
.ball {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 0px;
    top: 0px;
    background-color: orange;
    border-radius: 30px;
}
.board {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 10px;
    width: 80px;
    border-radius: 5px;
    background-color: red;
}
.game-over {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: red;
}

</style>