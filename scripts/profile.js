$(document).ready(function() {
    $("#save-profile").on("click", function() {
        $("#save-profile").attr('disabled', true);
        $("#save-profile").html('<span class="fa fa-spin fa-spinner pull-right" style="color:#0f0f0f; cursor:pointer;"></span>');
        $.ajax({
            url: 'profile/update',
            type: 'POST',
            data: {
                id: $("#id").val(),
                first_name: $("#first_name").val(),
                middle_name: $("#middle_name").val(),
                last_name: $("#last_name").val(),
                email_address: $("#email_address").val(),
                username: $("#username").val(),
                password: $("#password").val() != "" ? $("#password").val() : undefined,
            },
            dataType: 'json',
            success: function(cb) {
                $("#save-profile").html('Saved success.');
                console.log("Successfully updated.");
                window.location.reload(true);
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });        
    });
});