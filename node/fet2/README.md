@liepin/fet
===

猎聘网前端工具 FET.

## 说明
1. 支持 ``es6`` 语法
2. 支持通过 ``require`` 引入样式
3. 支持自动编译 ``nodetpl-plus`` ，关于 ``nodetpl-plus`` 请参考 <http://www.nodetpl.com/cn/nodetpl-plus.html>
4. 支持自动合并小图标

## 安装

1. 若本地未安装 ``cnpm v3`` ，请先安装：

```
$ npm install -g cnpm@3 --registry=https://registry.npm.taobao.org
```

注意：最新版本的 ``cnpm`` 会在安装时创建软链，文件组织方式不是我们所需要的，所以需要使用 ``v3`` 版本。

2. 配置 ``cnpm`` 资源库地址：

```
$ cnpm set registry http://registry.cnpm.lietou.com
```

3. 安装 fet：

```
$ cnpm install -g @liepin/fet
```

4. 查看版本：

```
$ fet -v
```


## 语法

### 打包（pack）

```
$ fet pack <path> <args>
```

#### path

要打包的目录，当前目录请传 ``./``

### args

#### --watch 或 -w

是否监听文件变化，如果传入该参数，当文件变更时，自动编译

#### --help 或 -h

查看 ``pack`` 的帮助信息

## 更新日志

#### 0.18.0

  解决 branches 下编译路径不正确的bug

#### 0.14.0

  添加非 src 引用时的错误提醒，只有 src 下的（静态）文件才能被引用

#### 0.13.0

  添加 babel-pollyfil 等不需要编译的选项控制，解决 IE7、IE8 兼容性问题

#### 0.12.0

  为适配上线脚本，build目录中不再出现 node_modules 目录，改用 modules

#### 0.11.0

  修正了 windows 下反斜杠问题

#### 0.10.0

  修正了 ``--watch`` 状态下小图标重复编译的 bug

#### 0.8.0

  为了便于管理，sprites 图片不再写入 common.css 源文件，只有在编译阶段写入 build/css/common.css 中

  common.css 请勿再保留任何关于 sprites 的代码

### 0.7.2

  修正了 windows 下 css 文件编译路径不正确的 bug

## License

  @liepin/fet is available under the terms of the [MIT](LICENSE) License.
