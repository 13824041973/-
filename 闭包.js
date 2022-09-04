// 实现sum(2)(3)(4).val() 
function sum(num) {
    let count = 0;
    count = num;

    function newSum(newNum) {
        count += newNum;
        return newSum
    }
    newSum.val = function () {
        return count
    }

    return newSum
}

console.log(sum(2)(3)(4).val());