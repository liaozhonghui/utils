const sharp = require("sharp");

// 输入图片路径
const inputPath = "avatar.jpeg";
// 输出图片路径
const outputPath = "out2.jpg";

// 自定义裁剪参数
const cropOptions = {
  left: 200, // 从左边开始裁剪的像素
  top: 0, // 从顶部开始裁剪的像素
  width: 1300, // 裁剪区域的宽度
  height: 1000, // 裁剪区域的高度
};

sharp(inputPath)
  .metadata()
  .then((metadata) => {
    console.log("图片信息:");
    console.log(`宽度: ${metadata.width}px`);
    console.log(`高度: ${metadata.height}px`);
    console.log(`格式: ${metadata.format}`);
    console.log(`文件大小: ${metadata.size} bytes`);
  })
  .catch((err) => {
    console.error("获取图片信息时出错:", err);
  });

// 使用 sharp 裁剪图片
sharp(inputPath)
  .extract(cropOptions) // 自定义裁剪区域
  .resize(512, 512) // 调整为 150x150 像素
  .toFile(outputPath) // 保存裁剪后的图片
  .then(() => {
    console.log("图片裁剪成功，已保存到:", outputPath);
  })
  .catch((err) => {
    console.error("处理图片时出错:", err);
  });
