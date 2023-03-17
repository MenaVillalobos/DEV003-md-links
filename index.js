import { link, promises as fs } from 'fs';

// Cómo leer ./archivo.md?
async function readingFiles(file) {
  const fileContent = await fs.readFile(file, {encoding: 'utf-8'});
  return fileContent;
}

export async function mdLinks (path, options) {
  let data = await readingFiles(path);

// Leyendo links
  let elements = data.match(/\[.*?\)/g);
  if (elements != null && elements.length > 0) {
    for (const el of elements){
      let txt = el.match(/\[(.*?)\]/)[1]; // getting txt only
      console.log(txt);
      let url = el.match(/\((.*?)\)/)[1]; // getting link only
      console.log(url);
      const urlArray = []; // empty array to storage the url
      const linkTxtArray = []; // empty array to storage the file txt
      linkTxtArray.push(txt);
      urlArray.push(url);
      console.log(linkTxtArray);
      console.log(urlArray);
    }
  }
}

mdLinks(process.argv[2], {});
