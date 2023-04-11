import { httpRequest } from "../ax.js";

describe('httpRequest', () => {
    it('httpRequest succed', () => {
        const result = httpRequest('https://www.facebook.com/');
        result.then((resp) => {
            expect(resp).toEqual({ status: 200, ok: 'OK' })
        }).catch((err) => {
            console.log(err, 'hola');
        })
    })

    it('httpRequest failed', () => {
        const result = httpRequest('https://dev.to/_staticvoid/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c599');
        result.then((resp) => {
            expect(resp).toEqual({ status: 404, ok: 'Not Found' })
        }).catch((err) => {
            console.log(err, 'hola');
        })
    })

    it('httpRequest failed', () => {
        const result = httpRequest('https://www.homax.com/mx/es');
        result.then((resp) => {
            expect(resp).toEqual({ status: 500, ok: 'Internal Server Error' })
        }).catch((err) => {
            console.log(err, 'hola');
        })
    })

    it('httpRequest failed', () => {
        const result = httpRequest('http://arboleess.com/');
        result.then((resp) => {
            expect(resp).toEqual({ status: 'The request was made but no response was received', ok: 'Fail' })
        }).catch((err) => {
            console.log(err, 'hola');
        })
    })
})
