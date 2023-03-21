import { link, promises as fs } from 'fs';
import colors from 'colors';
import { existsSync } from 'node:fs';
import  { isAbsolute }  from 'node:path';
import path from 'path';


// Cómo leer ./archivo.md?
async function readingFiles(file) {
  const fileContent = await fs.readFile(file, {encoding: 'utf-8'});
  return fileContent;
}
export async function mdLinks (pathFile, options) {
  // Validando path
if (existsSync(pathFile)){
  console.log('THE PATH EXISTS'.rainbow);
  let data = await readingFiles(pathFile);
  // Path absolute
  if (path.isAbsolute(pathFile)) {
    console.log('THE PATH IS ABSOLUTE!'.bgBlue);
  } else {
    console.log('SORRY, THIS PATH IS NOT ABSOLUTE):'.bgCyan);
    // Turn relative to absolute
    const relativeToAbsolute = path.resolve(pathFile);
    console.log( 'Your path now is absolute: '.bgMagenta + relativeToAbsolute.magenta);
  }
  // Path válido y absoluto entonces lee archivo
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
} else {
  console.log('PATH NOT FOUND'.red);
} 
}

mdLinks(process.argv[2], {});
