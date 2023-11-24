import path from "node:path";
import fs from "node:fs";
import Bun from "bun";

const downloadImg = async (url, dst) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    await Bun.write(dst, new Uint8Array(buffer));
  } catch (error) {
    console.log(error);
  }
};

const loopAllPokemons = async (baseFolder, pokemons) => {
  for (const { name, img: url } of pokemons) {
    fs.mkdirSync(`./pokemons/${name}`);
    const filepath = path.join(`${baseFolder}/${name}/${name}.jpg`);

    await downloadImg(url, filepath);
  }
};

const checkFolder = (folder) => {
  if (fs.existsSync(folder)) {
    console.log(`Remove folder ${folder}`);
    fs.rmdirSync(folder, { recursive: true, force: true });
  }

  fs.mkdirSync(folder, { recursive: true });
};

const pokemons = JSON.parse(fs.readFileSync("../pokemons.json"));

const folder = path.resolve("pokemons");
(() => {
  checkFolder(folder);
  loopAllPokemons(folder, pokemons);
})(folder, pokemons);
