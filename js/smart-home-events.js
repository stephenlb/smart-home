// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Show LEDs Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'menu.leds', function(event) {
    console.log('LEDs');

    // Hide Main Menu
    hide_menu(event);

} );


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Open Door
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'menu.door', function(event) {
    console.log('Open/Close Door');

    // Hide Main Menu
    hide_menu(event);

} );


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Advanced
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'menu.conf', function(event) {
    console.log('Clicked Advance');

    // Hide Main Menu
    hide_menu(event);

} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Hide Main Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function hide_menu(event) {
    console.log(event);

    play('click-beep-sound');

    if (hide_menu.invisible) {
        hide_menu.invisible = false;
        setTimeout( function(){ PUBNUB.events.fire('show-menu') }, 300 );
        return;
    }
    else {
        hide_menu.invisible = true;
        setTimeout( function(){ PUBNUB.events.fire('hide-menu') }, 300 );
    }

    animate( PUBNUB.$("octo-"+event.data+"-indicator"), [
        { 'd' : 0.2, 'r' : 10, 'opacity' : '0.5' },
        { 'd' : 0.2 }
    ] );

    animate( PUBNUB.$("octo-"+event.data), [
        { 'd' : 0.2, 'r' : -10 },
        { 'd' : 0.8 }
    ] );

}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Play Sounds
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function play(sound) {
    PUBNUB.$(sound).play();
}

