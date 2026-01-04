var selectedBand = "CHANGE_ME"; // Change this to your HEX mask

// 1. Professional UI Styling
const style = `
    #router-integ-ui {
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        width: 280px; background: #ffffff; border: 1px solid #d1d1d1;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: "Segoe UI", Arial, sans-serif;
        border-radius: 4px; overflow: hidden; color: #333;
    }
    .ui-header {
        background: #005a9e; color: white; padding: 10px 15px;
        font-size: 13px; font-weight: bold; display: flex; justify-content: space-between;
    }
    .ui-content { padding: 15px; }
    .ui-row { 
        display: flex; justify-content: space-between; 
        padding: 6px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px;
    }
    .ui-label { color: #666; font-weight: 500; }
    .ui-value { font-weight: bold; color: #000; }
    .status-dot { height: 8px; width: 8px; background: #bbb; border-radius: 50%; display: inline-block; margin-right: 5px; }
    .status-active { background: #28a745; box-shadow: 0 0 5px #28a745; }
`;

// Inject Styles
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

// 2. Create the GUI Structure
const guiHtml = `
    <div id="router-integ-ui">
        <div class="ui-header">
            <span>NETWORK MONITOR</span>
            <span id="sync-indicator"><span class="status-dot"></span>LIVE</span>
        </div>
        <div class="ui-content">
            <div class="ui-row"><span class="ui-label">Mode</span><span class="ui-value">LTE Band Lock</span></div>
            <div class="ui-row"><span class="ui-label">Target Mask</span><span class="ui-value" id="gui-mask">${selectedBand}</span></div>
            <div style="margin-top:10px; font-size:11px; font-weight:bold; color:#005a9e; text-transform:uppercase;">Signal Metrics</div>
            <div class="ui-row"><span class="ui-label">RSRP</span><span class="ui-value" id="gui-rsrp">--</span></div>
            <div class="ui-row"><span class="ui-label">SINR</span><span class="ui-value" id="gui-snr">--</span></div>
            <div class="ui-row"><span class="ui-label">RSRQ</span><span class="ui-value" id="gui-rsrq">--</span></div>
            <div class="ui-row"><span class="ui-label">RSSI</span><span class="ui-value" id="gui-rssi">--</span></div>
            <div id="gui-status" style="font-size:10px; color:#999; margin-top:10px; font-style:italic;">Initializing...</div>
        </div>
    </div>
`;

if(document.getElementById("router-integ-ui")) document.getElementById("router-integ-ui").remove();
document.body.insertAdjacentHTML('beforeend', guiHtml);

// 3. Logic & Refresh Loop
function updateMetric(id, val, unit = "") {
    const el = document.getElementById(id);
    if(el) el.innerText = val + unit;
}

$.ajax({
    type: "GET",
    url: "/goform/goform_get_cmd_process",
    data: { cmd: "wa_inner_version,cr_version,RD", multi_data: "1" },
    dataType: "json",
    success: function () {
        document.getElementById("gui-status").innerText = "Establishing lock...";
        
        $.ajax({
            type: "POST",
            url: "/goform/goform_set_cmd_process",
            data: {
                isTest: "false", goformId: "BAND_SELECT",
                is_gw_band: 0, gw_band_mask: 0,
                is_lte_band: 1, lte_band_mask: selectedBand
            },
            success: function () {
                document.getElementById("gui-status").innerText = "Syncing with tower...";
                setTimeout(() => {
                    document.getElementById("gui-status").innerText = "Connected";
                    document.querySelector(".status-dot").classList.add("status-active");
                    setInterval(fetchMetrics, 1000); 
                }, 8000);
            }
        });
    }
});

function fetchMetrics() {
    $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: { cmd: "lte_rsrp,lte_snr,lte_rsrq,lte_rssi", multi_data: "1" },
        dataType: "json",
        success: function (s) {
            updateMetric("gui-rsrp", s.lte_rsrp, " dBm");
            updateMetric("gui-snr", s.lte_snr, " dB");
            updateMetric("gui-rsrq", s.lte_rsrq, " dB");
            updateMetric("gui-rssi", s.lte_rssi, " dBm");
        }
    });
}
