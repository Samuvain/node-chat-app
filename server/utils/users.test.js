const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Jon',
            room: 'Room 1'
        }, {
            id: '2',
            name: 'Tyrion',
            room: 'Room 2'
        }, {
            id: '3',
            name: 'Sansa',
            room: 'Room 1'
        }];
    });
    
    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Samu',
            room: 'Living room'
        }
        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let userId = '55';
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        let userId = '5';
        let user = users.getUser(userId);
        expect(user).toBeFalsy();
    });


    it('should return names of Room 1', () => {
        var userList = users.getUserList('Room 1');
        expect(userList).toEqual(['Jon', 'Sansa']);
    });

    it('should return names of Room 2', () => {
        var userList = users.getUserList('Room 2');
        expect(userList).toEqual(['Tyrion']);
    });
});