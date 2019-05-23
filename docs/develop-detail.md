## 一 目录及文件命名

以功能划分为主，业务逻辑隔离，好维护和扩展。其中文件命名规范：组件的目录或者文件名为 `PascalCase`，其他目录及文件用中划线。

```bash
/src
  /app.js # app 顶层文件
  /app.css # 管理所有样式文件
  /index.js # 入口文件，设计 app 整理逻辑的都应该放到 app.js 中
  /components # 公共组件，可进一步嵌套，无状态组件，不应该有 redux
    /GptAD.jsx # 文件名即组件引用名，PascalCase 命名
    /Button # 如果是目录，目录名即组件引用名
      /index.jsx # 里面用 index.jsx
      /index.scss
    /Loading
      /components
        /xxx.jsx
        /xxx.scss
      /index.jsx
      /index.scss
  /pages # 具体页面
    /Home
      /components # 仅仅供 home 使用的组件，包含单独的 redux 等
        /xxx
      /redux
        /action.js # 汇总所有 actions
        /reducer.js # 汇总所有 reducer
        /inital-state # 一级目录统一管理 inital state 太多也不好
      /index.jsx
      /index.scss
      /home-redux.js # 供home使用的 redux，包括action，reducer
      /dict.js
  /services # 不是所有东西都可以提取为组件，service 给组件（pages）提供服务
    /api # 封装 request，包括错误处理等等
      /http # 封装 axios or ajax 等
        /cms.js # 不同域名不同实例
        /b2c.js
      /request.js # 所有接口列表，放在一个文件中就好，因为格式简单，接口请求本身也要控制数量
    /router # 路由服务
    /styles # 全局样式
      /reset.css
      /global.css
    /redux # 整体 redux
      /root-reducer.js # 引入所有 reducer
      /config-store.js # 生成 store，中间件引入等
    /mock # mock 数据
    /utils # 工具，常量，不同通过 mock 模拟的本地假数据等
      /utils.js # 工具函数
      /constant.js # 常量，可能根据不同 env 设置不同常量，因为环境确定就不变，也定义为常量（大写）
      /locale-data.js # locale data 不应该很多，比如 cookie，安卓端返回的常量等，api 数据应该通过 mock 获取
    /third-party # 第三方服务
      /mixpanel.js
      /hotjar.js
```

Q&A：

1. 为什么有 app.js 和 index.js

app.js root components, index.js traditional and actual entry file.

2. 如何处理全大写字母

- 如果单词缩写是两个字母的，则全大写，例如是 IOException 而不是 IoException。
- 如果单词缩写超过两个字母，则第一个字母大写，其余字母小写。

参考

[如何更好地组织 React 项目](https://github.com/JChehe/blog/issues/19)  
[How to better organize your React applications?](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)  
[airbnb naming](https://github.com/airbnb/javascript/tree/master/react#naming)
[驼峰命名法该如何解决某些单词需要大写的问题?](https://www.zhihu.com/question/31524855)  
[Why does create-react-app creates both App.js and index.js?](https://stackoverflow.com/questions/50493069/why-does-create-react-app-creates-both-app-js-and-index-js)

## 二 开发

### 2.1 引入 scss

安装 `node-sass` 就好了，重命名 `app.css` 为 `app.scss`，然后在 `app.scss` 中统一管理一级页面样式，一级页面的样式在一级页面的 `index.scss` 中管理。

[Adding a Sass Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet)

- `src/app.scss`

```scss
@import './pages/Home/index.scss';
```

- `src/pages/Home/index.scss`

```scss
#cityGuideHome {
  border: 1px solid rebeccapurple;
  button {
    border: 2px solid red;
  }
}

@import './components/Eat/index.scss';
```

> 多次 import 有性能问题？？

### 2.2 eslint + prettier 代码检查

react 已经集成 eslint，如何覆盖默认配置？现在还没应用场景（强制加逗号？）。

1. 安卓依赖

```
npm i -D prettier eslint-plugin-prettier
```

2. 在 vscode 中安装 Prettier ESLint 插件

3. Create the Prettier and ESLint Configuration files

- `.eslintrc`：

```json
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

- 如果 prettier 默认配置不够用，自己[配置](https://prettier.io/docs/en/options.html)

`.prettierrc`

```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

4. 开启编辑器支持自动格式化

- 全局支持：不推荐，这样任何项目都会在保存后 format

```bash
"editor.formatOnSave": true
```

- eslint 自动格式化，推荐，只有项目中配置了 eslint 才会自动格式化

```js
"eslint.autoFixOnSave": true,
```

[Using Prettier with VS Code and Create React App](https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08)

## 三 引入 redux

### 3.1 安装依赖

```bash
npm i redux react-redux
```

其中 react-redux 提供 props 和 dispatch 的映射

### 3.2 针对上面目录在项目中引入

```bash
/src
  /pages # 具体页面
    /Home
      /components # 仅仅供 home 使用的组件，包含单独的 redux 等
        /Eat
          /eat-redux.js
      /redux
        /action.js # 汇总所有 actions
        /reducer.js # 汇总所有 reducer
        /inital-state # 一级目录统一管理 inital state 太多也不好
      /index.jsx
      /home-redux.js # 供home使用的 redux，包括action，reducer
  /List
    /index.jsx
    /list-redux.js # 供home使用的 redux，包括action，reducer
    /redux
      /action.js # 汇总所有 actions
      /reducer.js # 汇总所有 reducer
      /inital-state # 一级目录统一管理 inital state 太多也不好
  /services # 不是所有东西都可以提取为组件，service 给组件（pages）提供服务
    /redux # 整体 redux
      /root-reducer.js # 引入所有 reducer
      /config-store.js # 生成 store，中间件引入等
```

#### 3.2.1 处理 redux 业务逻辑

对于 home 以及 home 子组件的 redux 具体业务逻辑由 `*-redux.js` 维护，比如

- `/Home/home-redux.js`

```js
// this one group, eazy develop and maintain
const HOME_SEND_FIRST_DATA = 'HOME_SEND_FIRST_DATA';

export const setHomeAction = exampleData => {
  return {
    type: HOME_SEND_FIRST_DATA,
    exampleData,
  };
};
// just name reducer fn to reducer, need not add pre-name
// any actions will be received by reducers
export const reducer = (state, action) => {
  switch (action.type) {
    case HOME_SEND_FIRST_DATA:
      return {
        ...state,
        homeReduxData: action.exampleData,
      };
    default:
      return state;
  }
};

// this is other one if has
```

- `/Home/components/Eat/eat-redux.js`

```js
const EAT_SEND_FIRST_DATA = 'EAT_SEND_FIRST_DATA';
export const setEatAction = exampleData => {
  return {
    type: EAT_SEND_FIRST_DATA,
    exampleData,
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case EAT_SEND_FIRST_DATA:
      return {
        ...state,
        eatReduxData: action.exampleData,
      };
    default:
      return state;
  }
};
```

#### 3.2.2 汇总单个页面 reducer/action

而 `/pages/*` 下面一级页面组件下的一级子目录 `redux` 文件夹下汇总当前页面组件的 `inital state` 以及 actions 和 reducers，比如 `home` 页面下

- `/pages/[xx/]*-redux.js`

```js
// /Home/redux/action.js
export { setHomeAction } from '../home-redux';
export { eatAction } from '../components/Eat/eat-redux';

// /Home/redux/inital-state.js
export const initialState = {
  eatReduxData: 'eat redux data',
  homeReduxData: 'home redux data',
};

// /Home/redux/reducer.js
import { reducer as homeReducer } from '../home-redux';
import { reducer as eatReducer } from '../components/Eat/eat-redux';
import { initialState } from './initial-state';

const reducers = [homeReducer, eatReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = initialState;
      break;
  }

  // export all reducers
  return reducers.reduce((s, r) => r(s, action), newState);
}
```

这里 inital state 需要注意，可以在不同页面建立不同的 inital state，在汇总项目的 roor reducer 中会加以说明。

#### 3.2.3 汇总项目 reducer（root reducer）

最后在 `/services/redux/*` 目录下汇总所有 reducer，create store 以及引入中间等。

- `/services/redux/*`

```js
// /services/redux/config-store.js
import { createStore } from 'redux';
import rootReducer from './root-reducer';

export default createStore(
  rootReducer
);

// /services/redux/root-reducer.js
import { combineReducers } from 'redux';
import homeReducer from '../../pages/Home/redux/reducer';
import listReducer from '../../pages/List/redux/reducer';

const reducerMap = {
  // this is state property, initial state in different page is isolate
  home: homeReducer,
  list: listReducer,
};

// root reducer
export default combineReducers(reducerMap);
```

在 create store 的时候可以根据传给 root reducer 的子 reducer 属性名，给项目 store 创建对应属性，作为不同页面的 inital state。比如，上面初始化的 state 为：

```js
{
  home: {
    eatReduxData: 'eat redux data',
    homeReduxData: 'home redux data',
  },
  list: {
    listReduxData: 'list redux data',
  }
}
```

> 具体可看下 `combineReducers` 和 `createStore` 的实现原理。

#### 3.2.4 在页面中引用

1） `index.js` 引入 `Provider` 组件，作为项目根组件，然后把 `store` 注入

- `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './services/redux/config-store';

import App from './App';

console.log(store, 233333);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

2）通过 `connect` 使所有自组件可以访问在 `Provider` 中注入的 `store`：

其中 `action` 从当前页面的 `./redux/action.js` 中导入

以 `/home/index.jsx` 为例：

```js
import * as React from 'react';
import { connect } from 'react-redux';

import { setHomeAction } from './redux/action';

class PureHome extends React.Component {
  changeHomeRedux = () => {
    this.props.setHomeAction(
      `home redux time ${new Date().getMinutes()}:${new Date().getSeconds()}`
    );
  };

  render() {
    return (
      <div id="cityGuideHome">
        <p>this is home</p>
        <p>{this.props.homeReduxData}</p>
        <button onClick={this.changeHomeRedux}>changeHomeRedux</button>
      </div>
    );
  }
}

// redux
const mapStateToProps = state => {
  return {
    homeReduxData: state.home.homeReduxData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setHomeAction: homeData => dispatch(setHomeAction(homeData)),
  };
};
const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureHome);

export default Home;
```

### 3.3 中间件

#### 3.3.1 为什么

~~感觉没有必要引入 redux-logger 中间件，因为 redux-dev 已经很好用了。但异步用的 redux-chunk/redux-saga 还是有用的，暂时没有应用场景（redux-saga 提取异步逻辑，使组件更清晰易维护？）。~~

需要引入中间件，redux 作为 react 的数据处理的库，除了处理共享的数据，还处理页面中的接口请求数据（主要为了便于缓存和分离业务逻辑以及方便测试）。参考这里 [Redux — why is state all in one place, even state that isn't global?](https://stackoverflow.com/questions/35664594/redux-why-is-state-all-in-one-place-even-state-that-isnt-global)，[Redux FAQ: Organizing State](https://redux.js.org/faq/organizing-state) and [redux store 取代 react state 合理吗？](https://www.zhihu.com/question/271693121)

什么时候用 redux，什么时候用 state，写几个常见场景：

1. 共享肯定 redux
2. 如果需要 cache（组件 unmounted 之后的状态依然需要，比如 tab 切换的位置，api 请求数据）使用 redux
3. 如果仅仅是 select 下拉状态这种，使用 state（仅仅和内部有关，且无需缓存）
4. form 表单比较特殊，看组件 unmounted 之后返回是否还要保存填入的状态

#### 3.3.2 store 数据结构

这么多数据存储在 store 中，数据结构很重要，要便于查找，**扁平化** 的结构很重要。

#### 3.3.2 redux-dev

在 redux-dex 中和 middleware 集成。参考：[1.2 Advanced store setup](https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup)

```js
// integrate redux-dev and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware()
  // other store enhancers if any
);

export default createStore(rootReducer, enhancer);
```

#### 3.3.3 引入 redux-saga

看官方文档：[redux-saga](https://github.com/redux-saga/redux-saga)

这里说明下怎么将 redux-saga 集成到一个文件：

```js
// foo.js
export const fooSagas = [
  takeEvery("FOO_A", fooASaga),
  takeEvery("FOO_B", fooBSaga),
]

// bar.js
export const barSagas = [
  takeEvery("BAR_A", barASaga),
  takeEvery("BAR_B", barBSaga),
];

// index.js
import { fooSagas } from './foo';
import { barSagas } from './bar';

export default function* rootSaga() {
  yield all([
    ...fooSagas,
    ...barSagas
  ])
}
```

from [using root saga or multiple sagas](https://github.com/redux-saga/redux-saga/issues/160)

## 四 引入 react-router

页面依赖的数据是放在路由中还是放在 props/state 中，可以这样判断：当前页面是否有可能通过外部连接跳转过来，如果是，可以把页面参数放到路由中，如果不是，简单非敏感且又含有语义的信息也可以放在路由中。

### 4.1 安装依赖

```bash
npm install --save react-router-dom
```

### 4.2 编写路由文件

- `src/services/router.js`

懒加载啦

```js
import React, { Suspense, lazy } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Loading } from '../components/Loading/index';

const Home = lazy(() => import('../pages/Home/index'));
const List = lazy(() => import('../pages/List/index'));

const AppRouter = () => (
  <Router>
    <Suspense fallback={Loading}>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Switch>
          <Route path="/home" render={() => <Home />} />
          <Route path="/list" render={() => <List />} />
        </Switch>
      </div>
    </Suspense>
  </Router>
);

export default AppRouter;
```

### 4.3 改造 app.js

- before

```js
import React from 'react';
import Home from './pages/Home/index';
import List from './pages/List/index';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Home />
      <List />
    </div>
  );
}

export default App;
```

- after

```js
import React from 'react';
import AppRouter from './services/router';
import './App.scss';

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
```

### 4.4 页面跳转

#### 4.4.1 `Link` 标签

```js
<Link to="/list">goToList</Link>
```

#### 4.4.2 函数式跳转

需要使用 [`withRouter`](https://reacttraining.com/react-router/web/api/withRouter) 包裹

```js
import { withRouter } from 'react-router-dom';

// this integrate redux
const List = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PureList)
);
```

- 跳转

```js
// go to some page
this.props.history.push('/path');

// go back
this.props.history.goBack();
```

#### 4.4.3 嵌套路由

因为 `Route` 本身是组件，所以可以在父组件中直接写嵌套自路由，同时这里使用了 `<NavLink>`。

嵌套路由能更好的实现和 react-router 同一个 path 可以匹配多个 component 有关，比如 `/home` 匹配容器组件 `Home` 在其中放置公共组件，而默认显示的导航页面也可以设置为 `/home`，比如 `Eat` 这样就可以显示公共组件的同时显示具体业务组件。

或者利用 react-router 部分匹配，在`/home/eat` 的时候匹配 `Home`，也可以显示多个组件，这时候在 `/home` 就不能写 `exact`，不然匹配不到

- `./Home/components/Nav/index.jsx`

这里在 home 中包含了 eat/shop 子导航，实际，此处的 home 作为一个容器，其他模块作为组件的形式加载（影响加载时间吗？因为不是直接加载，要 home 容器加载完，才能加载组件，另外，路由组件做了一次 redirect，是否影响懒加载？）

```js
import React, { Suspense, lazy } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Loading } from '../../../../components/Loading/index';

// 懒加载
const Eat = lazy(() => import('../Eat/index'));
const Shop = lazy(() => import('../Shop/index'));

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        {/* child route */}
        <NavLink to="/home/eat" activeClassName="selected-nav">
          Eat
        </NavLink>
        <NavLink to="/home/shop" activeClassName="selected-nav">
          Shop
        </NavLink>
        <Suspense fallback={Loading}>
          <Route path="/home/eat" render={() => <Eat />} />
          <Route path="/home/shop" render={() => <Shop />} />
        </Suspense>
        {/* <Route path="/home/eat" component={Eat} />
        <Route path="/home/shop" component={Shop} /> */}
      </div>
    );
  }
}
```

- `/Home/index.jsx` 中引入 `Nav`

```js
<div id="cityGuideHome">
  <Nav />
  <p>this is home</p>
</div>
```
