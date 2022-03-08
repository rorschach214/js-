const clearTimer = function clearTimer(timer) {
    if (timer) clearTimeout(timer);
    return null;
};

// 具备公共性的防抖函数处理：在用户频繁操作「频繁的规则自己设定」的场景中，我们只识别一次操作即可「识别第一次、识别最后一次」
const debounce = function debounce(func, wait, immediate) {
    // 参数格式校验 & 默认值处理
    if (typeof func !== 'function') throw new TypeError('func is not a function~');
    if (typeof wait === 'boolean') immediate = wait;
    if (typeof wait !== 'number') wait = 300;
    if (typeof immediate !== "boolean") immediate = false;
    let timer = null; // 闭包保存定时器
    return function operate(...params) {
        let now = !timer && immediate; // 判断是否为第一次并且立即执行
        let result;
        timer = clearTimer(timer);  
        timer = setTimeout(() => {
            // 最后执行「结束边界」
            if (!immediate) func.call(this, ...params);
            // 清除最后一次设定的定时器
            timer = clearTimer(timer);
        }, wait);
        // 立即执行「开始边界」，如果是识别最后一次，则result没有值
        if (now) result = func.call(this, ...params);
        return result;
    };
};

/* 
 * 实例
 */
const handle = function handle() {
    console.log(`数据请求发送...`);
    setTimeout(() => {
        console.log(`数据请求成功...`);
    }, 3000);
};
submit.onclick = debounce(handle, 300, true);


/*
* 简单实现
 */
const shake = function shake (cb,wait,immediate){
    let timer = null;
    return function operate(...args){
        if(!timer && immediate){
            // 如果有immediate则立即执行
            cb.call(this,...args);
        }
        timer = clearTimer(timer);
        timer = setTimeout(()=>{
            if(!immediate) cb.call(this,...args);
            timer = clearTimer(timer);
        },wait);
    }
};

/*
 * 最简单，只识别最后一次 
 */
const shake2 = function shake2(cb, wait) {
    let timer = null;
    return function operate(...args) {
        if (!timer) {
            timer = setTimeout(() => {
                cb.call(this, ...args);
                timer = clearTimer(timer);
            }, wait);
        }
    }
};