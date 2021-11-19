
# ejs-ob
Adds an approssimation of the php's output buffer functionality to the "ejs" npm module.

## Usage
You can both import the package like this:
```js
const ob = require("ob");
```
And utilize it like this:
```js
__append("a");

with (ob.start()) {
    __append("b");
    __append("c");
}

__append("d");
__append(`{${ ob.clear() }}`);

// Output: "ad{bc}"
```
The `ob.clear()` method will clear the buffer and return the removed data. <br>
The `ob.start()` method will create a new output buffer layer, infact they can be nested like in this example:
```js
__append("a");

with (ob.start()) {
    __append("b");
    with (ob.start()) {
        __append("c");
        __append("d");
    }
    __append("e-" + ob.clear() + "-");
}

__append("d");
__append(`{${ ob.clear() }}`);

// Output: "ad{be-cd-}"
```
Basically the `ob.start()` method returns an object containing an `__append()` function that will replace the parent one. <br>
The previous code is functionally the same as:
```js
__append("a");


const layer1 = ob.start();
layer1.__append("b");
const layer2 = ob.start();
layer2.__append("c");
layer2.__append("d");
layer1.__append("e-" + ob.clear() + "-");


__append("d");
__append(`{${ ob.clear() }}`);

// Output: "ad{be-cd-}"
```
The new `__append()` should replace the "ejs" module default one, but is the same through the various layers, so the previous code is functionally the same as:
```js
__append("a");


ob.start();
ob.echo("b");
ob.start();
ob.echo("c");
ob.echo("d");
ob.echo("e-" + ob.clear() + "-");


__append("d");
__append(`{${ ob.clear() }}`);

// Output: "ad{be-cd-}"
```
You can change the name of the current layer's `__append()` by passing it to the `ob.start()` method like so:
```js
__append("a");
with (ob.start("p")) {
    p("b");
    __append("c"); // This is the original "__append()", so it doesn't append to the output buffer.
    p("d");
}
__append(ob.clear());

// Output: "acbd"
```
> You can change the default `__append()` function's name by executing the `ob.set()` function like so:
> ```js
> ob.set("printed");
> ```

> The sustitute of the `__append()` function (`ob.echo()`) can be called as a template function:
> ```js
> var temp = 1;
> __append `printed ${ temp }`;
> ```
> (The original can't)