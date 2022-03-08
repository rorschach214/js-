/* 
*   使用常规方法清除定时器时
*   let a = setTimeout...  此时a是定时器编号，例如10
*   clearTimout(a);    此时a定时器虽然被清除，但是a的值还是为10，所以一般需要手动将a置为空
*   应用场景：直接判断a就知道此时是否拥有定时器
*/
const clearTimer = function clearTimer(timer) {
    if (timer) clearTimeout(timer);
    return null;
};
