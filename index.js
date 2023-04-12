import fs, {promises as fsPromises, link } from 'fs';
import colors from 'colors';
import { validatePath, pathToAbsolute, pathIsFile, pathIsFolder, getFolderFiles, gettingUrls, gettingFileExt, filterFolderMdFiles, getUniqueUrls, getStats } from './api.js';

// How to read ./file?
export function readingFiles(file) {
  return fs.readFileSync(file, {encoding:'utf8'});
}
export function mdLinks (pathFile, options) {
  // Validating path
if (validatePath(pathFile)){
  console.log('THE PATH EXISTS'.rainbow);
  // Path absolute
  pathToAbsolute(pathFile);
  // Is a path to a file?
  let linksObject;
  let urlArray;
  let urlsObject;
  if (pathIsFile(pathFile)) {
    return new Promise((resolve, reject) => {
      console.log("PATH IS FILE: TRUE".underline.blue);
      // Getting file extension
      const isMdFile = gettingFileExt(pathFile);
      if(!isMdFile) {
        return Promise.reject('THIS IS NOT A MD FILE.')
      }
      // Getting links
      let data = readingFiles(pathFile);
      gettingUrls(data, pathFile, options).then(
        (data) => {
          urlsObject = data;
          linksObject = urlsObject.linksObject;
          urlArray = urlsObject.urlArray;
          if(options.stats) {
            const stats = getStats(options, urlsObject);
            resolve(stats)
          } else {
            resolve(linksObject);
          }
        }
      );
    })
  } else if (pathIsFolder(pathFile)) {
        return new Promise((resolve, reject) => {
          console.log('I S   A   F O L D E R'.bgMagenta);
          const folderFiles = getFolderFiles(pathFile); // Trae md files
          const folderMdFiles = filterFolderMdFiles(folderFiles);
          if (folderMdFiles.length === 0) {
            return Promise.reject('THERE IS NO MD FILES IN THIS DIRECTORY');
          }
          let mergeObjects = [];
          let mergeUrlsArray = [];
          let promiseArray = [];
          for (let i = 0; i < folderMdFiles.length; i++) {
              let data = readingFiles(folderMdFiles[i]);
              promiseArray.push(gettingUrls(data, pathFile+ "/" + folderMdFiles[i], options));
          }
          Promise.allSettled(promiseArray).then((resolvedArray) => {
            resolvedArray.map((promise) => {
              mergeObjects = [...mergeObjects, ...promise.value.linksObject];
              mergeUrlsArray = [...mergeUrlsArray, ...promise.value.urlArray]; // Un array con todos los links de mis archivos
            })
            linksObject = mergeObjects;
            urlArray = mergeUrlsArray; // Array con todos los links de todos los archivos
            if(options.stats) {
              const stats = getStats(options, {linksObject, urlArray});
              resolve(stats)
            } else {
              resolve(linksObject);
            }
          });
        })
      } else{
        return Promise.reject('THIS IS DIRECTORY DOES NOT HAVE VALID FILES, TRY AGAIN');
      }
    } else {
    return Promise.reject('THE PATH DOES NOT EXISTS');
  }
}