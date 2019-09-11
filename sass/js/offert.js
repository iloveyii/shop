
function sendRequest(params, cb) {
    var http = new XMLHttpRequest();
    var urlLive = 'https://www.sveasolar.se/wp-content/themes/xpro-child/calculatorv2/solarcalc-extras/submitform.php';
    var url = 'http://localhost:9090/submitform.php';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    http.open('POST', proxyurl + urlLive, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            cb();
            clearForm();
        }
        if (http.status == 429) {
            console.log(http.responseText);
            cb();
            alert('An error has occurred, please refresh the page.');
        }
    };
    http.send(params);
}

function clearForm() {
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('post-number').value = '';
    document.getElementById('more').value = '';
}

function validateForm() {
    // Fields to be validated
    var formIds = ['first-name', 'last-name', 'telephone', 'email', 'address', 'post-number', 'property-type', 'energy-supplier'];
    var errors = [];

    formIds.forEach(function (id) {
        var el = document.getElementById(id);
        var errEl = document.getElementById(id + '-error');

        if (!el.value || el.value == '') {
            errors.push({id: id, error: 'Detta är ett obligatoriskt fält.'});
            console.log(id);
            errEl.style.display = 'block';
        } else {
            errEl.style.display = 'none';
        }
    });

    return errors;
}

function getFormData() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var telephone = document.getElementById('telephone').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var postNumber = document.getElementById('post-number').value;
    var more = document.getElementById('more').value;
    var propertyType = document.getElementById('property-type').value;
    var energySupplier = document.getElementById('energy-supplier').value;

    return {
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
        email: email,
        address: address,
        postNumber: postNumber,
        zip: postNumber,
        more: more,
        oid: '00D58000000IHRE',
        retURL: 'https://sveasolar.se/tack_sk/',
        'lead_source': 'Website',
        'company': 'x',
        Energy_Supplier__c: energySupplier,
        Property_Type__c: propertyType,
    };
}

function urlEncoded(obj) {
    var params = '';
    Object.keys(obj).forEach(function (key) {
        params = params + key + '=' + obj[key] + '&'
    });

    return params;
}

document.getElementById('send').addEventListener('click', function (e) {
    e.preventDefault();
    showProgress(true);

    var errors = validateForm();

    if(errors.length < 1) {
        var formData = getFormData();
        console.log('Sending data, formData: ');
        console.log(formData);
        var params = urlEncoded(formData);
        sendRequest(params, function () {
            showProgress(false);
        });
    }
});

function showProgress(show) {
    var btn = document.getElementById('send');
    btn.innerText = show ? 'BEARBETNING' : 'SKICKA';
}

showProgress(false);

