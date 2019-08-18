var alldata;
var path = '/';
var geturlpath = '';

$.ajax({
    type: 'GET',
    url:
        'https://api.github.com/repos/romanovsky-g/romanovsky-g.github.io/contents/' +
        '?client_id=Iv1.9def353af8ab584d&client_secret=6ce132839a5cf0c4cb28e6298aaf5904cf0ac9fd',
    success: function(data) {
        alldata = data;
        renderfiles();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.status);
    },
    dataType: 'jsonp'
});

var imgtype = {
    dir: `<img src="imgs/dir.png">`,
    file: `<img src="imgs/file.png">`
};

function renderfiles() {
    alldata.data.forEach(function(element, index) {
        $('#path').text('Path: ' + path);
        $('#files').append(
            '<div class="file" onclick="openlink(' +
                index +
                ')"> ' +
                imgtype[element.type] +
                ' <span>' +
                element.name +
                '</span> </div>'
        );
    });
}

function openlink(indx) {
    let elem = alldata.data[indx];
    if (elem.type == 'dir') {
        path += elem.name + '/';
        geturlpath += '/' + elem.name;
        console.log(geturlpath);

        $.ajax({
            type: 'GET',
            url:
                'https://api.github.com/repos/romanovsky-g/romanovsky-g.github.io/contents' +
                geturlpath +
                '?client_id=Iv1.9def353af8ab584d&client_secret=6ce132839a5cf0c4cb28e6298aaf5904cf0ac9fd',
            success: function(data) {
                alldata = data;
                $('#files').empty();
                renderfiles();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
            dataType: 'jsonp'
        });
    }
}
