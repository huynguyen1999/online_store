$( '#formRegister' ).on( 'submit', function ( event )
{
    event.preventDefault();
    const username = $( '#txtUsername' ).val();

    $.getJSON( `/account/is-available?user=${ username }`, data =>
    {
        console.log( data );
        if ( data === true )
            $( '#formRegister' ).off( 'submit' ).submit();
        else
            alert( 'username not available' );
    } );

} );



$( '#txtDOB' ).datetimepicker( {
    format: 'd/m/Y',
    timepicker: false,
    mask: true,
} );
