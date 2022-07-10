document.getElementById('id_Blue').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: setBackGroundColorBlue
        });
    });
}
document.getElementById('id_Red').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: setBackGroundColorRed
        });
    });
}
document.getElementById("idSave").onclick = () => {
    localStorage['memo'] = document.getElementById('idToken').value;
    localStorage['wsURL'] = document.getElementById('idWebSiteURL').value;
    //let url = document.getElementById("idURL").value;
}
document.getElementById("idRetrieve").onclick = () => {
    var token = ''; //"shpat_ad94fa02cf5482e1eZ11Ze5b9ee0Z94Z"
    chrome.storage.local.get(["idWebSiteURL", "idToken"], function(data) {
        token = data.idToken;
        setWebObject(data);
        orders(token);
    });
}
document.getElementById("idBtnSKU").onclick = (e) => {
    var obj = e.target;
    console.log(obj);
    getSKU();

}

function setBackGroundColorRed() {
    // document.body.style.backgroundColor = 'red';
    document.getElementById('submit').style.backgroundColor = 'red';
    document.getElementById('ownerApply').style.backgroundColor = 'red';

}

function setBackGroundColorBlue() {
    document.getElementById('submit').style.backgroundColor = 'blue';
    document.getElementById('ownerApply').style.backgroundColor = 'yellow';
}

function setOrdersInPage(o) {
    OrdersInPage = o;
    // console.log(OrdersInPage);
}

function updateSKU(variantObj) {
    if (OrdersInPage != null && variantObj != null) {
        // console.log("updateSKU0:"+variantObj.sku);
        for (var i = 0; i < OrdersInPage.length; i++) {
            // console.log("updateSKU3:"+OrdersInPage[i]);
            for (var n = 0; n < OrdersInPage[i].line_items.length; n++) {
                var item = OrdersInPage[i].line_items[n];
                // if(item.sku!=null || item.sku.length>0){
                //     continue;
                // }
                // console.log("updateSKU1:"+item.variant_id+"-"+variantObj.id);
                if (item.variant_id === variantObj.id) {
                    item.sku = variantObj.sku;
                    item.barcode = variantObj.barcode;
                    // console.log("updateSKU2:"+item.sku);
                    var doc = document.getElementById('sku' + variantObj.id + "_" + item.id);
                    var barcode = document.getElementById('bc' + variantObj.id + "_" + item.id);
                    if (doc != null) {
                        doc.innerHTML = variantObj.sku;
                    }
                    if (barcode != null) {
                        barcode.innerHTML = variantObj.barcode;
                    }

                    continue;
                }
            }
        }
    }
}

function setWebObject(o) {
    WebObject = o;
    // console.log(WebObject);
}

function reWriteHtmlOrdersList() {
    chrome.storage.local.get("orders", function(data) {
        var os = data.orders;
        setOrdersInPage(os)
        rewriteOrders(os);
    });
    // chrome.storage.local.get("orders", function(data) {
    //     var os = data.orders;
    //     rewriteOrders(os);
    // });
}

function requestSKUFromShopify(variant, token, ordersAll) {
    var variant_id = variant.variant_id;
    console.log(variant_id + "-" + token);
    // return;
    fetch("https://benemax-health.myshopify.com/admin/api/2022-07/variants/" + variant_id + ".json", {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Shopify-Access-Token": token
            },
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Response was not ok.');
        })
        .then(data => {
            // console.log(data);
            var variantObjF = JSON.parse(data);
            var variantObj = variantObjF.variant;
            // console.log(ordersAll.length);
            // chrome.storage.local.set(ordersAll);
            updateSKU(variantObj)
            document.getElementById('idMsg').innerHTML = variantObj.sku;
        })
        .catch(error => {
            document.getElementById('idMsg').innerHTML = error;
        })
}

function listSKU(orders) {
    if (orders != null) {
        chrome.storage.local.get(["idWebSiteURL", "idToken"], function(data) {
            var token = data.idToken; ///admin/api/2022-07/variants/808950810.json
            for (var i = 0; i < orders.length; i++) {
                // txt=txt +"\n\r"+os[i].id;
                var idLi = "id" + orders[i].id;
                var idUl = "idUL" + orders[i].id;
                // console.log(idLi);
                if (orders[i].line_items.length > 0) {
                    for (var ii = 0; ii < orders[i].line_items.length; ii++) {
                        // console.log(orders[i].line_items[ii]);
                        // console.log(token);
                        if (orders[i].line_items[ii].sku == null || orders[i].line_items[ii].sku.length <= 0) {
                            requestSKUFromShopify(orders[i].line_items[ii], token, orders);
                        } else {

                        }
                    }

                }
            }
        });

    }
}

function getSKU() {
    chrome.storage.local.get("orders", function(data) {
        var os = data.orders;
        listSKU(os);
    });
}

function orders(token) {
    document.getElementById('idMsg').innerHTML = "";
    fetch("https://benemax-health.myshopify.com/admin/api/2022-07/orders.json?status=any", {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Shopify-Access-Token": token
            },
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Response was not ok.');
        })
        .then(data => {
            var txt = "";
            var o = JSON.parse(data);
            chrome.storage.local.set(o, function() { console.log("orders saved ok"); });
            var os = o.orders;
            setOrdersInPage(os)
            if (os != null) {
                rewriteOrders(os);
                // for(var i=0;i<os.length;i++)
                // {
                //     // txt=txt +"\n\r"+os[i].id;
                //     var idLi="id"+os[i].id;
                //     var idUl="idUL"+os[i].id;
                //     addElementLi("idUL00",idLi,os[i].id+"-"+os[i].name+"-"+os[i].source_name);
                //     addElementUL(idLi,idUl);
                //     if(os[i].line_items.length>0){
                //         for(var ii=0;ii<os[i].line_items.length;ii++){
                //             addElementLi(idUl,"id"+os[i].line_items[ii].id,getLineItemHtml(os[i].line_items[ii]));
                //         }
                //     }
                // }
                //  document.getElementById('idMsg').value = txt;
            } else {
                document.getElementById('idMsg').innerHTML = "";
            }

        })
        .catch(error => {
            document.getElementById('idMsg').innerHTML = error;
        })
}

function rewriteOrders(os) {
    if (os != null) {
        document.getElementById("idUL00").remove();
        addElementUL("subscrDiv", "idUL00");
        for (var i = 0; i < os.length; i++) {
            // txt=txt +"\n\r"+os[i].id;
            var idLi = "id" + os[i].id;
            var idUl = "idUL" + os[i].id;
            if (os[i].source_name.indexOf("subscription") != -1) { //subscription_contract
                addElementLi("idUL00", idLi, os[i].id + "-" + os[i].name + "-<span style='color:green;font-weight:bold'>" + os[i].source_name + "<span>" + os[i].created_at);
                addElementUL(idLi, idUl);
                if (os[i].line_items.length > 0) {
                    for (var ii = 0; ii < os[i].line_items.length; ii++) {
                        addElementLi(idUl, "id" + os[i].line_items[ii].id, getLineItemHtml(os[i].line_items[ii]));
                    }
                }
            } else {
                // addElementLi("idUL00",idLi,os[i].id+"-"+os[i].name+"-"+os[i].source_name);
            }

        }
        //  document.getElementById('idMsg').value = txt;
    }
}
// function replacer(key, value) {
//     if (typeof value === "string") {
//       return undefined;
//     }
//     return value;
//   }

function getLineItemHtml(item) {
    //var h = JSON.stringify(item,["sku","id","name","price","product_id","variant_id","title","vendor"],2);
    var h = "sku=<span id='sku" + item.variant_id + "_" + item.id + "' style='color:blue;font-weight:bold'>" + item.sku + "</span>" +
        //"<button id='idBtnSKU" + item.variant_id + "' value='" + item.variant_id + "' onclick='retrieveSKU(this,id)'>Get...</button>" +
        "<br>" + "id=" + item.id + "<br>" +
        "name=" + item.name + "<br>" + "title=" + item.title + "<br>" + "vendor=" + item.vendor + "<br>" +
        "product_id=" + item.product_id + "<br>" + "variant_id=" + item.variant_id + "<br>" +
        "barcode=<span id='bc" + item.variant_id + "_" + item.id + "' style='color:#ef1666;font-weight:bold'>" + item.barcode + "</span>";
    return h;
}

function addElementDiv(obj) {
    var parent = document.getElementById(obj);
    var di = document.createElement("div");
    di.setAttribute("id", "subscrDiv");
    di.innerHTML = '<h2>"source_name": "subscription_contract"</h2>';
    parent.appendChild(di);
}

function addElementUL(obj, idUl) {
    var d = document.getElementById(obj);
    var ul = document.createElement("ul");
    ul.setAttribute("id", idUl);
    // ul.innerHTML ="ul";
    d.appendChild(ul);
}

function addElementLi(obj, newli, innerHTML) {
    var ul = document.getElementById(obj);
    var li = document.createElement("li");
    li.setAttribute("id", newli);
    li.innerHTML = innerHTML;
    ul.appendChild(li);
}

function clearLocalStorage() {
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    })
}

function test() {
    fetch("https://www.google.com/", {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Response was not ok.');
        })
        .then(data => {
            document.getElementById('idToken').value = data;
        })
        .catch(error => {
            document.getElementById('idToken').value = error;
        })
}

window.onload = () => {
    let OrdersInPage = null;
    let WebObject = null;
    let memo = localStorage['memo'];
    if (memo == null) {
        memo = "";
    }
    document.getElementById("idToken").value = memo;
    let wsURL = localStorage['wsURL'];
    if (wsURL == null) {
        wsURL = "";
    }
    document.getElementById("idWebSiteURL").value = wsURL;
    let tmp = { "idWebSiteURL": wsURL, "idToken": memo };
    chrome.storage.local.set(tmp, function() { console.log("saved ok"); });
    setWebObject(tmp);
    //chrome.storage.local.get("idWebSiteURL",function(data){ console.log(data); } );
    //chrome.storage.local.get(["idWebSiteURL","idToken"],function(data){ console.log(data); } );
    reWriteHtmlOrdersList();
    addElementDiv("parent");

    addElementUL("subscrDiv", "idUL00");

}