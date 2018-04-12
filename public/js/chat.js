let socket = io();

let scrollToBottom = () => {
    // Selectors
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', () => {
    console.log('Connected to server.');

    let params = $.deparam(window.location.search);
    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });


   /*  socket.emit('createMessage', {
        from: 'Samu',
        text: 'My first message.'
    }); */
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.')
});

socket.on('updateUserList', (users) => {
    let ol = $('<ol>');

    users.forEach((user) => {
        ol.append($('<li>').text(user));
    });

    console.log(ol)

    $('#users').html(ol);
});

socket.on('newMessage', (message) => {
    let template = $('#message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    let template = $('#location-message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

/* socket.emit('createMessage', {
    from: 'Voima',
    text: 'vuf vuf'
}, (data) => {
    console.log('Got it', data);
}); */


$('#message-form').on('submit', (e) => {
    e.preventDefault();
    
    let messageTextbox = $('input[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    });

});

let locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, (err) => {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location.').text('Send location');
    })
});