$(document).ready(function() {
    $('.editor').Editor()

    $('form').submit(function(){
        $('.editor').text($('.editor').Editor('getText'));
    })

    $('.editor').Editor('setText', $('.editor').val())
})