import fs, {promises as fsPromises } from 'fs';
import colors from 'colors';
import { validatePath, pathToRelative, pathIsFile, pathIsFolder, getFolderFiles, gettingUrls} from './api.js';
import { existsSync } from 'node:fs';
import path from 'path';
import { httpRequest } from './ax.js';

// How to read ./file?
export async function readingFiles(file) {
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
      gettingUrls(data);
      
      }
    } else if (pathIsFolder(pathFile)) {
        getFolderFiles(pathFile); // Trae files md con la ruta absoluta
        console.log('I S   A   F O L D E R'.bgMagenta);
        gettingUrls(pathFile); // Debería leer archivos y extraer URLS
        } else{
        console.log('THIS IS DIRECTORY DOES NOT HAVE VALID FILES, TRY AGAIN'.underline.red);
      }
      
    } else {
    console.log('THE PATH DOES NOT EXISTS'.red);
  }
}

//    //AQUI VA CODIGO PARA STATS
//    if (options.stats) {
//     console.log('stats=true');
//     } else {
//     console.log('THIS IS NOT AN .md FILE, TRY AGAIN'.red.bold);
//     }

//     // options.validate = true:
//     if (options.validate) {
//       for (let i = 0; i < urlArray.length; i++) {
//         httpRequest(urlArray[i]);
//       }
//     }