$(document).ready(function() {
    $('.editor').wysiwyg({
        highlight: true,
        debug: true
    });

    $('[data-delete]').click(function(e) {
        const data = $(this).data()

        $('.form-delete').attr('action', data.delete)
    })
})