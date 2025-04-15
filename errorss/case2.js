const fs = require("node:fs/promises");

(async () => {
  let data;
  try {
    data = await fs.readFile("a file that does not exist");
  } catch (err) {
    console.error("There was an error reading the file!", err);
    console.log("error:", err.code);
    return;
  }
  // Otherwise handle the data
})();
