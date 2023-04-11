import colors from 'colors';
import fs, {promises as fsPromises } from 'fs';
import { existsSync } from 'node:fs';
import path from 'path';
import { readingFiles } from './index.js';
import { httpRequest } from './ax.js';

// ✅ Function validate path
export const validatePath = (pathFile) => (existsSync(pathFile));
// ✅ Function check if path is file
export const pathIsFile = (pathFile) => (fs.statSync(pathFile).isFile());
// ✅ Function check if is directory
export const pathIsFolder = (pathFile) => (fs.statSync(pathFile).isDirectory()); 

// ✅ Function path for files (S I   F U N C I O N A)
export function pathToAbsolute(pathFile) {
    if (path.isAbsolute(pathFile)) {
        console.log('THE PATH IS ABSOLUTE!'.bgBlue);
    } else {
        console.log('CHANGING RELATIVE PATH TO ABSOLUTE...'.cyan);
        // Turn relative to absolute
        const relativeToAbsolute = path.resolve(pathFile);
        console.log( 'Your path now is absolute: '.bgCyan + relativeToAbsolute.cyan);
        return relativeToAbsolute;
    }
}

// ✅ Getting folder's files (S I   F U N C I O N A)
export function getFolderFiles(pathFile) {
    const folderPath = path.join(pathFile);
    //passsing directoryPath and callback function
    return fs.readdirSync(folderPath);
}

// ✅ Function filter folder md files
export function filterFolderMdFiles(files) {
    return files.filter(
        (file) => {
            return path.extname(file) === ".md"
        }
    )
}


// ✅ Function get file extension (S I   F U N C I O N A )
export function gettingFileExt(pathFile) {
    if (path.extname(pathFile) === ".md") {
        console.log(`${pathFile} ${'IS AN MD FILE(:'.magenta}`);
        return true;
    }
    return false;
}

// ✅ Getting URL's from files
export async function gettingUrls(data, pathFile, options) {
    // console.log('GETTING URLS...'.bold);
    let elements = data.match(/\[.*?\)/g);
    if (elements && elements.length > 0) {
        const urlArray = []; // empty array to storage the url
        const linksObject = [];
        for (const el of elements){
            let txt = el.match(/\[(.*?)\]/)[1]; // getting txt only
            let url = el.match(/\((.*?)\)/)[1]; // getting link only
            urlArray.push(url);
            let httpReqAnswer;
            const linkObj = {
                text: txt,
                href: url,
                file: pathFile
            }
            if (options.validate) {
                httpReqAnswer = await httpRequest(url);
                // console.log(httpReqAnswer);
                linkObj.status = httpReqAnswer.status;
                linkObj.ok = httpReqAnswer.ok;
            }
            linksObject.push(linkObj);
            // const getTotalLinks = (linksObject) => {return 'Total: ' + linksObject.length};
            // console.log(linksObject.length + 'Total de URLS'.bgRed);
            
        }
        return Promise.resolve({urlArray, linksObject})
    }
    
} 

// ✅ Get unique urls for stats
export function getUniqueUrls(urlArray) {
    let uniqueUrls = urlArray.filter((c, index) => {
        return urlArray.indexOf(c) === index;
    });
    return uniqueUrls
}

export function getStats(options, data) {
    if (options.stats && options.validate) {
        const arrayFiltered = data.linksObject.filter((element) => {
            return element.status !== 200;
        })
        console.log('You selected'.bold + ' --STATS --VALIDATE'.bold.magenta);
        const uniqueUrls = getUniqueUrls(data.urlArray);
        return `Total: ${data.linksObject.length}\nUnique: ${uniqueUrls.length}\nBroken: ${arrayFiltered.length}`
    } else if (options.stats) {
        console.log('You selected'.bold + ' --STATS'.bold.blue);
        const uniqueUrls = getUniqueUrls(data.urlArray);
        return `Total: ${data.linksObject.length}\nUnique: ${uniqueUrls.length}`
    } else if (options.validate) {
        const arrayFiltered = data.linksObject.filter((element) => {
            return element.status !== 200;
        })
        const uniqueUrls = getUniqueUrls(data.urlArray);
        return `Total: ${data.linksObject.length}\nUnique: ${uniqueUrls.length}\nBroken: ${arrayFiltered.length}`
    }
}
