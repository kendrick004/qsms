$(document).ready(function() {
    listeners();

    //defaults
    $("button").attr("disabled", false);
    $(".number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $("#datetimepicker_timeline").datetimepicker({
        format: "YYYY-MM-DD",
        minDate: moment(),
    });

    $("#show-new-project").on("click", function() {
        $("#show-new-project").hide();
        $("#new-project").show();
        $("#new-project-name").focus();
    });

    $("#new-project-name").on("keyup", function(e) {
        switch(e.which) {
            case 13: add_project(); break;
            case 27: close_add_project(); break;
        }
    });
    $("#new-project-name").on("blur", function(e) {
        if($(this).val() == "") { close_add_project(); }
    });
    $("#add-project").on("click", add_project);
    $("#cancel-project").on("click", close_add_project);

    $("#edit-opp-card").on("hide.bs.modal", function() {
        $("#modal_id").val("");
        $("#modal_project_description").val("");
        $("#modal_project_type").val("");
        $("#modal_total_revenue").val("");
        $("#modal_gross_profit").val("");
        $("#modal_company").val("");
        $("#modal_industry").val("");
        $("#modal_address").val("");
        $("#modal_contact_person").val("");
        $("#modal_designation").val("");
        $("#modal_contact_no").val("");
        $("#modal_email_address").val("");
        $("#modal_lead_from").val("");
        $("#modal_assigned_to").val("");
        $("#modal_budget").val("");
        $("#modal_business_need").val("");
        $("#modal_authority").val("");
        $("#modal_timeline").val("");
        $(".collapse").collapse("hide");
    });
});

function listeners() {
    $("input.project-name").on("blur", function() {
        var id = $(this).attr("project-id");
        var name = $(this).val();

        $("#opp-" + id + " > div > div.overlay").show();
        $.ajax({
            url: 'opportunities/edit',
            type: 'POST',
            data: {
                id: id,
                project_name: name,
            },
            dataType: 'json',
            success: function(cb) {
                listeners();
                $("#opp-" + id + " > div > div.overlay").hide();
                console.log("Successfully updated.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    $(".del-opp").on("click", function() {
        var del_id = this.id;
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'opportunities/delete',
            type: 'POST',
            data: {
                id: del_id
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('<span class="fa fa-close" style="color:#0f0f0f; cursor:pointer;"></span>');
                delete_opp_card(del_id);
                console.log("Successfully deleted.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    $(".edit-opp").on("click", function() {
        var id = this.id;
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'opportunities/opportunity',
            type: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('<span class="fa fa-pencil" style="color:#0f0f0f;cursor:pointer;"></span>');

                $("#modal_id").val(cb.opportunity.id);
                $("#modal_project_name").val(cb.opportunity.project_name);
                if(cb.opportunity.project_description !== null) { $("#input_project_description").collapse("show"); $("#modal_project_description").val(cb.opportunity.project_description); }
                if(cb.opportunity.project_type !== null) { $("#input_project_type").collapse("show"); $("#modal_project_type").val(cb.opportunity.project_type); }
                if(cb.opportunity.total_revenue !== null) { $("#input_total_revenue").collapse("show"); $("#modal_total_revenue").val(cb.opportunity.total_revenue); }
                if(cb.opportunity.gross_profit !== null) { $("#input_gross_profit").collapse("show"); $("#modal_gross_profit").val(cb.opportunity.gross_profit); }
                if(cb.opportunity.company !== null) { $("#input_company").collapse("show"); $("#modal_company").val(cb.opportunity.company); }
                if(cb.opportunity.industry !== null) { $("#input_industry").collapse("show"); $("#modal_industry").val(cb.opportunity.industry); }
                if(cb.opportunity.address !== null) { $("#input_address").collapse("show"); $("#modal_address").val(cb.opportunity.address); }
                if(cb.opportunity.contact_person !== null) { $("#input_contact_person").collapse("show"); $("#modal_contact_person").val(cb.opportunity.contact_person); }
                if(cb.opportunity.designation !== null) { $("#input_designation").collapse("show"); $("#modal_designation").val(cb.opportunity.designation); }
                if(cb.opportunity.contact_no !== null) { $("#input_contact_no").collapse("show"); $("#modal_contact_no").val(cb.opportunity.contact_no); }
                if(cb.opportunity.email_address !== null) { $("#input_email_address").collapse("show"); $("#modal_email_address").val(cb.opportunity.email_address); }
                if(cb.opportunity.lead_from !== null) { $("#input_lead_from").collapse("show"); $("#modal_lead_from").val(cb.opportunity.lead_from); }
                if(cb.opportunity.assigned_to !== null) { $("#input_assigned_to").collapse("show"); $("#modal_assigned_to").val(cb.opportunity.assigned_to); }
                if(cb.opportunity.budget !== null) { $("#input_budget").collapse("show"); $("#modal_budget").val(cb.opportunity.budget); }
                if(cb.opportunity.business_need !== null) { $("#input_business_need").collapse("show"); $("#modal_business_need").val(cb.opportunity.business_need); }
                if(cb.opportunity.authority !== null) { $("#input_authority").collapse("show"); $("#modal_authority").val(cb.opportunity.authority); }
                if(cb.opportunity.timeline !== null) { $("#input_timeline").collapse("show"); $("#modal_timeline").val(moment(cb.opportunity.timeline).format('YYYY-MM-DD')); }

                $("#edit-opp-card").modal();
                console.log("Successfully fetched.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    $("#save-opp").on("click", function() {
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');
        
        $.ajax({
            url: 'opportunities/edit',
            type: 'POST',
            data: {
                id: $("#modal_id").val(),
                project_name: $("#modal_project_name").val(),
                project_description: $("#input_project_description").is(":visible") ? $("#modal_project_description").val() : undefined,
                project_type: $("#input_project_type").is(":visible") ? $("#modal_project_type").val() : undefined,
                total_revenue: $("#input_total_revenue").is(":visible") ? $("#modal_total_revenue").val() : undefined,
                gross_profit: $("#input_gross_profit").is(":visible") ? $("#modal_gross_profit").val() : undefined,
                company: $("#input_company").is(":visible") ? $("#modal_company").val() : undefined,
                industry: $("#input_industry").is(":visible") ? $("#modal_industry").val() : undefined,
                address: $("#input_address").is(":visible") ? $("#modal_address").val() : undefined,
                contact_person: $("#input_contact_person").is(":visible") ? $("#modal_contact_person").val() : undefined,
                designation: $("#input_designation").is(":visible") ? $("#modal_designation").val() : undefined,
                contact_no: $("#input_contact_no").is(":visible") ? $("#modal_contact_no").val() : undefined,
                email_address: $("#input_email_address").is(":visible") ? $("#modal_email").val() : undefined,
                lead_from: $("#input_lead_from").is(":visible") ? $("#modal_lead_from").val() : undefined,
                assigned_to: $("#input_assigned_to").is(":visible") ? $("#modal_assigned_to").val() : undefined,
                budget: $("#input_budget").is(":visible") ? $("#modal_budget").val() : undefined,
                business_need: $("#input_business_need").is(":visible") ? $("#modal_business_need").val() : undefined,
                authority: $("#input_authority").is(":visible") ? $("#modal_authority").val() : undefined,
                timeline: $("#input_timeline").is(":visible") ? $("#modal_timeline").val() : undefined,
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('Save');

                $("#opp-" + $("#modal_id").val() + " > div > h5 > input").val($("#modal_project_name").val());

                $("#edit-opp-card").modal("hide");

                console.log("Successfully updated.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });        
    });

    $(".move-opp").on("click", function() {
        var mode = $(this).attr("mode");
        var curr_scs = parseInt($(this).attr("stage"));
        var id = this.id;
        var name = $("#opp-" + id + " > div > h5 > input").val();

        var move_to_scs = curr_scs;
        if(mode == "forward") { move_to_scs = curr_scs + 1; }
        if(mode == "backward") { move_to_scs = curr_scs - 1; }

        $.ajax({
            url: 'opportunities/edit',
            type: 'POST',
            data: {
                id: id,
                sc_stage: move_to_scs
            },
            dataType: 'json',
            success: function(cb) {
                delete_opp_card(id);
                add_opp_card(move_to_scs - 1, id, name);

                listeners();

                console.log("Successfully moved.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });
}

function add_project() {
    $("#add-project").attr('disabled', true);
    $("#add-project").html('<span class="btn btn-xs bg-green fa fa-spin fa-spinner pull-right" style="color:#0f0f0f; cursor:pointer;"></span>');
    $.ajax({
        url: 'opportunities/add',
        type: 'POST',
        data: {
            project_name: $("#new-project-name").val(),
            color: 'FFFFFF'  /* change this when color changing is available already */
        },
        dataType: 'json',
        success: function(cb) {
            add_opp_card(0, cb.insert_id, $("#new-project-name").val());

            $("#add-project").attr('disabled', false);
            $("#add-project").html('<span class="btn btn-xs bg-green fa fa-plus pull-right" style="color:#0f0f0f; cursor:pointer;"></span>');

            $("#new-project-name").val("");
            $("#new-project").hide();
            $("#show-new-project").show();

            listeners();
            console.log("Successfully added.");
        },
        error: function(xhr, status, error) {
            console.log("Error: " + xhr.responseText);
        }
    });
}

function close_add_project() {
    $("#new-project-name").val("");
    $("#new-project").hide();
    $("#show-new-project").show();
}

function add_opp_card(scs_stage, id, project_name) {
    var move_options = "";
    if(scs_stage == 0) {
        move_options = '\
            <a><span class="move-opp btn btn-xs bg-green fa fa-chevron-right pull-right" mode="forward" stage="' + (scs_stage + 1) + '" id="' + id + '" style="color:#0f0f0f; cursor:pointer;"></span></a>\
        ';
    } else if(scs_stage == 3) { //#depends on the max sc stage
        move_options = '\
            <a><span class="move-opp btn btn-xs bg-green fa fa-chevron-left pull-right" mode="backward" stage="' + (scs_stage + 1) + '" id="' + id + '" style="color:#0f0f0f; cursor:pointer;"></span></a>\
        ';
    } else {
        move_options = '\
            <a><span class="move-opp btn btn-xs bg-green fa fa-chevron-right pull-right" mode="forward" stage="' + (scs_stage + 1) + '" id="' + id + '" style="color:#0f0f0f; cursor:pointer;"></span></a>\
            <a><span class="move-opp btn btn-xs bg-green fa fa-chevron-left pull-right" mode="backward" stage="' + (scs_stage + 1) + '" id="' + id + '" style="color:#0f0f0f; cursor:pointer;"></span></a>\
        ';
    }

    $("#SC" + scs_stage).append('\
        <div id="opp-' + id + '" style="width:auto; margin-bottom:20px;">\
            <div class="box box-success box-header input-container" style="margin:0">\
                <div class="overlay" style="display:none;">\
                    <i class="fa fa-refresh fa-spin"></i>\
                </div>\
                <button id="' + id + '" class="del-opp pull-right" href="#" data-target="#" style="margin:0; padding:0; background-color:transparent; border:none; outline:none; height:auto; width:auto;">\
                    <span class="fa fa-close" style="color:#0f0f0f; cursor:pointer;"></span>\
                </button>\
                <button id="' + id + '" class="edit-opp pull-left" href="#" data-target="#" style="margin:0; padding:0; background-color:transparent; border:none; outline:none; height:auto; width:auto;">\
                    <span class="fa fa-pencil" style="color:#0f0f0f;cursor:pointer;"></span>\
                </button>\
                <h5 class="box-header">\
                    <input class="project-name" project-id="' + id + '" id="header" size="" maxlength="50" type="text" placeholder="Project name..." style="z-index:1;cursor:pointer;border:hidden; background-color:transparent; outline:none; width:100%;" value="' + project_name + '"/>\
                </h5>\
                <div class="box-footer">'
                    + move_options +
                '</div>\
            </div>\
        </div>\
    '); //#Change this time to time when there's a change in design
}

function delete_opp_card(id) {
    $("#opp-" + id).remove();
}