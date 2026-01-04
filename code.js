$.ajax({
    type: "GET",
    url: "/goform/goform_get_cmd_process",
    data: { cmd: "wa_inner_version,cr_version,RD", multi_data: "1" },
    dataType: "json",
    success: function (res) {
        $.ajax({
            type: "POST",
            url: "/goform/goform_set_cmd_process",
            data: {
                isTest: "false",
                goformId: "BAND_SELECT",
                is_gw_band: 0,
                gw_band_mask: 0,
                is_lte_band: 1,
                lte_band_mask: "CHANGE_ME" // CHANGE THIS TO ANYTHING FROM README OR CHECK ON THE WEB FOR YOUR SPECIFIC BANDS!
            },
            success: function (data) { console.log("Applied."); },
            error: function () { console.log("Failed."); }
        });
    }
});
