const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Voima';
        let text = 'Vuf vuf';
        let message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message).toMatchObject({from: from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = 'Voima';
        let latitude = 10;
        let longitude = 20;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(message).toMatchObject({from, url});
        expect(typeof message.createdAt).toBe('number');
    });
});