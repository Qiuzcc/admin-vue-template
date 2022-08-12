<template>
  <div
    v-if="isExternal"
    v-on="$listeners"
    class="svg-external-icon svg-icon"
    :style="styleExternalIcon"
  >
  </div>
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<!--
* $listeners的作用，当组件的根元素不具备一些DOM事件，但是根元素内部的子元素具备对应的DOM事件时，
* 可以使用$listent获取父组件传进来的所有事件函数，再通过v-on=""绑定到指定元素上
-->

<script>
import {isExternal} from '@/utils/validate'
export default {
    name:'SvgIcon',
    props:{
        iconClass:{
            type:String,
            required:true
        },
        className:{
            type:String,
            default:''
        }
    },
    computed:{
        isExternal(){
            return isExternal(this.iconClass)
        },
        iconName(){
            return `#icon-${this.iconClass}`
        },
        svgClass(){
            if(this.className){
                return 'svg-icon' + this.className
            }else{
                return 'svg-icon'
            }
        },
        styleExternalIcon(){
            return{
                mask:`url(${this.iconClass}) no-repeat 50% 50%`,
                'webkit-mask':`url(${this.iconClass}) no-repeat 50% 50%`
            }
        }
    },
    mounted(){
        console.log(this.$listeners)    //查看父级添加的事件函数，打包时删除掉这个代码
    }
}
</script>

<style scoped>
.svg-icon{
    width:1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.svg-external-icon{
    background-color: currentColor;
    mask-size: cover!important;
    display: inline-block;
}
</style>

// 参考文档：https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage