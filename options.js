/*
 *  Injects the Campus Trading barcode reader into Vend's webregister UI.  This file displays the Chrome extension option dialog.
 *  Copyright Campus Trading, 2017
*/


"use strict";


function getElement(id) {
    return document.getElementById(id);
}


// Saves options to chrome.storage
function save_options() {
    var barcode_len = getElement('barcode_len').value,
        barcode_sku_start = getElement('barcode_sku_start').value,
        barcode_sku_stop = getElement('barcode_sku_stop').value,
        barcode_price_start = getElement('barcode_price_start').value,
        barcode_price_stop = getElement('barcode_price_stop').value
        
    chrome.storage.sync.set({
        len: barcode_len,
        skuStart: barcode_sku_start,
        skuStop: barcode_sku_stop,
        priceStart: barcode_price_start,
        priceStop: barcode_price_stop

    }, function () {
        // Update status to let user know options were saved.
        var status = getElement('status');
        status.textContent = 'Options saved.';
        
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        len: 12,
        skuStart: 1,
        skuStop: 6,
        priceStart: 6,
        priceStop: 11

    }, function (items) {
        getElement('barcode_len').value = items.len;
        getElement('barcode_sku_start').value = items.skuStart;
        getElement('barcode_sku_stop').value = items.skuStop;
        getElement('barcode_price_start').value = items.priceStart;
        getElement('barcode_price_stop').value = items.priceStop;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
getElement('save').addEventListener('click', save_options);