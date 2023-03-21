import fs, { link, promises as fsPromises } from 'fs';
import colors from 'colors';
import { existsSync } from 'node:fs';
import  { isAbsolute }  from 'node:path';
import path from 'path';


// How to read ./file.md?
async function readingFiles(file) {
  const fileContent = await fsPromises.readFile(file, {encoding: 'utf-8'});
  return fileContent;
}
export async function mdLinks (pathFile, options) {
  // Validando path
if (existsSync(pathFile)){
  console.log('THE PATH EXISTS'.rainbow);
  // Path absolute
  if (path.isAbsolute(pathFile)) {
    console.log('THE PATH IS ABSOLUTE!'.bgBlue);
  } else {
    console.log('CHANGING RELATIVE PATH TO ABSOLUTE...'.cyan);
    // Turn relative to absolute
    const relativeToAbsolute = path.resolve(pathFile);
    console.log( 'Your path now is absolute: '.bgCyan + relativeToAbsolute.cyan);
  }
  // Is a path to a file?
  if (fs.statSync(pathFile).isFile()) {
    console.log("PATH IS FILE: TRUE".underline.blue);
  } else{
    console.log('THIS IS NOT A FILE, TRY AGAIN'.underline.red);
  }
  // Getting file extension
  if (path.extname(pathFile) === ".md") {
    console.log('THIS IS AN '.yellow + '.md'.bgYellow + ' FILE(:'.yellow);
    let data = await readingFiles(pathFile);
    // Path is valid, absolut and a path file, so let´s read file
    let elements = data.match(/\[.*?\)/g);
    if (elements && elements.length > 0) {
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
    console.log('THIS IS NOT AN .md FILE, TRY AGAIN'.red.bold);
  }
} else {
  console.log('PATH NOT FOUND'.red);
} 
}
mdLinks(process.argv[2], {});