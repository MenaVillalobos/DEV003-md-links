import colors from 'colors';
import fs, {promises as fsPromises } from 'fs';
import { existsSync } from 'node:fs';
import path from 'path';
import { readingFiles } from './index.js';

// Function validate path
export const validatePath = (pathFile) => (existsSync(pathFile));
// Function check if path is file
export const pathIsFile = (pathFile) => (fs.statSync(pathFile).isFile());
// Function check if is directory
export const pathIsFolder = (pathFile) => (fs.statSync(pathFile).isDirectory()); 

//Creando función para transformar ruta relativa
export function pathToRelative(pathFile) {
    if (path.isAbsolute(pathFile)) {
        console.log('THE PATH IS ABSOLUTE!'.bgBlue);
    } else {
        console.log('CHANGING RELATIVE PATH TO ABSOLUTE...'.cyan);
        // Turn relative to absolute
        const relativeToAbsolute = path.resolve(pathFile);
        console.log( 'Your path now is absolute: '.bgCyan + relativeToAbsolute.cyan);
    }
}

// Getting folder's files
export async function getFolderFiles(pathFile) {
    const arrFolder = [];
    const folderPath = path.join(pathFile);
    //passsing directoryPath and callback function
    fs.readdir(folderPath, async function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file 
        if (path.extname(file) === ".md") {
            console.log('Checking if there is an md file...'.blue);
            arrFolder.push(pathFile+ "/" + file);
            console.log(`${file} ${'IS AN MD FILE(:'.magenta}`);
            const arrTurnAbs = pathToRelative(file);
        } 
    });
for (let i = 0; i < arrFolder.length; i++) {
    let data = await readingFiles(arrFolder[i]);
    console.log('THIS IS YOUR FILE: '.magenta + arrFolder[i]);
    gettingUrls(data);
}
});
}

// Getting URL's from folder files
export function gettingUrls(data) {
    console.log('GETTING URLS...'.bold);
    let elements = data.match(/\[.*?\)/g);
    if (elements && elements.length > 0) {
      const urlArray = []; // empty array to storage the url
        for (const el of elements){
       let txt = el.match(/\[(.*?)\]/)[1]; // getting txt only
        // console.log(txt);
        let url = el.match(/\((.*?)\)/)[1]; // getting link only
        // console.log(url);
        urlArray.push(url);
        // const linkTxtArray = []; // empty array to storage the file txt
        // linkTxtArray.push(txt);
        const linksObject = [];
        linksObject.push({
            text: txt,
            href: url,
            file: 'necesito la ruta absoluta'
        })
        console.log(linksObject);
        }
        console.log(urlArray);
        return {urlArray}
    } 
} 