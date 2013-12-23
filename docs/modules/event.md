# 事件模块
#### event.on  绑定事件  `event.on(eventName,callback)`
>eventName	`{String}`  事件名

>callback 	`{Function}` 事件回调函数

```
W.use('m_event',function(Event){
	var eventObj = new Event();
	eventObj.on('test',function(){
		// 第一次触发
	});
	eventObj.on('test',function(){
		// 第二次触发
	});
});
```

#### event.emit  触发事件  `event.emit(eventName,data)`
>eventName	`{String}`  事件名

>data `{Object}` 事件回调时传的参数
```
W.use('m_event',function(Event){
	var eventObj = new Event();
	eventObj.on('test',function(){
		// 第一次触发
	});
	eventObj.on('test',function(){
		// 第二次触发
	});

	eventObj.emit('test',{name: 'hello'});
	eventObj.emit('test',{name: 'world'});
});
```

#### event.off 移除事件 `event.off(eventName)`
>eventName	`{String}`  事件名 ( _eventName为空时，把所有事件清空_ )
```
W.use('m_event',function(Event){
	var eventObj = new Event();
	eventObj.on('test',function(){
		// 第一次触发
	});
	eventObj.on('test',function(){
		// 第二次触发
	});
	eventObj.off('test');
	eventObj.emit('test',{name: 'hello'}); //这里不会触发
});
```