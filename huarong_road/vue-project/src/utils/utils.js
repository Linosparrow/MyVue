//获取大图片路径
export function getGameImgFile(url) {
    return new URL(`../assets/images/gameImgs/${url}.jpg`, import.meta.url).href;
}

//获取大图片
export function getBigImg(gameImg) {
    return new Promise(async (resolve, reject) => {
        try {
            const bigImgPath = getGameImgFile(gameImg);
            const bigImg = new Image();
            bigImg.src = bigImgPath;
            bigImg.onload = () => {
                resolve(bigImg);
            }
        } catch (error) {
            reject(error);
        }
    });
}

//获取小图片
export function getSmallImg(gameImg, level, index) {
    return new Promise(async (resolve, reject) => {
        try {
            const bigImgPath = getGameImgFile(gameImg);
            const bigImg = new Image();
            bigImg.src = bigImgPath;
            bigImg.onload = () => {
                const size = bigImg.width / level;
                const row = Math.floor((index-1)/level);
                const col = (index-1)%level;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(bigImg, col*size, row*size, size, size, 0, 0, size, size);
                resolve(canvas.toDataURL());
            }
        } catch (error) {
            reject(error);
        }
    });
}

class Mode {
    constructor(gameImg, level) {
      this.gameImg = gameImg;
      this.level = level;
    }
}