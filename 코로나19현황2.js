let xhttp, xmlDoc, txt1, txt2, txt3, txt4, txt5, a, b, c, d, i, arr, arr2, arr3;

function setData() {
    let xhr = new XMLHttpRequest();
    let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
    let servicKey = 'RtlIMVwLy5nua54lEe2sVpTzyUT0vutGNDUK%2BVM8w0lZnWG4%2F75vbYlhht4I%2FadVyE3Ij0qv6pUesU59%2BAUNnA%3D%3D';
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + servicKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20220902');
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20220920');
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        let responseData = this.responseXML;
        console.log(responseData);
        // let items = responseData.getElementsByTagName("items")[0];
        // console.log(items);
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            txt1 = '';
            txt2 = '';
            txt3 = '';
            txt4 = '';
            txt5 = '';
            a = xmlDoc.getElementsByTagName('stateDt');
            b = xmlDoc.getElementsByTagName('decideCnt')
            c = xmlDoc.getElementsByTagName('deathCnt')
            d = xmlDoc.getElementsByTagName('updateDt')
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
            arr = new Array();
            arr2 = new Array();
            arr3 = new Array();
            for (i = 0; i < a.length; i++) {
                arr3[i] = parseInt(c[i].childNodes[0].nodeValue);//사망자
                arr[i] = a[i].childNodes[0].nodeValue//기준일
                arr2[i] = parseInt(b[i].childNodes[0].nodeValue)//확진자
                txt1 = txt1 + a[i].childNodes[0].nodeValue + '<br/>'
                txt2 = txt2 + b[i].childNodes[0].nodeValue + '<br/>'
                txt3 = txt3 + c[i].childNodes[0].nodeValue + '<br/>'
                txt4 = txt4 + d[i].childNodes[0].nodeValue + '<br/>'
                txt5 = txt5 + "'" + a[i].childNodes[0].nodeValue + "'" + ","
            }

            json1 = {txt1};
            json2 = {txt5};
            console.log(Object.values(arr));
            console.log(Object.values(arr2));
            console.log(Object.values(arr3));
            document.getElementById('demo1').innerHTML = txt1;
            document.getElementById('demo2').innerHTML = txt2;
            document.getElementById('demo3').innerHTML = txt3;
            document.getElementById('demo4').innerHTML = txt4;
            // alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
        }

        drawChart();
    };
    xhr.send('');
}


google.charts.load('current', {'packages': ['corechart']});

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Dialogue');
    data.addColumn('number', '확진자');
    data.addColumn('number', '사망자');
    for (i = 0; i < a.length; i++) {
        data.addRow([arr[i], arr2[i], arr3[i]]);
    }
    var options = {
        title: '코로나19',
        curveType: 'function',
        legend: {position: 'bottom'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}

setData();

