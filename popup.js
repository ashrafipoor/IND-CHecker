window.addEventListener('DOMContentLoaded', init, false);
document.getElementById('btnSearch').addEventListener('click',checkCompany);
function init() {
    const companyname = getParameterByName('company');
    if (companyname !== undefined && companyname.length > 0)
        search(companyname);
}
function checkCompany() {
    const companyname = document.getElementById('txtCompanyName').value;
    if (companyname !== undefined && companyname.length > 0)
        search(companyname);
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function search(companyname) {
    const pr = document.getElementById('pr');
    pr.innerHTML = "loading..";
    let exist = false;
    fetch('assets/data/ind-data.json')
        .then(res => res.json())
        .then(data => {
            pr.innerHTML = "";

            for (var i = 0; i < data.length; i++) {
                try {
                    if (data[i].CompanyName.includes(companyname)) {
                        exist = true;
                        pr.innerHTML += `<a class="link" target="_blank" href='https://www.linkedin.com/search/results/companies/?keywords=${data[i].CompanyName.replace('B.V.','')}'>${data[i].CompanyName}</a><br/>`;
                    }
                } catch (error) {
                    console.log(data[i].CompanyName);
                }

            }
            if (!exist)
                pr.innerHTML += "not found!";

        })
}