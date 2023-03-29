import colors from 'colors';
import fs, {promises as fsPromises } from 'fs';
import { existsSync } from 'node:fs';
import path from 'path';

// Function validate path
export const validatePath = (pathFile) => (existsSync(pathFile));

// Function check if path is file
export const pathIsFile = (pathFile) => (fs.statSync(pathFile).isFile());
// Function check if is directory
export const pathIsFolder = (pathFile) => (fs.statSync(pathFile).isDirectory()); 
// Function reading directory
const readFolder = (pathFile) => (fs.readdirSync(pathFile)); 

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
export function getFolderFiles(pathFile) {
    const folderPath = path.join(pathFile);
    //passsing directoryPath and callback function
fs.readdir(folderPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file 
        if (path.extname(file) === ".md") {
            console.log('THIS IS AN .md FILE(:'.yellow);
            const arrFolder = [];
            const folderFile = arrFolder.push(file);
            arrFolder.push(pathToRelative(file));
            console.log(folderFile);
        } 
    });
});
}
