function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

function throttle(func, wait ,type) {
    if(type===1){
        var previous = 0;
    }else if(type===2){
        var timeout;
    }

    return function() {
        var context = this;
        var args = arguments;
        if(type===1){
            var now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(function(){
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }

    }
}