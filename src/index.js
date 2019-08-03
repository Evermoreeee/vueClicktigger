/**
 * trigger-area 图标点击事件触发区域扩大器
 * @params {element} el是目标元素
 * @parmas {object} options作为控制padding的对象
 * 加指令的元素必须是定位元素
 * 传递参数的时候，因为考虑到居中问题，建议传递一样的参数值，确保可以居中
 * 绑定指令的元素 不能设置overflow属性 否则会失去效果
 *
 *
 * @example
 * <div><i v-trigger-area:10*20*30*40></i></div>
 * v-trigger-area:10  一个值代表上下左右
 * v-trigger-area:10*20   两个值对应【上下】【左右】
 * v-trigger-area:10*20*30  三个值对应 【上】【左右】【下】
 * v-trigger-area:10*20*30*40  四个值对应 【上】【右】【下】【左】
 */
/**
 * 自定义创建span节点的函数
 * @param  {element} $el - 目标dom元素
 * @param  {object} binding - 指令对象
 * @return {VNode}  vnode  -vue节点对象
 */
function createArea($el) {
  // 原生创建一个span 作为插入的虚拟节点
  const ficSpan = document.createElement('span')
  /**
   *
   * 控制创建出的节点的样式
   * @type {[type]}
   * 创建之后插入到$el实例中
   */
  $el.appendChild(ficSpan)
  return ficSpan
}

export default {
  /**
   * 自定义指令的钩子函数 inserted 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
   * @param  {element} $el - 目标dom元素
   * @param  {object} binding - 指令对象
   */
  inserted($el, binding) {
    const pos = window.getComputedStyle($el)
    // window.console.log(pos.position)
    if (!pos.position || pos.position === 'static') {
      $el.style.position = 'relative'
    }

    const ficSpan = createArea($el)

    const argList = binding.arg.split('*')
    // 获取根节点的字体大小 换算公式 rem = rootFontSize / 100 * 具体值
    const rootFontSize = document.documentElement.getAttribute('data-font-size') / 100
    const offset = {
      height: 0,
      width: 0,
    }
    // 测试用例背景色
    ficSpan.style.background = 'transparent'

    if (argList.length === 1) {
      // 上下左右四个方向都是同样的值
      const length = argList[0] * rootFontSize
      ficSpan.style.padding = `${length}px`
      offset.height = offset.width = length * 2
    }
    if (argList.length === 2) {
      const width = argList[0] * rootFontSize
      const height = argList[1] * rootFontSize
      // 新元素的padding-top
      ficSpan.style.paddingTop = `${width}px`
      // 新元素的padding-bottom
      ficSpan.style.paddingBottom = `${width}px`
      // 新元素的padding-left
      ficSpan.style.paddingLeft = `${height}px`
      // 新元素的padding-right
      ficSpan.style.paddingRight = `${height}px`
      offset.width = width * 2
      offset.height = height * 2
    }
    if (argList.length === 3) {
      const top = argList[0] * rootFontSize
      const bottom = argList[2] * rootFontSize
      const width = argList[1] * rootFontSize
      // 新元素的padding-top
      ficSpan.style.paddingTop = `${top}px`
      // 新元素的padding-left
      ficSpan.style.paddingLeft = `${width}px`
      // 新元素的padding-right
      ficSpan.style.paddingRight = `${width}px`
      // 新元素的padding-bottom
      ficSpan.style.paddingBottom = `${bottom}px`
      offset.width = width * 2
      offset.height = top + bottom
    }
    if (argList.length === 4) {
      const top = argList[0] * rootFontSize
      const right = argList[1] * rootFontSize
      const bottom = argList[2] * rootFontSize
      const left = argList[3] * rootFontSize
      // 新元素的padding-top
      ficSpan.style.paddingTop = `${top}px`
      // 新元素的padding-right
      ficSpan.style.paddingRight = `${right}px`
      // 新元素的padding-bottom
      ficSpan.style.paddingBottom = `${bottom}px`
      // 新元素的padding-left
      ficSpan.style.paddingLeft = `${left}px`
      offset.width = left + right
      offset.height = top + bottom
    }
    //
    if (ficSpan) {
      // 绝对定位在父元素的
      ficSpan.style.position = 'absolute'
      ficSpan.style.top = '50%'
      ficSpan.style.left = '50%'
      ficSpan.style.boxSizing = 'border-box'
      ficSpan.style.marginTop = `${-0.5 * offset.height}px`
      ficSpan.style.marginLeft = `${-0.5 * offset.width}px`
    }
  },
}
