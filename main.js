var alldata;

$.ajax({
    type: 'GET',
    url:
        'https://api.github.com/repos/romanovsky-g/romanovsky-g.github.io/contents/',
    success: function(data) {
        alldata = data;
        renderfiles();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.status);
    },
    dataType: 'jsonp'
});

function renderfiles() {
    alldata.data.forEach(element => {
        $('body').append('<a href="">' + element.name + '</a> <br>');
    });
}
