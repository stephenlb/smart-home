(function(){

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// PubNub Config
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var settings = {
    channel       : "futureChannel",
    publish_key   : 'demo-36',
    subscribe_key : 'demo-36'
};

var pubnub = PUBNUB(settings);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Publish Data
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'send-iot-signal', function(data) {
    PUBNUB.log( 'PUBLISHING', data );
    pubnub.publish({ channel : settings.channel, message : data });
} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Listen for Data
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
pubnub.subscribe({
    channel : settings.channel,
    message : receiver
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Data Receiver
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function receiver(data) {
    PUBNUB.log( 'RECEIVING', data );
    PUBNUB.events.fire( 'receive-iot-signal', data );
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// LOGGER
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.log = function() {
    try {
        var stiggy = (''+(new Date)).split(' ')[4] + ' ' +
            JSON.stringify( arguments );

        console.log(stiggy);

        PUBNUB.$('log').innerHTML = '<div>' + stiggy + '</div>' +
            PUBNUB.$('log').innerHTML.substr( 0, 4600 );
    } catch (e) {}
};

})();
