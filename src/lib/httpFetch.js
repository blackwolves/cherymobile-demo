export default function httpFetch(url, options, timeout = 10000) {
    let abortFn = null;
    const abortPromise = new Promise(function(resolve, reject) {
        abortFn = function() {
            reject('Network request Timeout');
        };
    });

    const abortablePromise = Promise.race([
        fetch(url, options),
        abortPromise
    ]);

    setTimeout(function() {
        abortFn();
    }, timeout);

    return abortablePromise;
}
