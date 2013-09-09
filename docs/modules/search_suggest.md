# 文本框搜索提示模块

> 依赖`jquery`、`c/m_search_suggest.css`

options 可有以下选项
>```
isBindFocus {Boolean} //是否默认绑定focus事件
textBox {Object} //文本框对像
url {String} //提示数据来源
key {String} //关键词名称,默认为'cityname'
cbName {String} //回调函数名,默认为'callback'
onSelect {Function} //建议项选中的回调函数,如：function(data/*选中项的数据内容*/){}
maxnum {Number} //显示提示最大条数
>```

#### [示例](#/examples/search_suggest/index.md){.ajax-link .md}