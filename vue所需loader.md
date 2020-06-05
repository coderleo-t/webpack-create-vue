# vue所需loader
* vue-loader  
* vue-template-compiler
* vue-loader-plugin    路径vue-loader/lib/plugin

* 如果使用vue的runtime-only模式需要使用render函数讲组件渲染到dom上

* 如果使用runtime-compiler则需要在别名中设置  'vue$': 'vue/dist/vue.esm.js'

* 如果配置别名需要在dom中使用则路径前面要加上~