import fs, {promises as fsPromises, link } from 'fs';
import colors from 'colors';
import { validatePath, pathToAbsolute, pathIsFile, pathIsFolder, getFolderFiles, gettingUrls, gettingFileExt, filterFolderMdFiles, getUniqueUrls } from './api.js';

// How to read ./file?
export function readingFiles(file) {
  return fs.readFileSync(file, {encoding:'utf8'});
}
export function mdLinks (pathFile, options) {
  // Validando path
if (validatePath(pathFile)){
  console.log('THE PATH EXISTS'.rainbow);
  // Path absolute
  pathToAbsolute(pathFile);
  // Is a path to a file?
  let linksObject;
  let urlArray;
  if (pathIsFile(pathFile)) {
    console.log("PATH IS FILE: TRUE".underline.blue);
    // Getting file extension
    const isMdFile = gettingFileExt(pathFile);
    if(!isMdFile) {
      return Promise.reject('THIS IS NOT A MD FILE.')
    }
    // Getting links
    let data = readingFiles(pathFile);
    const urlsObject = gettingUrls(data, pathFile, options);
    linksObject = urlsObject.linksObject;
    urlArray = urlsObject.urlArray;
    } else if (pathIsFolder(pathFile)) {
        console.log('I S   A   F O L D E R'.bgMagenta);
        const folderFiles = getFolderFiles(pathFile); // Trae md files
        const folderMdFiles = filterFolderMdFiles(folderFiles);
        if (folderMdFiles.length === 0) {
          return Promise.reject('THERE IS NO MD FILES IN THIS DIRECTORY');
        }
        let mergeObjects = [];
        for (let i = 0; i < folderMdFiles.length; i++) {
            let data = readingFiles(folderMdFiles[i]);
            // console.log(data);
            const { urlArray, linksObject } = gettingUrls(data, pathFile+ "/" + folderMdFiles[i], options);
            // console.log(linksObject); // Un array de cada archivo
            mergeObjects = [...mergeObjects, ...linksObject]; // Un array con todos los objs de mis archivos
        }
        linksObject = mergeObjects;
        
        let mergeUrlsArray = [];
        for (let i = 0; i < folderMdFiles.length; i++) {
          let data = readingFiles(folderMdFiles[i]);
          // console.log(data);
          const { urlArray } = gettingUrls(data, pathFile+ "/" + folderMdFiles[i], options);
          // console.log(urlArray + '  E S T O   E S   U R L A R R A Y'.bgRed); // Un array de cada archivo
          mergeUrlsArray = [...mergeUrlsArray, ...urlArray]; // Un array con todos los links de mis archivos
      } 
        urlArray = mergeUrlsArray; // Array con todos los links de todos los archivos
      } else{
        return Promise.reject('THIS IS DIRECTORY DOES NOT HAVE VALID FILES, TRY AGAIN');
      }
      // AQUI VA CODIGO PARA STATS
        if (options.stats && options.validate) {
          console.log('You selected stats and validate:'.bold);
          console.log('TOTAL LINKS: '.blue + linksObject.length);
          getUniqueUrls(urlArray)
          console.log('AQUÍ PONDRÍA LOS BROKEN LINKS, SI LOS TUVIERA' + ' BROKEN: 0'.red)
        } else if (options.stats) {
          console.log('You selected stats:'.bold);
          console.log('TOTAL LINKS: '.blue + linksObject.length);
          getUniqueUrls(urlArray)
        } else if (options.validate) {
          console.log('You selected validate:'.bold);
          console.log('AQUÍ PONDRÍA LOS BROKEN LINKS, SI LOS TUVIERA' + ' BROKEN: 0'.red)
        }
      return Promise.resolve(linksObject);
    } else {
    return Promise.reject('THE PATH DOES NOT EXISTS');
  }
}


//     // options.validate = true:
//     if (options.validate) {
//       for (let i = 0; i < urlArray.length; i++) {
//         httpRequest(urlArray[i]);
//       }
//     }