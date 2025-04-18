const Jimp = require("jimp");

/**
 * 判断颜色是否为亮色且为红/黄/蓝
 */
function isBrightColor(r, g, b) {
  // 亮度公式
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // 排除黑色和灰色
  const isGray = Math.abs(r - g) < 10 && Math.abs(g - b) < 10;
  // 红色、黄色、蓝色的简单判断
  const isRed = r > 180 && g < 100 && b < 100;
  const isYellow = r > 180 && g > 180 && b < 100;
  const isBlue = b > 180 && r < 100 && g < 100;
  return brightness > 150 && !isGray && (isRed || isYellow || isBlue);
}

/**
 * 获取图片中最常见的亮色（红/黄/蓝），规避黑色和灰色
 * @param {string} imagePath
 * @returns {Promise<string>} 返回rgb字符串，如'rgb(255,0,0)'
 */
async function getBrightBackgroundColor(imagePath) {
  const image = await Jimp.read(imagePath);
  const colorCount = {};
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    if (isBrightColor(r, g, b)) {
      const key = `${r},${g},${b}`;
      colorCount[key] = (colorCount[key] || 0) + 1;
    }
  });
  // 找出现次数最多的颜色
  let maxCount = 0;
  let bestColor = "255,255,255"; // 默认白色
  for (const [color, count] of Object.entries(colorCount)) {
    if (count > maxCount) {
      maxCount = count;
      bestColor = color;
    }
  }
  return `rgb(${bestColor})`;
}

module.exports = getBrightBackgroundColor;
