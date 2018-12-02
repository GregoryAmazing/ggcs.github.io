
//'https://api.vk.com/method/friends.search?count=5&fields=photo_100&access_token=16df0270e79ecb95a068f29ea9bb591f5f9a6ddc976aa4c62b2f754cc645165c66e55cbe91a6451c88b55&v=5.52'

//https://imv4.vk.com/im0448?act=a_check&key=7647506164933ea27d738cf7ee6e48a782de918c&ts=1760394017&wait=25&mode=2&version=2 


function getUrl(method, params) {
    if(!method) throw new Error('Method needed!')
    params == params || {};
    params['access_token'] = '16df0270e79ecb95a068f29ea9bb591f5f9a6ddc976aa4c62b2f754cc645165c66e55cbe91a6451c88b55';
    return 'https://api.vk.com/method/'+ method +'?' + $.param(params)+'&v=5.52'
}

function reqs(params) {
    
}

$.ajax({
    url: 'https://imv4.vk.com/im0448?act=a_check&key=7647506164933ea27d738cf7ee6e48a782de918c&ts=1760394017&wait=25&mode=2&version=2',
    method:'GET',
    dataType:'jsonp',
    success: function (data)
            {
                console.log('Some Data:');
                console.log(data);
            }
})


