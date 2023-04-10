// import { describe } from "yargs";
import { validatePath, pathToAbsolute, pathIsFile, pathIsFolder, getFolderFiles, filterFolderMdFiles, gettingFileExt, gettingUrls, getUniqueUrls } from "../api";

describe ('validatePath', () => {
    it('validatePath should return true for valid path', () => {
        const result = validatePath('./archivo.md');
        expect(result).toBeTruthy();
    })
    it('validatePath should return false for invalid path', () => {
        const result = validatePath('../a');
        expect(result).toBeFalsy();
    })
})

describe('pathToAbsolute', () => {
    it('pathToAbsolute should return an absolute path', () => {
        const result = './archivo2.md';
        expect(pathToAbsolute(result)).toBe('/Users/jimenavillalobos/Desktop/Laboratoria/DEV003-md-links/archivo2.md');
    })
})

describe ('pathIsFile', () => {
    it ('pathIsFile should return true if is a path to a file', () => {
        const result = pathIsFile('./Diagrama2.png')
        expect (result).toBeTruthy();
    })
    it ('pathIsFile should return false if is a path to a folder', () => {
        const result = pathIsFile('./test')
        expect (result).toBeFalsy();
    })
})

describe ('pathIsFolder', () => {
    it ('pathIsFolder should return true if is a path to a folder', () => {
        const result = pathIsFolder('./test');
        expect (result).toBeTruthy();
    })
    it('pathIsFolder should return false if is a path to a file', () => {
        const result = pathIsFolder('./archivo2.md');
        expect (result).toBeFalsy();
    })
})

describe('getFolderFiles', () => {
    it('getFolderFiles should return an array of files', () => {
        const result = './mockFolderFiles';
        expect(getFolderFiles(result)).toEqual(['.DS_Store', 'Img1.png', 'Img2.png']);
    })
})

describe('filterFolderMdFiles', () => {
    it('filterFolderMdFiles should return true for md files', () => {
        const auxilio = ['.DS_Store', 'Img1.png', 'Img2.png', 'archivo.md']
        const result = filterFolderMdFiles(auxilio);
        expect(result).toEqual(['archivo.md']);
    })
})

describe('gettingFileExt', () => {
    it('gettingFileExt should return true for md files', () => {
        const result = gettingFileExt('../archivo.md');
        expect(result).toBeTruthy();
    })
    it('gettingFileExt should return false for files with a different extension', () => {
        const result = gettingFileExt('../Diagrama2.png');
        expect(result).toBeFalsy();
    })
})

describe('gettingUrls', () => {
    it('gettingUrls should return an array of links', () => {
        const fileContent = '[Esto si es HBO] (https://www.hbomax.com/mx/es)';
        const result = gettingUrls(fileContent, '/', { validate: false });
        expect(result.urlArray).toEqual(['https://www.hbomax.com/mx/es']);
    })
})

describe('getUniqueUrls', () => {
    it('getUniqueUrls should return an array of unique links', () => {
        const links = ['https://www.homax.com/mx/es','http://arboleess.com/','https://www.hbomax.com/mx/es']
        const result = getUniqueUrls(links);
        expect(result).toEqual(['https://www.homax.com/mx/es','http://arboleess.com/','https://www.hbomax.com/mx/es']);
    })
})