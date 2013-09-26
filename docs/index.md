# 前言
### 背景
　　为了更好地开发和管理前端资源（包括javascript、css），此网站应运而生，对外的前端资源主要是source目录下文件（在目录及文件介绍中会详细说明）。
### 主要技术及注意事项
* 此网站主要基于PHP进行架构，文档可采用markdown语法，这里使用[markdown-php](http://michelf.ca/blog/2013/php-markdown-lib/)对`.md`类型文档进行解析,
现markdown主要分为两种,[普通markdown语法](http://daringfireball.net/projects/markdown/syntax)(或[中文说明](http://linux.cn/article-1944-1-qqmail.html))、[php Markdown Extra](http://michelf.ca/projects/php-markdown/extra/)。
* web server使用nginx，对`.md`进行`urlrewrite`,规则：`http://localhost/docs/index.md`->`http://localhost/libs/markdown-php/markdown.php?md=/docs/index.md`
* 导航加载文档说明采用`ajax`异步加载内容，一定要保证同域,详细可参考`/libs/js/p_index.js`


### 开发时注意事项
1. **采用`markdown`写文档时一定要认真学习`markdown`语法**
2. **严格按照 *前端规范* 编写代码及样式**
test

