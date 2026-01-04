var selectedBand = "CHANGE_ME"; // Change this.

console.log("Initializing Band Lock sequence...");
console.log("Target HEX Mask: " + selectedBand);

$.ajax({
    type: "GET",
    url: "/goform/goform_get_cmd_process",
    data: { cmd: "wa_inner_version,cr_version,RD", multi_data: "1" },
    dataType: "json",
    success: function (res) {
        console.log("Gateway connection established. Processing POST request...");
        
        $.ajax({
            type: "POST",
            url: "/goform/goform_set_cmd_process",
            data: {
                isTest: "false",
                goformId: "BAND_SELECT",
                is_gw_band: 0,
                gw_band_mask: 0,
                is_lte_band: 1,
                lte_band_mask: selectedBand
            },
            success: function (data) { 
                console.log("Command accepted. Applying new band configuration...");
                console.log("Waiting 20 seconds for modem synchronization and signal stabilization...");
                
                // 20-second delay to allow the modem to handshake with the new tower/frequency
                setTimeout(function() {
                    console.log("Retrieving diagnostic values from modem...");
                    
                    $.ajax({
                        type: "GET",
                        url: "/goform/goform_get_cmd_process",
                        data: { cmd: "lte_rsrp,lte_snr,lte_rsrq,lte_rssi", multi_data: "1" },
                        dataType: "json",
                        success: function (signal) {
                            console.log("--- NETWORK DIAGNOSTIC REPORT ---");
                            console.log("RSRP: " + signal.lte_rsrp + " dBm");
                            console.log("SINR: " + signal.lte_snr + " dB");
                            console.log("RSRQ: " + signal.lte_rsrq + " dB");
                            console.log("RSSI: " + signal.lte_rssi + " dBm");
                            console.log("---------------------------------");
                            console.log("Operation complete. Monitor SINR for stability.");
                        }
                    });
                }, 20000); 
            },
            error: function () { 
                console.log("Error: Failed to transmit BAND_SELECT command."); 
            }
        });
    }
});
