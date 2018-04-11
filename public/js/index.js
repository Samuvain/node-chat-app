let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');

   /*  socket.emit('createMessage', {
        from: 'Samu',
        text: 'My first message.'
    }); */
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.')
});

socket.on('newMessage', (message) => {
    let li = $('<li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
    let li = $('<li>');
    let a = $(`<a target="_blank" href="${message.url}">My current location</a>`);
    
    li.text(`${message.from}: `);
    li.append(a);
    $('#messages').append(li);
});

/* socket.emit('createMessage', {
    from: 'Voima',
    text: 'vuf vuf'
}, (data) => {
    console.log('Got it', data);
}); */


$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name=message]').val()
    }, () => {

    });

});

let locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, (err) => {
        alert('Unable to fetch location.');
    })
});