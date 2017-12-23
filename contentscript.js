/*
 *  Injects the Juke Joint barcode reader into Vend's webregister UI.  This file does 90% of the magic.
 *  Copyright Brothers Brewery Ltd, 2017
 */

"use strict";

function ct_handle_input(conf, input) {
	// Barcode scanner detected so set focus on window (stops entry into search box)
	window.focus();

	// First try to add the barcode as a standard product
    window.postMessage(JSON.stringify({
        method: 'add-product',
        params: {
            sku: input,
        }
    }), window.location.origin); 

    // Then try price based barcode
        // Example: 210048035609
		// barcode format: 2|xxxxx|ppppp|
		//                 2| sku |price|
    var sku = input.substring(parseInt(conf.skuStart, 10), parseInt(conf.skuStop, 10)),
        price_start = parseInt(conf.priceStart, 10),
        price_stop = parseInt(conf.priceStop, 10);
    
    var price = Math.abs(parseInt(input.substring(price_start, price_stop), 10) / 100).toFixed(2);

    window.console.info('ct.INFO: barcode scanned. SKU: ' + sku );
    
    window.postMessage(JSON.stringify({
        method: 'add-product',
        params: {
            sku: sku,
            unit_price: price,
        }
    }), window.location.origin);    
    return;
}


function ct_init_input(conf, gs) {

	// Add an EventListener to captchure barcode scans
	$(document).scannerDetection({
		onComplete: function(e) {
			ct_handle_input(conf, e); 
			return false;
		}
	});
	// $(document).scannerDetection('0000010014264');
}


function ct_main(conf, gs) {
    ct_init_input(conf, gs);
}


function ct_check_global_search_exists() {
    var gs = document.getElementsByClassName("wr-global-search");
    return {exists: gs.length > 0, elements: gs};
}


function ct_display(conf, t) {
    var gs = ct_check_global_search_exists(),
        attempts = 0;

    console.log(gs);
    
    if (gs.exists) {
        if (typeof t !== 'null') {
            clearInterval(t);
        }
        // start main logic
        ct_main(conf, gs);
    } else {
        attempts++;
    }
}


function ct_ensure_ui(conf, t) {
    ct_display(conf, t);

    if (first_load) {
        // ensure ui is reloaded after navigating away from then returning to "Current Sale"
        var cs = document.querySelector('[ui-sref="webregister.current-sale.sale"]');

        //cs.addEventListener("click", function() {
        //    console.log('click');
        //    var t = setInterval(function() {ct_ensure_ui(conf, t)}, 500);
        //});
        
        first_load = false;
    }
}

var first_load = true;
chrome.storage.sync.get(null, function (conf) {
    var t = setInterval(function() {ct_ensure_ui(conf, t)}, 500);
});
