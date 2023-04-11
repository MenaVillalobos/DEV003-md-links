// const mdLinks = require('../');
import { mdLinks } from '../index.js';

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
})

test('mdLinks should return an error when path does not exist', () => {
  const path = '../arivo.md';
  const result = mdLinks(path, { validate: false });
  return result.catch(data => {
      expect(data).toBe('THE PATH DOES NOT EXISTS');
  });
})

test('mdLinks should return the links passing a valid file with validate option', () => {
  const mockedResult = [
    {
      text: 'Esto si es HBO',
      href: 'https://www.hbomax.com/mx/es',
      file: './archivo3.md',
      status: 200,
      ok: 'OK'
    }
  ];
  const path = './archivo3.md';
  const result = mdLinks(path, { validate: true });
  return result.then(data => {
      expect(data).toEqual(mockedResult);
  });
})

test('mdLinks should return the object text, href and file with NO validate option', () => {
  const mockedResult = [
    {
      text: 'Esto si es HBO',
      href: 'https://www.hbomax.com/mx/es',
      file: './archivo3.md',
    }
  ];
  const path = './archivo3.md';
  const result = mdLinks(path, { validate: false });
  return result.then(data => {
      expect(data).toEqual(mockedResult);
  });
})

test('mdLinks should return the object text, href, file with status and ok passing a valid folder with validate option', () => {
  const mockedResult = [
    {
      text: 'Esto si es HBO',
      href: 'https://www.hbomax.com/mx/es',
      file: './mockFolderFiles/archivo3.md',
      status: 200,
      ok: 'OK'
    }
  ];
  const path = './mockFolderFiles';
  const result = mdLinks(path, { validate: true });
  return result.then(data => {
      expect(data).toEqual(mockedResult);
  });
})

test('mdLinks should return the object text, href and file passing a valid folder with NO validate option', () => {
  const mockedResult = [
    {
      text: 'Esto si es HBO',
      href: 'https://www.hbomax.com/mx/es',
      file: './mockFolderFiles/archivo3.md',
    }
  ];
  const path = './mockFolderFiles';
  const result = mdLinks(path, { validate: false });
  return result.then(data => {
      expect(data).toEqual(mockedResult);
  });
})

test('mdLinks should return the number of total links and the number of unique links with stats option', () => {
  const mockedResult = `Total: 5\nUnique: 3`
  const path = './archivo2.md';
  const result = mdLinks(path, {stats: true});
  return result.then(data => {
    expect(data).toEqual(mockedResult);
  });
})

test('mdLinks should return all the stats info and the number of broken links with -s -v options', () => {
  const mockedResult = `Total: 5\nUnique: 3\nBroken: 1`
  const path = './archivo2.md';
  const result = mdLinks(path, {stats: true, validate: true});
  return result.then(data => {
    expect(data).toEqual(mockedResult);
  });
})

// test('mdLinks should return an error if the file is not an md file', () => {
//   const mockedResult = 'THIS IS NOT A MD FILE.';
//   const path = './Diagrama2.png';
//   const result = mdLinks(path, { validate: false });
//   return result.catch(data => {
//       expect(data).rejects.toBe(mockedResult);
//   });
// })