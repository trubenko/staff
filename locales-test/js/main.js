$(document).ready(function() {
    console.log('dsasd');

    $('#lang').on('change', function(e){
        $.ajax({
            method: 'get',
            url: `http://localhost:3000/lang/${$(e.target).val()}`
        }).then(data =>window.location.reload())
    });
});
