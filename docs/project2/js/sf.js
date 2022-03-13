    // var sites = ["Google", "Taobao", "Runoob", "Wiki", "Zhihu", "Baidu", "Sina", "Tmall", "JD", "Alibaba", "QQ", "Weixin", "R", "Rust", "Python", "Ruby"];
    //From: https://www.runoob.com/w3cnote/javascript-autocomplete.html
    //From: https://c.runoob.com/codedemo/6190/
    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                        searchDeService();
                    });
                    a.appendChild(b);
                }
            }
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) { //up
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                } else {
                    searchDeService();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function(e) {
            closeAllLists(e.target);
        });
    }
    var sites = [];
    for (x in fsa_pt) {
        sites.push(...fsa_pt[x]);
    }
    var z_t = document.getElementById("zipcodeTarget");
    autocomplete(z_t, sites);

    //------
    // var wlocal = "Toronto";
    function searchDeService() {
        var vv = z_t.value;
        if (vv != undefined) {
            vv = vv.toUpperCase();
            if (fsa_from_cities[wlocal][vv] != undefined) {
                hideNoService();
                showDeDays(fsa_from_cities[wlocal][vv], vv);
                if (f_s[wlocal][vv] != undefined) {
                    showDeDaysRe(f_s[wlocal][vv], vv);
                } else {
                    hideDeDaysRe();
                }

            } else {
                showNoService();
            }

        }
    }
    document.getElementById("btnSearch").addEventListener("click", searchDeService);

    function showNoService() {
        if (document.querySelector('.card.No_delivery_services') != undefined) {
            document.querySelector('.card.No_delivery_services').classList.add("show_Dd_Se");
            document.querySelector('.card.No_delivery_services').classList.remove("No_delivery_services");
        }
        if (document.querySelector('.card.card.show_Dd_Se1') != undefined) {
            document.querySelector('.card.card.show_Dd_Se1').classList.add("Delivery_services");
            document.querySelector('.card.card.show_Dd_Se1').classList.remove("show_Dd_Se1");
        }
    }

    function hideNoService() {
        if (document.querySelector('.card.show_Dd_Se') != undefined) {
            document.querySelector('.card.show_Dd_Se').classList.add("No_delivery_services")
            document.querySelector('.card.show_Dd_Se').classList.remove("show_Dd_Se");
        }
        if (document.querySelector('.card.card.Delivery_services') != undefined) {
            document.querySelector('.card.card.Delivery_services').classList.add("show_Dd_Se1");
            document.querySelector('.card.card.Delivery_services').classList.remove("Delivery_services");
        }
    }

    function showDeDays(s, s1) {
        var ds = "days";
        var d = "day";
        if (s.s1 > 1) {
            document.getElementById("fastestDs").innerHTML = s.s1 + " " + ds;
        } else {
            document.getElementById("fastestDs").innerHTML = s.s1 + " " + d;
        }
        if (s.s4 > 1) {
            document.getElementById("cheapestDs").innerHTML = s.s4 + " " + ds;
        } else {
            document.getElementById("cheapestDs").innerHTML = s.s4 + " " + d;
        }
        document.getElementById("DSfromto").innerHTML = "From: " + wlocal + " to: <span class='text-success'>" + s1 + "</span>";
    }

    function showDeDaysRe(s, s1) {
        var ds = "days";
        var d = "day";
        if (s.s.s1 > 1) {
            document.getElementById("fastestDsR").innerHTML = "<span class='text-warning'>" + s.s.s1 + "</span> " + ds;
        } else {
            document.getElementById("fastestDsR").innerHTML = "<span class='text-warning'>" + s.s.s1 + "</span> " + d;
        }
        if (s.s.s4 > 1) {
            document.getElementById("cheapestDsR").innerHTML = "<span class='text-warning'>" + s.s.s4 + "</span> " + ds;
        } else {
            document.getElementById("cheapestDsR").innerHTML = "<span class='text-warning'>" + s.s.s4 + "</span> " + d;
        }
        document.getElementById("RemoteS").innerHTML = "Remote Except:  to <span class='text-warning'>" + s.Remote + "</span>";
        document.querySelector('ul.ulRemotes').classList.remove("hide");
    }

    function hideDeDaysRe() {
        document.querySelector('ul.ulRemotes').classList.add("hide");
    }