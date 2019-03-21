/**
 * 柯里化： 把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数或者返回结果的新函数
 */


function  curry() {
    const args = Array.from(arguments);
    const fn = args.slice(0, 1)[0];
    const _args = args.slice(1);
    return function () {
        let new_args = _args.concat([].slice.call(arguments));
        if (new_args.length >= fn.length) {
            return fn.apply(this, new_args);
        } else {
            new_args = [].concat(fn, ...new_args);
            return fn.call(this, new_args);
        }
    }
}

function add(a,b,c,d) {
	const args = [].slice.call(arguments);
	return args.reduce((pres, val) => {
		return pres + val; 	
	}, 0)
}

const newFn = curry(add, 1);
newFn(2,3,4)

/**
 * 柯里化函数的使用场景：
 *  参数复用：其实也可以通过bind函数实现
 *  延迟执行
 */

 // bind实现(利用apply实现)
 Function.prototype.bind1 = function() {
    const self = this;
    let _this = Array.from(arguments).slice(0,1)[0];
    const args = Array.from(arguments).slice(1);
    const func = function () {
        const _args = args.concat(Array.prototype.slice.call(arguments));
        // 这里是为了兼容bind之后是一个构造函数
        // 构造函数的this指向的是构造函数本身，而普通函数指向的是window
        _this = this instanceof func ? this : _this;
        return self.apply(_this, _args);
    }
 }

 function name () {
    console.log('this.name', this.name);
 }
 
 function xixi (name) {
     this.name = name;
 }

//  const new_name1 = name.bind1(xixi, 1);
//  const new_name2 = name.bind(xixi, 1);
//  new_name2(2,3);
//  new_name1(2,3);


 // js原声实现call函数 -> call 后面的参数采用的是一个个传入
 Function.prototype.call1 = function () {
    const func = Array.from(arguments)[0] || window;
    func.fn = this;
    console.log('func', func);
    const args = Array.from(arguments).slice(1);
    func.fn(...args);
    delete func.fn;
 }

 function sub (name) {
     console.log('name', name);
     this.name = name;
     console.log('this.hello---->', this.hello);
     console.log('this.name---->', name);
 }
 function Sup () {
    this.hello = 'hello';
 }

 const sup = new Sup();
 sub.call1(sup, 'hello');

