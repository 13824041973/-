// 定义插件
export const RulesPlugin = {
    // 插件应该有一个公开方法install
    // 第一个参数是Vue 构造器
    // 第二个参数是一个可选的选项对象
    install(Vue) {

        // 注入组件
        Vue.mixin({

            // 钩子函数
            created: function () {

                // 验证逻辑
                const rules = this.$options.rules
                if (rules) {
                    Object.keys(rules).forEach(key => {
                        // 取得所有规则
                        const { validate, message } = rules[key]

                        // 监听，键是变量，值是函数
                        this.$watch(key, newValue => {

                            // 验证规则
                            const valid = validate(newValue)
                            if (!valid) {
                                console.log(message)
                            }
                        })
                    })
                }

                console.log('插件created');
            }
        })
    }
}