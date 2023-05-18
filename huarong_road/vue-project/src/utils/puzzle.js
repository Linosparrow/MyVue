import { ElMessageBox } from "element-plus";
import { getGameImgFile } from '@/utils/utils';

export class Puzzle {
    constructor() {
        this.isStart = false;
        this.randomData = [];
        this.finishData = "";
        this.gameImg = "game_1";
        this.level = 3;
        this.step = 0;
        this.stepLimit = 100;
    }

    init({ gameImg, level }) {
        this.gameImg = gameImg;
        this.level = level;
        this.step = 0;
        this.isStart = !this.isStart;
        this.randomData = this.getRandomData();
        if (this.isStart) {
            this.finishData = this.getFinishData();
        }
        if (this.level == 3) {
            this.stepLimit = 100
        } else if (this.level == 4) {
            this.stepLimit = 200
        } else if (this.level == 5) {
            this.stepLimit = 300
        }
    }

    move(idx) {
        let level = this.level;
        let target = this.randomData.indexOf(idx);  // 当前选中位置下标
        let space = this.randomData.indexOf(Math.pow(level, 2)); // 空白位置下标

        // 过滤一下，空白位置在最左边时点击右边上一个数字时也能实现交换
        // 以及空白位置在最右边点击左边下一个数字时也能实现交换
        let condition =
            (space % level === 0 && target % level === level - 1) ||
            (space % level === level - 1 && target % level === 0);

        if (this.step >= this.stepLimit) {
            ElMessageBox.alert(`Unfortunately, you were unable to complete the level within the specified number of steps.`, "Hint", {
                confirmButtonText: "OK",
                callback: (action) => {
                    this.randomData = []
                    this.step = 0
                    this.isStart = false
                },
            })
        } else {
            if (!condition) {
                // 点击目标的，上或下或左或右是空白位，就交换位置
                if (
                    target === space - level ||
                    target === space + level ||
                    target === space - 1 ||
                    target === space + 1
                ) {
                    this.change(space, target);
                }
            }
        }
    }
    // 键盘事件
    onKeydown(code) {
        let level = this.level;
        // 目标位置下标
        let target;
        // 空白位置下标
        let space = this.randomData.indexOf(Math.pow(level, 2));
        switch (code) {
            case 37:
                target = space + 1;
                if (space % level === level - 1) return;
                this.change(space, target);
                break;
            case 38:
                target = space + level;
                if (target > this.randomData.length - 1) return;
                this.change(space, target);
                break;
            case 39:
                target = space - 1;
                if (space % level === 0) return;
                this.change(space, target);
                break;
            case 40:
                target = space - level;
                if (target < 0) return;
                this.change(space, target);
                break;
        }
    }

    change(space, target) {
        // 空白位置替换成目标位置
        this.randomData[space] = this.randomData[target];
        // 目标位置为最大值，就完成了替换
        this.randomData[target] = Math.pow(this.level, 2);
        this.step += 1;
        this.finish();
        console.log(this.randomData.join(""))
        console.log(this.finishData)
    }

    // 检查是否拼图完成
    finish() {
        if (this.randomData.join("") == this.finishData) {
            // ElMessageBox.alert(`Congratulations! You have successfully cleared the level in only ${this.step} steps.`, "Hint", {
            //     confirmButtonText: "OK",
            //     callback: (action) => {
            //         this.randomData = []
            //         this.step = 0
            //         this.isStart = false
            //     },
            // })
            ElMessageBox.alert(`
    Congratulations! You have successfully cleared the level in only ${this.step} steps.
    You have now unlocked this image for download!
    <br/>
    <img src="${getGameImgFile(this.gameImg)}" style="width: 100%; height: auto;"/>
`, "Hint", {
                dangerouslyUseHTMLString: true,  // 使得上面的 HTML 字符串可以正确显示
                confirmButtonText: "OK",
                callback: (action) => {
                    this.randomData = []
                    this.step = 0
                    this.isStart = false
                },
            })

        }
    }

    // 切换游戏图片
    setImg(img) {
        this.gameImg = img;
    }

    setLevel(level) {
        this.level = level;
        if (this.level == 3) {
            this.stepLimit = 100
        } else if (this.level == 4) {
            this.stepLimit = 200
        } else if (this.level == 5) {
            this.stepLimit = 300
        }
    }

    getFinishData() {
        let str = "";
        for (let i = 1, len = Math.pow(this.level, 2); i <= len; i++) {
            str += i;
        }
        return str;
    }

    getRandomData() {
        let randomData = [];
        let max = Math.pow(this.level, 2) - 1;
        while (randomData.length < max) {
            let random = Math.floor(Math.random() * max) + 1;
            if (randomData.indexOf(random) === -1) {
                randomData.push(random);
            }
        }
        randomData.push(max + 1);
        return randomData;
    }
}

export default Puzzle;