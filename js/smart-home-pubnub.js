(function(){

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// PubNub Config
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var pubnub = PUBNUB({ publish_key : 'demo-36', subscribe_key : 'demo-36' });


PUBNUB.events.bind( 'send-iot-signal', function(data) {
    console.log('durpaksldjf PUBLSIH HERE>...', data );
} );



})();
