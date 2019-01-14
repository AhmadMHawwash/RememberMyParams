export function rememberMe(fun){
    let cache = {};
    return function(...args){
        const cachedItem = safeGet(cache, ...args);
        if(cachedItem){
            console.log("from cache", cache);
            return cachedItem;
        }
        else {
            const toBeCachedItem = fun(...args);
            console.log("not from cache", cache, toBeCachedItem);
            safeSet(cache, toBeCachedItem, ...args);
            return toBeCachedItem;
        }
    };
}


function safeSet(obj, value, ...levels){
    const arrayOfLevels = [...levels];
    makePathReady(obj, arrayOfLevels);
    setToValue(obj, value, arrayOfLevels);
}

function setToValue(obj, value, path) {
    let i;
    for(i = 0; i < path.length - 1; i++){
        obj = obj[path[i]];
    }
    obj[path[i]] = value;
}

function makePathReady(obj, arrayOfLevels) {
    let reachedLevel = obj;
    arrayOfLevels.forEach(level => {
        if (reachedLevel[level]) {
            reachedLevel = reachedLevel[level];
        }
        else {
            reachedLevel[level] = {};
            reachedLevel = reachedLevel[level];
        }
    });
    return reachedLevel;
}

function safeGet (obj, ...levels) {
    let reachedLevel = obj;
    let found = true;
    levels.forEach(level => {
        if(reachedLevel[level]){
            reachedLevel = reachedLevel[level];
        }
        else{
            found = false;
        }
    });
    if(found){
        return reachedLevel;
    }
    else{
        return undefined;
    }
}