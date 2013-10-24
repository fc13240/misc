# seajs使用过程中问题总结

### seajs.use 相对当前页面
> 但如果相对路径不是以`.`或`..`则相对`seajs.data.base`

如当前所在路径为：`http://test.com/a/index.html`,`seajs.data.base = "http://test.com/js/"`

```
// http://test.com/js/m_a.js
seajs.use('m_a.js')

// http://test.com/a/m_a.js
seajs.use('./m_a.js')

// http://test.com/js/m_a.js
seajs.use('../js/m_a.js')
```

### require 及 require.async 相对当前文件
> 但如果相对路径不是以`.`或`..`则相对`seajs.data.base` (可以是别名，如：`require('jquery')`)

如，当胶所在文件路径为`http://test.com/js/m_a.js`,`seajs.data.base = "http://test.com/js/"`
```
// http://test.com/js/m_b.js
require('./m_b')

// http://test.com/m_b.js
require('../m_b')

// http://test.com/js/m_b.js (相对seajs.data.base)
require('m_b')
```