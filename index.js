import fs, {promises as fsPromises } from 'fs';
import colors from 'colors';
import { validatePath, pathToRelative, pathIsFile, pathIsFolder, getFolderFiles } from './api.js';
import { existsSync } from 'node:fs';
import path from 'path';
import { httpRequest } from './ax.js';

// How to read ./file?
async function readingFiles(file) {
  const fileContent = await fsPromises.readFile(file, {encoding: 'utf-8'});
  return fileContent;
}
export async function mdLinks (pathFile, options) {
  // Validando path
if (validatePath(pathFile)){
  console.log('THE PATH EXISTS'.rainbow);
  // Path absolute
  pathToRelative(pathFile);
  // Is a path to a file?
  if (pathIsFile(pathFile)) {
    console.log("PATH IS FILE: TRUE".underline.blue);

      // Getting file extension
  if (path.extname(pathFile) === ".md") {
    console.log('THIS IS AN '.yellow + '.md'.bgYellow + ' FILE(:'.yellow);
    let data = await readingFiles(pathFile);
    // Reading .md file
    let elements = data.match(/\[.*?\)/g);
    if (elements && elements.length > 0) {
      const urlArray = []; // empty array to storage the url
      const linksObject = [];
      for (const el of elements){
       let txt = el.match(/\[(.*?)\]/)[1]; // getting txt only
        // console.log(txt);
        let url = el.match(/\((.*?)\)/)[1]; // getting link only
        // console.log(url);
        urlArray.push(url);
        // const linkTxtArray = []; // empty array to storage the file txt
        // linkTxtArray.push(txt);
        linksObject.push({
          text: txt,
          href: url,
          file: pathFile,
        });
      }
      // options.validate = true:
      if (options.validate) {
        for (let i = 0; i < urlArray.length; i++) {
          httpRequest(urlArray[i]);
        }
      }
      console.log(linksObject);
    }
    //AQUI VA CODIGO PARA STATS
    if (options.stats) {
      console.log('stats=true');
    }
  } else {
    console.log('THIS IS NOT AN .md FILE, TRY AGAIN'.red.bold);
  }
  } else if (pathIsFolder(pathFile)) {
    getFolderFiles(pathFile);
    console.log('I S   A   F O L D E R'.bgMagenta);
  } else{
    console.log('THIS IS NOT A FILE, TRY AGAIN'.underline.red);
  }
  } else {
  console.log('THE PATH DOES NOT EXISTS'.red);
}
}