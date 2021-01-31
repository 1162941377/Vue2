# Vue

*实现了响应式的效果，我们对处于监听的内容做出修改后，vue会将其任务作为异步处理函数，放入微队列中，正是由于这个原因，vue带来了一个缺陷：要是执行栈中还在运行，vue会一直进行等待，而不会渲染页面，而react则不会。*

> js语言本身的因素，决定它是单线程运行的程序，代码是同步运行的，如果浏览器在执行js代码时出错或由于网速较慢，浏览器无法从远程服务器处加载js文件，或执行js代码期间，由于代码的执行效率低下造成了页面卡顿等等类似因素，vue自身的缺陷就越发明显

## 初探：

- 本质上是一个构造函数，通过new关键词调用，有以下两种方式创建

1）const vm = new Vue({
    el: '需要监听的标签',
    data: {
        需要定义的变量和值，可以通过 插入表达式 显示到页面中，vue也会对其进行监听，实现响应式效果
    }
})

2）const vm = new Vue();
vm.$mount = '需要监听的标签';

- 在监听标签后，我们可以使用实例化对象身上的 $el 属性，读取要监听的标签，然后可以对其进行操作

*vue把data中要监听的属性放到了vue的实例化对象的身上，是为了：更好地实现响应式的效果，更好地监听属性的变化；减少开发者在使用时，可能由于嵌套过深而不得已使用递归访问的性能损耗*

- vue使用了两个形式的自定义变量命名规则：$ 和 _ ，前者是提供给开发者使用的；后者是vue内部使用的。

> 这么做的原因是：避免命名冲突

### 插入表达式：{{  }}

- 中间可以书写：数字、函数、字符串、对象、布尔值、运算、数组

- 不能书写：逻辑表达式、条件判断语句、申明变量等操作

*注意：如果书写了 未经申明的变量 或 从未使用的变量，vue不会重新渲染页面*

```yaml
作用域上找不到的会报错；原型链上找不到的会输出undefined
```

> 这么做的原因是：重新渲染页面会损耗性能，可能会造成浏览器访问页面时卡顿，vue考虑到了用户体验，而做出的优化

### 有两个特殊情况，vue对其的变化无法监听：

1）通过数组索引位改变元素的值 或 改变数组的 length 长度

2）增加对象的没有经过定义过的属性 或 删除已有属性

*无法监听的原因是：vue2内部使用的是 Object.defineProperty，是这个方法内部的缺陷*

- 针对第一种情况，vue重写了数组身上的七个方法，让我们可以监听数组中元素的变换

> 分别为：pop、push、shift、unshift、splice、sort、reverse

- 针对第二种情况，vue提供了两种方法，也可以作用于数组，但一般使用上述的七种方法

> 分别为：$set('要修改的对象', '要修改的属性名', '要修改的值') 和 $delete('要删除的对象', '要删除的属性名')

> 如果作用的是：$set('要修改的数组', '要修改的索引位', '要修改的值') 和 $delete('要删除的数组', '要删除的索引位')

### nextTick：

- vue提供了一个在vue渲染页面后立即执行的微队列函数，这个函数就是 nextTick，也提供了两个调用方法

1）通过Vue自身调用（Vue.nextTick）

2）通过vue的实例化对象调用（vm.$nextTick）

*两个调用方式没有本质区别，不同的是：第一种方式中的this指向window；第二种方式中的this指向调用者本身；$set 和 $delete，vue也提供了一样的调用方式，两者没有本质区别，通过第二种调用的方式是第一种方式调用的别名*

明天任务：模拟vue2内部使用 Object.defineProperty方法，监听已经定义的属性变化，实现响应式的效果

-- 完成

## 相关指令：

- vue提供了一系列可供我们使用的指令，这些指令为了防止命名冲突，vue在每个可使用的指令前加上了 v-，根据需求，运用相应的指令

### 基本指令：

*vue不支持IE8及以下版本，原因见下：*

1）v-pre：不解析该标签，如果使用了data中的属性，vue也不会做任何处理

2）v-once：只会执行一次

3）v-html：会将字符串中的内容当做html元素来执行，由于会改变页面中的html结构，永不在用户的提交按钮上使用，以防xss攻击

4）v-text：会将字符串中的内容当做文本替换到对应的位置

5）v-cloak：避免闪烁，用于如果用户网速不佳，给页面一个遮罩层，不会提前展示花括号，影响影虎体验，当浏览器读取js文件后，将内容替换后，再一起显示

*textContent和innerText的异同：*

1）textContent根据的是代码显示；innerText根据的是浏览器的渲染显示

2）textContent会读取设置display为none的标签中的文本；innerText则不会

3）textContent是标准获取文本的方法；innerText是IE8及以下支持的

4）如果在标签内嵌套了style和script标签，textContent获取其中的文本；innerText则不会

5）textContent一般不会触发重排，一般只会触发重绘；innerText则会

> 为了更好地优化页面的性能，vue使用的是textContent方法

### 条件渲染：

*五个判断为false的值：undefined、false、0、""、null*

1）v-if：如果条件满足，执行指令

2）v-else-if：如果上面的条件不满足，则看这个条件是成立；如果成立，执行指令

3）v-else：如果上述条件都不满足，看这个条件是否成立；如果成立，执行指令

4）v-show：类似于v-if，如果条件成立，执行指令

> 在vue中可以使用template，如果标签中是纯文本，而我们需要对这个标签进行显示与隐藏，配合使用这个标签，可以不生成额外的标签，该标签是隐式标签

*v-if和v-show的异同：*

1）都是条件渲染指令，条件为真，才会执行

2）如果条件为假，v-if会将标签移除；v-show只是切换标签的display值为none

3）v-if可以配合template使用；v-show不行

4）v-if是惰性加载，如果一开始条件为假，不会进行渲染；v-show不管条件是否为真，都会进行渲染

- 根据上面的不同，使用时考虑优化性能：

1）如果要对一个标签，频繁地进行切换与显示，用v-show

2）如果确定一个标签的状态，比如说一开始就不显示，用v-if

## v-bind指令：

> 我们可以使用这一指令，让自定义属性添加到标签身上，成为可以操作的特性

- 如果想静态绑定，直接用data中的属性名；如果是想动态绑定，用类似于es6中的语法 [属性名]

为了简化书写和提高阅读性，vue提供了该指令的简写，直接用 : 代替，实现相应的效果

### 绑定的三种方法：

1）用无参数的对象，注意此时不能简写为 :

2）可以使用data中定义好的对象的属性名

3）可以使用data中定义好的数组

我们可以使用条件判断，用于是否添加class类名，如果为true，添加；否则，不添加

*vue内部自带了添加厂商前缀的功能*

- 修饰符：

html特性，会将书写的大写字母转换为小写

1）camel：取消这一特性

> 如果要使用的话，用小写字母，通过 - 连接，这一修饰符会转换为小驼峰式命名规则

2）prop：绑定dom的属性，成为特性

3）sync：后续认识

*如果要在行间书写属性或特性，使用小写字母，中间通过 -  连接*

## v-on指令：

类似于原生js中的用on绑定事件的效果

通过 v-on:事件处理名，也可以使用 @事件处理名，在methods中书写

> 和原生的js一样，在点击的时候，可以传递一个e，里面记录了关于该标签信息，通过e.target方法可以获取点击标签的事件源；如果已经传递了一个参数，还想获取点击的事件源的话，最后一个参数，通过 $event 传递

*vue将关于dom的操作与逻辑代码完成分割，更有利于维护和阅读；在ViewModel被销毁时，vue会自动删除无效的事件监听和处理*

> vue将处理函数和数据中的属性一样，通过实例化对象直接调用，我们轻松地使用this，而无需考虑指向问题

### 事件修饰符：

1）.stop：阻止冒泡

2）.prevent：阻止默认的事件，比如点击提交后，表单会进行提交，页面会刷新

3）.once：只会执行一次

4）.capture：开启捕获事件

5）.passive：使用了该修饰符的标签，浏览器不会对其监听，会忽略它的事件，直接执行，一般用于移动端，当用户向上滑动屏幕时，页面跟着上移，这个时候，该修饰符可以帮助我们优化用户体验，让屏幕直接做出反应

6）.self：只执行自身的事件

*事件可以并用，这种情况发生时，考虑先后顺序*

> 比如说：.prevent.self：是先阻止所有的默认事件，再只执行自身的事件；.self.prevent：是先执行自身的事件，再阻止其自身的默认事件

> .passive 和 .prevent 不能并用，自相矛盾

### 按键修饰符：.left、.right、.up、.down、.tab、.esc、.space、.enter、.delete

### 系统修饰符：.shift、.ctrl、.meta（不同的操作系统，按键的名称不同，win下是“田”；mac下是command）、.caps-lock

### 鼠标修饰符：.left、.right、.middle，分别对应的是鼠标的左右键和中间的滑轮

### 可以使用keyCode的值，但不建议这么绑定，因为已被逐渐废除

> 比如说：.13 对应的是就是 .enter

### 可以使用Key Values的值

> 比如说：.arrow-left 对应的就是 .left

### 我们也可以自定义Key Values的值，绑定想要的按键

> Vue.config.字母 = "Number类型的数值"

*以上修饰符可以并用，也可以使用 .exact 精确地绑定按键*

## 列表渲染（v-for）：

通过v-for指令可以遍历data中的数组或对象

1）如果是数组，可以传递两个参数，对应的是：(value, index) in / of 数组名

2）如果是对象，可以传递三个参数，对应的是：(value, key, index) in / of 对象名

*vue建议使用 of 获取对象或数组中的值，因为更接近 迭代器语法，但一般使用 in 遍历*

> 注意：如果要实现遍历，需要配合使用 ul 和 li 标签，只要在一个 li 身上添加 v-for 指令就可以遍历得到所有数据，如果要在标签内显示，用插值表达式 {{ }}

- 有个小练习，点击按钮，将其下移，具体实现见页面

> 使用 key 值绑定唯一标识，不同的是：不建议使用 index 索引绑定，为了优化性能，如果使用了 index，vue会比较前后的名称变化，变动过的属性的索引位上的值与原先的不符，vue会重新渲染标签，触发重排，损耗一定的性能；但是如果使用的是其他，那么不会这样，vue只是更改其标签内的文本信息，而不会对dom做出操作，只会触发重绘

*使用 key 绑定时，只能是：字符串 或 数字*

### v-for 和 v-if 不建议同时使用，原因如下：

> v-for 的优先级比 v-if 要高，所以即使是有条件判断，vue还是会将父标签内的所有标签渲染，再去看条件判断，是否显示或隐藏某些标签，性能有一定的损耗

如果一定要配合使用的话，那么可以使用如下两种方式：

1）我们可以手动地过滤 data 中的属性值，再用 v-if 判断是否显示与隐藏（比较 low，不建议采用，后面有更好的解决办法）

2）可以在父标签身上使用 v-if 指令，利用 v-if 懒加载的特性，可以减少一定的性能开销

## v-model指令：

*可以实现：双向数据绑定，也叫双向链路*

可以用于以下场景：

input[type="text"]，结果是一个字符串

input[type="checkbox"]，结果是一个数组

input[type="radio"]，结果是一个字符串

select，结果是一个字符串，通常添加一个额外的option标签，用于展示关于选项的介绍信息，为了更好的用户体验，给该标签添加一个disabled属性

### 修饰符：

1）number：获取的文本类型是字符串，如果输入的是数字，通过该修饰符，可以获取数值

2）trim：可以去除文本左右多余的空格，当失去焦点的时候就会触发

3）lazy：懒获取，只有当失去焦点时才会触发，而不是不断地进行监听，更好地优化性能

## 侦听器

*当监听的属性发生变化时，就会执行其中的代码*

> 可以传递两个参数，分别对应的是：newValue，oldValue 的值

可以是以下几种形式：

1）监听属性() {}

2）监听属性: ''，字符串中是在methods中要执行的方法

3）'监听属性'，可以具体监听对象中的某个属性

4）监听属性：{
        handler() {}, // 必填
        deep: false, // 选填，无论嵌套多深，只要改变了，就能监听，浪费性能，一般只会监听某个具体的属性
        - 在监听数组时，该属性不需要设置
        immediate: false // 选填，只要监听就会生效，不管值是否发生变化
    }

以上是在vue实例化对象中的watch属性中设置，也可以在vue实例化对象自身上设置，如下：

1）vm.$watch('监听属性', function(){}, deep 和 immediate 配置)

2）vm.$watch('监听属性', {
    handler() {}, // 同上
    deep: false, // 同上
    immediate: false // 同上
})

> 监听器返回结果是一个函数，vue提供了一个取消监听的方法，一般用 unwatch 来接收；注意如果想要在一开始就取消监听，可以配合 return，只能用 var 定义，别忘了加上判断是否 unwatch 存在，不然会报错

*监听器和计算属性的异同：*

1）都可以监听属性的变化

2）监听器针对的是：一个数据处理多个数据；计算属性针对的是：多个属性处理一个数据

3）监听器内部可以写异步处理函数；计算属性不行

> 计算属性一定要 return，返回的结果就是计算属性的值；监听器可以不需要，如果在计算属性内部写了异步处理函数，执行步骤是：先返回结果，渲染，再得到异步处理函数中的值，重新赋值，再渲染，浪费性能；监听器可以完美解决这一问题，因为本身支持

## vue-resource

为了简化传输的代码量，vue官网出了一个用于发送网络请求的库，叫vue-resource.js

> 这个库依赖于vue，所以如果要使用，先要引入vue.js

- 这个库会在vue上挂一个方法，我们可以通过：vue的实例化对象.$http() 发送对应的请求

> 这个库和 axios 一样，内部使用的是 Promise

*网络请求的标准 http 方法：get、post、patch、put、delete、head*

1）get：获取数据

2）post：传递数据

3）put：更新数据，把所有结果都进行传递

4）patch：更新数据，把修改过的数据传递

5）delete：删除数据

6）head：请求头的信息

- 这个库还支持 jsonp 格式；axios 不支持

常用 data 格式：

1）表单提交：multipart/form-data，现在基本不用表单进行提交，但仍然存在，有时需要做图片上传、文件上传

2）文件上传：application/json，现在大部分情况下都是用这种格式

使用方法如下：

vm.$http.post('请求地址', {
    需要传递的信息，作为键值对
}).then(res => {
    // 成功后要执行的函数
}).catch(error => {
    // 失败后要执行的函数
})

*提供了三个方法*

1）text()：以 字符串方式 返回响应体

2）json()：以 格式化后的 json 对象方式 返回响应体

> 如果要使用，配合 return，返回一个 promise 对象，可以处理后续操作

3）blob()：以 二进制 Blob 对象方式 返回响应体

*不过 vue 官方已经停止维护这个库，推荐使用其他库（axios.js）*

## axios

> 是一个基于 promise 的 http 库，支持跨平台，Chrome、Firefox、Edge、IE8+、Opear、Safari

最常用的配置：

```yaml
axios({
    method: '请求方式',
    baseURL: '请求的域名，基本地址',
    url: '请求的路径',
    params: {
        会将请求的参数拼接在url中，一般用于get请求时需要传递
    },
    data: {会将请求参数放在请求体中},
    headers: {设置请求头，例如设置 token 等},
    timeout: {设置请求时长，单位：ms}
})
```

为了方便期间，axios提供了别名，使用方式和 vue-resource 一样

> axios 提供了 三种配置方式：

1）全局配置：axios.defaults.配置信息 = '参数'

2）实例设置：const instance = new axios.create()，可以通过 instance.配置信息 = '参数'

3）自身配置

*优先级顺序：自身配置 > 实例配置 > 全局配置*

### 并发

> axios 提供了一个类似于 promise 中的 all，可以同时进行多个请求，并发（统一）处理返回结果，还一个 spread 回调函数，接收的参数就是 依次传递的 请求的返回结果

```yaml
axios.all([
    axios.get('');
    axios.post('');
]).then(axios.spread(aRes, bRes) => {
    // 进行处理
});
```

### 拦截器 interceptors

1）请求拦截器（use）

> 在发送请求时，或在相应后做一些处理

```js
axios.interceptors.request.use(config => {
    // 发送请求时做些什么
    return config;
})
或
axios.interceptors.response.use(response => {
    // 对相应结果做些什么
    return response;
})
```

2）移除拦截器（eject）

```js
const myInterceptor = axios.interceptors.request.use(config => {return config});
axios.interceptors.request.eject(myInterceptor);
或
axios.interceptors.response.eject(myInterceptor);
```

3）为 axios 实例添加拦截器

```js
const instance = axios.create();
instance.interceptors.request.use(cofig => {return config});
或
instance.interceptors.response.use(response => {return response});
```

### 取消请求

> 用于取消正在进行的 http 请求

```js
const source = axios.CancelToken.source();

axios.get(url, {
    cancelToken: source
}).then(res => {
    console.log(res);
}).catch(error => {
    if(axios.isCancel) {
        // 取消请求
        console.log(error.message);
    } else {
        // 处理错误
    }
})

// 取消请求，参数可选
source.cancel('message');
```

### 错误处理

*request 和 response 是 error 的上下文，标志着 请求发送 / 得到响应时 发生错误*

*如果 response 有值，则说明是：响应时发生错误；如果 response 没值，则说明是：请求时发生错误；如果两个都没值，则说明是：请求未发出，如：取消请求*

> 在实际开发中，一般拦截器中统一添加错误处理 请求拦截器中的错误，当请求处理未成功时执行，但注意的是：取消请求后，请求拦截器中的错误函数也不会执行，因为取消请求不会抛出异常，axios 对其进行了单独的处理。在更多情况下，我们会在响应拦截器中处理错误

### axios 预检

> 当 axios 的请求为非简单请求时，浏览器会进行预检，以及发送 options 请求。请求到服务器，询问是否支持跨域。如果响应体中允许预检中请求的跨域，则浏览器会进行真正的请求，否则会抛出 405 错误

## template 选项

vue 会根据 template 中的模板渲染页面

*如果设置了 template，vue 会渲染模板中的内容到页面；如果没有设置，则会将 el 的值当做 template 模板进行渲染；如果还未设置，则会将 vm.$mount() 中的内容当做 template 模板执行*

## vue 生命周期

> 提供了如下的钩子函数：

1）beforeCreate：初始化 vue 工厂，还不能进行任何操作

2）created：创建 vue 实例，可以使用，如果想要传输或接收数据，可以在这个钩子函数中使用

3）beforeMount：可以获取到 el，但是还无法替换 data 中的数据

4）mounted：可以获取到替换过的数据

5）beforeUpdate：获取到更改前的数据，注意由于数据改的是引用地址，在浏览器中会照常输出已经改过的数据，所以如果要看到效果，用 outerText

6）updated：获取到更改过的数据

7）beforeDestroy：通过 vm.$destroy()，可以销毁 vue 实例化对象，此钩子函数会在销毁前执行，一般用于清除定时器

8）destroyed：vue 实例化对象完全销毁，调用 vm.$destroy()后，也不会执行该钩子函数，因为 vue 实例化对象已经被销毁

## 组件

> 是一个可复用的 vue 实例，自定义标签，一个 template 模板中只能存在一个标签，如果想要定义多个，使用一个父级 div 包裹

> 在组件中可以使用跟 vm 实例中一样的配置，不过 data 中的数据是定义在一个函数中，通过 键值对 定义，键名对应的是属性，键值对应的是值，通过 return 返回结果；组件中没有 el，这是 vm 中独有的选项

1）全局组件：通过 Vue.componenet('组件名', { 配置信息 });

2）局部组件：通过 定义一个对象，配置信息，然后在 vm 实例中添加一个属性，components，是一个对象，通过 键值对 的形式定义

*组件名：小写字母 - 小写字母，建议使用这种方式定义，有利于阅读和维护；也可以通过大驼峰式命名，使用时也可以直接用名字或小写字母 - 小写字母；W3C组织推荐使用第一种方式，自定义标签名，编辑器中也有提示，更利于书写*

### 组件复用

> 可以将定义好的组件进行任意次数的复用

### 自闭合组件

> 在以前版本的浏览器中，是不支持除了官方定义的自闭合标签外的显示，如果要使用的话，要在 template 中书写，但是现在的浏览器能直接识别

### Prop

*由于html的特性，对大小写不敏感，所以浏览器会将大写解释为小写字符，当传递的 prop 为短横线分割的形式时，组件内接收和使用时需要用小驼峰式命名；如果使用的是模板字符串的话，这个限制不存在*

    > 组件默认只是写好结构、样式和行为，数据应由外界传递

> 父传子，子身上有一个 props 属性，可以使一个数组，用于表示接收 父 的对应的数据

### 传递静或动态 Prop

> 通过 v-bind 绑定

### 传递一个或全部属性

> 通过 v-bind="对象"

```html
<my-cmp>
    :name="person.name"
    :age="person.age"
</my-cmp>
```

也可以简写成

```html
<my-cmp v-bind="person"></my-cmp>
```

### Prop 验证

> vue 提供了如下配置，用于验证传递的数据的格式，为了团队更好地合作，prop的定义应该尽可能地详细，至少指定传递数据的类型

*Function、String、Symbol、Number、Boolean、Object、Array、Data、Promise；两个特殊的情况，如果传递的值是：undefined 或 null，会通过所有的验证*

> 只是验证，会在控制台报错，数据还是会传递

```js
Vue.component('my-cmp', {
    props: {
        tilte: String,
        likes: Number,
        isPublished: Boolean,
        commentIds: Array,
        author: Object,
        callback: Function,
        contactsPromise: Promise
    }
});
```

> 除了以上的基础配置，我们还指定更多

```js
Vue.component('my-cmp', {
    props: {
        tilte: {
            type: String, // 类型
            default: '内容', // 默认值
            required: true, // 是否为必填项
            validator(prop) { // 自定义函数，该 prop 值作为唯一的参数传入，若函数返回一个 falsy 值，那么就代表失败
                return 处理逻辑; // 注意是：falsy，表示：假值
            }
        }
    }
});
```

### 单向数据绑定

> 所有的 prop 都使得其父子的 prop 之间形成了一个 单向下行绑定：父级的 prop 的更新会影响到 子的 prop；反过来则不行

1）正是因为这个特点，无论子的 prop 如何改变，一旦改变父的 prop ，子的 prop 会同步

2）如果传递的是 数组 或 对象，由于是引用值，所以子的改变也会影响父的改变

针对上述情况，我们可以使用以下两种情况处理：

1）在子的 data 中，返回一个属性，属性值就是传递进来的 prop，保存在自身，与父的 prop 脱落关系

2）如果传递进来的 prop 作为原始数据，那么可以在子身上添加一个计算属性 computed，return 一个处理过的数据

### 非 Prop 特性

> 指的是：当传递一个未被组件注册过（props 数组中没有）的特性时，该特性会被添加到这个组件的根元素上

如果在 template 模板中，定义了一个非 prop 特性，如果在标签行间也添加了同名的非 prop 特性，那么会使用行间的那个 prop 特性；如果设置的是 class 或 style，那么会进行合并，而不是像之前样进行覆盖

*$attrs：保存着定义好的 prop 特性，如果不想要子直接继承，而是希望其他标签能继承，使用 inheritAttrs：false，其次在想要继承的标签上，配合使用 v-bind="$attrs"*

> inheritAttrs 的设置不会影响到 class 或 style 的绑定

*$emit('自定义方法', 抛出的值)，在子中使用，父中可以使用这个自定义好的方法 通过 $event 可以获取到传递的第二个参数的值*

### 事件名

*不同于 组件 和 prop，事件名不存在任何的大小写自动转换，推荐使用 kebab-case（短横线命名原则）*

### 将原生事件绑定到组件

> 通过修饰符 v-on的指令：.native

> 但是如果将要监听的标签进行了嵌套，那么即使设置了，也不能生效，这个时候，可以使用子身上的 $listeners，得到父的设置好的所有监听函数，通过子的 v-on="$listeners"，让父可以监听原生事件

### sync 修饰符

> 和 v-model 类似的功能，都能实现数据的双向绑定，不同的是：

1）.sync 用于父组件身上，在子内通过 @事件处理名="$emit('update:传递进来的值', $event.target.value)" 传递值给父

```html
<base-input
 :value="value"
 @update:value="value = $event"
></base-input>
```

也可以简写成

```html
<base-input
 :value.sync="value"
></base-input>
```

### v-model VS .sync

*先明确一件事情，在 vue 1.x 时，就已经支持 .sync 语法，但是此时的 .sync 可以完全在子组件中修改父组件的状态，造成整个状态的变换很难追溯，所以官方在 2.0 时移除了这个特性。然后在 vue2.3 时 .sync 又回归了，跟以往不同的是，现在的 .sync 完完全全就是一个语法糖的作用，跟 v-model 的实现原理是一样的，也不容易破环院有的数据模型，所以使用上更安全也更方便。*

1）带有.sync 修饰符的 v-bind 指令，只能提供想要绑定的属性名，不能和表达式一起使用，如：:title.sync="1+1"，这样操作是无效的

2）将 v-bind.sync 用在 一个字面量对象上，如 v-bind.sync="{ title: 'haha' }"，是无法工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

3）两者都是用于实现 双向数据传递（双向链路） 的，实现方式都是 语法糖，最终通过 prop + 事件 来达成目的。

4）vue 1.x 的 .sync 和 v-model 是完全两个东西，vue 2.3 之后可以理解为一类特性，使用场景略微有区别

5）当一个组件对外只暴露一个受控的状态，切都符合统一标准的时候，我们会使用 v-model 来处理。.sync 则更为灵活，凡是需要双向数据传递时，都可以去使用。

### 插槽

> 在组件中插入内容（组件），通过在 template 中使用 <slot></slot> 标签，相当于是一个占位符，vue 会将组件或内容插入到对应的位置上

### 编译作用域

*父级模板中的所有内容都是在父级作用域中编译的；子级模板中的内容都是在子级作用域中编译的*

### 后备内容

> 也就是：默认插槽，如果 <slot>默认插槽中的内容</slot> 中没有内容，那么会显示 标签中的内容

### 具名插槽

> 在组件的 template 的结构中定义：<slot name='名字'></slot>

> 在 父 中添加 <template v-slot:名字></template>；如果要使用的是默认插槽，<template v-slot:default="名字"></template>，也可以省略不写，默认就是默认插槽，此时可以简写为：<template slot="default"></template>

> 但是为了更好的 html 结构和代码的维护性，建议都加上

### 作用域插槽

> 为了能让插槽内容访问子组件的数据，我们可以使用：<slot :prop="data 中的属性"></slot>

> 父级作用域中使用时，通过 <template v-slot:default="prop">{{ prop.xxx }</template>

### 独占默认插槽

> 如果被提供的内容只有默认插槽时，组件的标签可以当做插槽的 模板 来使用，也就是可以省略 原本需要包裹的 <template></template> 标签，此时可以通过：<my-cmp v-slot:default="prop">{{ prop.xxx }}</my-cmp>

*<slot name="名字"></slot> 在子的模板中定义，在父中配合使用 <template v-slot:名字></template>，除了上面一种特殊情况外*

*默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确*

### 解构

> 我们可以使用类似于 es6 的解构语法，使用：<template v-slot="{ 解构 }"></template>；也提供了重命名，<template v-slot="{ 解构: 重命名的名字 }"></template>

```html 默认值，如果 sex 值为 undefined，那么 user.sex="male"；如果有值，正常输出 user.sex
<template v-slot="{ user = { sex: 'male' } }">{{ user.sex }}</template>
```

有如下特殊情况

```html 如果 sex 值为 undefined，那么只会输出默认值；如果有值，正常输出对象
<template v-slot="{ user = { sex: 'male' } }">{{ user }}</template>
```

### 动态插槽

> 使用的是：<template v-slot:[prop]></template>

### 具名插槽的缩写

> v-bind 可以缩写为 :

> v-on 可以缩写为 @

> v-slot 可以缩写为 #

*当有参数传递时，才可以进行缩写*

### 废弃语法

```html
<my-cmp>
  <template slot="header">
    <h1>头部</h1>
  </template>

  <template>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template slot="footer">
    <p>底部</p>
  </template>
</my-cmp>
```

```html
<my-cmp>
  <template slot="default" slot-scope="slotProps">
    {{ slotProps.user.name }}
  </template>
</my-cmp>
```

### 动态组件

> 定义好组件，然后在父中 通过 <component :is="组件名"></component>，实现切换效果

> vue 提供了一个 标签，用于缓存切换的标签，而不是销毁，在 <component :is="组件名"><component> 外包裹一个 <keep-alive></keep-alive> 标签，有两个钩子函数

1）activated：keep-alive 组件激活时 触发

2）deactivated：keep-alive 组件停用时 触发

### 处理边界情况

*一些需要对 vue 的规则做一些小调整的特殊情况，需要注意的是：这些功能都是有一定的劣势或危险性的，慎用*

1）$root：在每个子组件中，访问根实例

2）$parent：在每个子组件中，访问父实例

3）依赖注入：通过 provide() { return key: value } 和 inject: ['key']

> 注意的是：被注入的属性是放到身上的实例对象上的，如果想要使用，通过 this.xxx 访问数据

- 存在两种特殊情况，不能使用：

> 祖先组件不知道哪些后代组件需要使用它的属性

> 后代组件不需要知道被注入的属性来自哪

4）$ref：在js代码中，给子组件身上添加一个唯一标识，ref="名"，在 vm 实例中，可以通过 this.$refs 访问到；如果 ref 和 v-for 指令一起使用，那么通过 this.$refs 得到的数据是一个数组

### 程度化的事件监听器

1）通过 $on(eventName, eventHandler)：侦听一个事件

2）通过 $once(eventName, eventHandler)：侦听一次事件

3）通过 $off(eventName, eventHandler)：停止侦听一个事件

> 一般不会使用到，除了当需要在一个组件上手动侦听事件时，可以派上用场

*eventName：'hook:vue的某个生命周期'*

*eventHandler：function() { 处理的函数 }*

```js
Vue.component('my-cmp', {
    mounted() {
        // 这是一个第三方库，提供关于时间插件，叫 Pikaday
        this.picker = new Pikaday({
            field: this.$refs.input,
            format: 'YYYY-MM-DD'
        });
    },
    beforeDestroy() {
        // 组件被销毁时前，也销毁这个日期选择器
        this.picker.destroyed();
    }
});
```

> 我们想销毁这个插件，但是给 vm 身上添加了一个 全局属性，为了不污染，建议使用如下方式：

```js
Vue.component('my-cmp', {
    mounted() {
        var picker = new Pikaday({
            field: this.$refs.input,
            format: 'YYYY-MM-DD'
        });

        this.$once('hook:beforeDestroy', () => {
            picker.destroyed();
        })
    }
});
```

### 循环调用

> 组件可以通过自身调用，只能通过 name 选项；如果是通过全局的 Vue.component('组件名', { xxx })，注册的话，全局的 ID 会自动设置该组件的 name 选项

*和 递归调用 一样，需要个 出口，不然会造成 栈溢出，浏览器会报错：Maximum call stack size exceeded*

### 组件间的循环调用

> 如果使用的是全局组件，并不会出现悖论，但是如果使用的是局部组件，就会出现悖论

*即使是使用了全局组件，在使用 webpack 去导入组件时，也会出现一个错误：Failed to mount component:template or render function not defined*

> 因为 webpack 会对模块进行分析，编译处理的时候，发现依赖关系，但是是一个循环，所以会抛出错误，此时，我们需要给模块一个点，告诉模块依赖关系，但是先不解析另一个模块

```js
beforeCreated() {
    this.$options.components.CmpB = require('./tree-folder-contents.vue').default;
}
```

*或本地注册组件时，可以使用 webpack 的异步导入 import*

```js 
components: {
    CmpB () {
        import('./tree-folder-contents.vue');
    }
}
```

### 内联模板

> 在组件时使用特性，inline-template，不推荐，最佳实践是：在组件内使用 template 选项 或 .vue 文件中的 <template></template> 标签来定义模板

### X-Template

> 另一个定义的模板是在一个 <script></script> 中，并为其带上一个 text/x-template 的类型，然后通过一个 id 将模板引用过去

### 控制更新

> 当更改了数据，页面却并未重新渲染，我们可以使用 $foreUpdate 做一次强制刷新，但很少情况下会用，排查一切后，还是没有渲染，再使用

> 在模板中的标签上使用 v-once 创建低开销的静态组件，还是不建议使用

## 通信

1）prop：父组件传递数据，子组件通过 props 接收

2）$emit：子组件触发事件，抛出数据，传递给父组件

3）v-model、.sync：双向数据绑定（双向链路）

> v-model 可以直接绑定 type 为 text 的 input 中的 value 值，如果是其他，记得配置 model 选项；使用 .sync 时，在子组件上设置 :prop 和 @prop="$emit('update:prop', $event.target.[value | checked])"，在父组件上才可以使用 :prop.sync

4）$attrs：祖先组件传递数据给子孙组件，可以利用 $attrs，真正的目的是：撰写组件，将非 prop 特性赋予某些 dom 元素

> 配合 inheritAttrs: false，使用

5）$listeners：可以在子组件上执行祖先组件的函数，从而实现数据传递，真正的目的是：将所有的事件监听器指向这个组件的某个特定的子元素

6）$root：可以在子组件访根实例（vm）的数据

7）$children：可以在父组件中访问子实例的数据

8）$ref：可以在父组件上访问子实例的数据

8）provide、inject；祖先组件提供数据（provide），子孙组件获取数据（inject）

9）eventBus（事件总线）：可以在兄弟组件间传递数据，通过 Vue.prototype.$bus 自定义属性

10）Vuex：状态管理，中大型项目强烈推荐使用

## 混入

> 混入（mixn）提供了一种非常灵活的方式，来分发 vue 组件中的功能

1）局部混入：通过 var 、let 、const 申明一个 mixin，是一个对象，在通过 new 关键词的 vue 实例中设置 mixins 选项，是一个数组，每一项的值是 mixin 的名，直接书写，不需要用 '' 或 "" 包裹

2）全局混入：通过 Vue.mixin({ xxx })，通过 new 关键词 的 vue 实例中可以直接使用

*混入的注意项：如果是基础值，会进行覆盖；如果是对象或数组，会进行合并；如果是钩子函数，会依次进行输出*

## 自定义指令

*和 vue 自带的指令一样，我们自定义的指令，也需要在全面加上 v- 的前缀*

1）全局自定义：Vue.directive('名字', { xxx })

2）局部指令：通过 new 出来的 vue 实例上，配置 directives 选项，是一个对象，键值对形式 {'名字', { xxx }}

> 类似于 vue 的生命周期，vue 有 八个 钩子函数，自定义指令 vue 也提供了 五个钩子函数

1）bind：只调用一次，一旦绑定，立即执行，可以在这里进行初始化设置

2）inserted：被绑定的元素插入到父节点时调用（仅保证父节点存在，但不一定已被插入到文档中）

3）update：所在组件的 VNode 更新时被调用，但是可能发生在其子 VNode 更新之前

4）componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后被调用

5）unbind：只调用一次，指令与元素解绑时被调用（被绑定的 dom 元素被 vue 移除）

### 钩子函数参数

1）el：指令所绑定的元素，可以直接操作 dom

2）binging：{
    name：指令名，不包括 v- 前缀
    value：指令的绑定值
    oldValue：指令绑定的前一个值，仅在 updated 和 componentUpdated 钩子函数中可用，无论值是否发生变化都可用
    expression：字符串形式的指令表达式
    arg：传给指令的参数，可选
    modifier：一个包含修饰符的对象
}

3）VNode：vue 生成的 虚拟 dom 节点

4）oldVNode：上一个 虚拟 dom 节点，仅在 updated 和 componentUp 钩子函数中可用

*如果钩子函数只有 bind 和 update， 那么可以进行简写，直接写成一个处理函数，里面是处理逻辑*