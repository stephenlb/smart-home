(function(){

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Main
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function main() {

    // Show Main Menu GUI
    setTimeout( show_menu, 300 );

}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Show/Hide Main Menu "Octo Buttons" actually Hexigons...
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function show_menu(visible) {
    var setit = visible ? "octo-off-screen" : "octo-on-screen";
    PUBNUB.$("octo-group").className    = setit;
    PUBNUB.$("numbers-group").className = setit;
    PUBNUB.$("labels-group").className  = setit;
}
PUBNUB.events.bind( 'show-menu', function() { show_menu(0) } );
PUBNUB.events.bind( 'hide-menu', function() { show_menu(1) } );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// GUI Hitboxes
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var docbody = document.getElementsByTagName('body')[0];
delegate( docbody, 'click' );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Prevent Safari Scroll but also Allow GUI Actions
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
PUBNUB.bind( 'touchmove', document, function(e) {
    return bubblefind( e, 'data-action' ).result;
} );


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// GET ELEMENT ACTION DATA ATTRIBUTE AND FIRE ASSOCIATED EVENT
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function delegate( element, namespace ) {
    PUBNUB.bind( 'mousedown,touchstart', element, function(e) {
        var data   = bubblefind( e, 'data-value' )
        ,   action = bubblefind( e, 'data-action' );

        if (!action.target) return true;

        PUBNUB.events.fire( namespace + '.' + action.result, {
            action : action.result,
            target : action.target,
            data   : data.result
        } );

        return true;
    } );
}

function bubblefind( e, attr ) {
    var target = e.target || e.srcElement || {}
    ,   result = '';
    while (target) {
        result = PUBNUB.attr( target, attr );
        if (result) break;
        target = target.parentNode;
    }
    return { result : result, target : target };
}

function first_div(elm) { return elm.getElementsByTagName('div')[0] }
function safe(text)     { return (text||'').replace( /[<>]/g, '' )  }


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// RUN MAIN
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
main();

})();
