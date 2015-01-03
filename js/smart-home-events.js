// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// SHOW LEDs Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var led_id = 0;
PUBNUB.events.bind( 'click.leds', function(event) {
    PUBNUB.log('LEDs');

    // Show Sub Menu (Lights/LEDs)
    show_submenu('light-menu');

    // Hide Main Menu
    hide_menu(event);

} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Transmit LED Settings
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var transmit_led = PUBNUB.updater( function() {
    PUBNUB.events.fire( 'send-iot-signal', {
        ledID          : +led_id,
        minPulseLength : +PUBNUB.$('min-pulse').value,
        maxPulseLength : +PUBNUB.$('max-pulse').value,
        waitFloor      : +PUBNUB.$('min-wait').value,
        waitCeiling    : +PUBNUB.$('max-wait').value
    } );
}, 200 );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// LED SLIDER Settings
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var ledlights = PUBNUB.$('light-menu').getElementsByTagName('input');
PUBNUB.each( ledlights, function(light) {
    PUBNUB.bind( 'touchmove,mousemove', light, function(e) {
        transmit_led();
        return true;
    } );
} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// SHOW Open Door Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'click.door-update', function(event) {
    PUBNUB.log( 'Update Door State', event );
    play('click-sound');
    event.target.className = 'door-button-click';
    setTimeout( function() {
        event.target.className = 'door-close-click';
    }, 300 );

    var signal = {};
    signal[event.value] = true;
    PUBNUB.events.fire( 'send-iot-signal', signal );
} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// SHOW Open Door Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'click.door', function(event) {
    PUBNUB.log('Open/Close Door');

    // Show Sub Menu (Lights/LEDs)
    show_submenu('door-menu');

    // Hide Main Menu
    hide_menu(event);

} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ADVANCED Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'click.conf', function(event) {
    PUBNUB.log('Clicked Debug');

    // Show Sub Menu (Lights/LEDs)
    show_submenu('debug-menu');

    // Hide Main Menu
    hide_menu(event);

} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// LIGHT Selection and Management
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'click.light-select', function(event) {
    PUBNUB.log( 'LIGHT SELECT', event );

    var lights = PUBNUB.$('light-selector').getElementsByTagName('div');

    play('click-sound');

    // Set the targeted LED
    led_id = +event.data;
    transmit_led();

    PUBNUB.each( lights, function(light) {
        if (PUBNUB.attr( light, 'data-value' ) == event.data)
            light.className = "light-select light-selected";
        else
            light.className = "light-select light-unselected";
    } );
} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// LIGHT Ragne Selectors
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.events.bind( 'click.light-slider', function(event) {
    PUBNUB.log(event);
} );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Show/Hide Sub Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function show_submenu(menu) {
    PUBNUB.log( 'Showing', menu );

    PUBNUB.$(menu).className = "sub-menu-visible";
}
function hide_submenu(menu) {
    PUBNUB.$(menu).className = "sub-menu";
}
function hide_all_submenus() {
    PUBNUB.each( [
        'light-menu',
        'debug-menu',
        'door-menu'
    ], hide_submenu );
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Hide Main Menu
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function hide_menu(event) {
    PUBNUB.log(event);


    play('click-beep-sound');

    if (hide_menu.invisible) {
        hide_menu.invisible = false;
        setTimeout( function(){ PUBNUB.events.fire('show-menu') }, 1 );
        return hide_all_submenus();
    }
    else {
        hide_menu.invisible = true;
        setTimeout( function(){ PUBNUB.events.fire('hide-menu') }, 1 );
    }

    0&&animate( PUBNUB.$("octo-"+event.data+"-indicator"), [
        { 'd' : 0.2, 'r' : 10, 'opacity' : '0.5' },
        { 'd' : 0.2 }
    ] );

    0&&animate( PUBNUB.$("octo-"+event.data), [
        { 'd' : 0.2, 'r' : -10 },
        { 'd' : 0.8 }
    ] );

}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Play Sounds
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function play(sound) {
    try      { PUBNUB.$(sound).play() }
    catch(e) { }
}

