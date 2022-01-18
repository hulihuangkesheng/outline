<template>
    <div>
        <h4>生命周期</h4>
         <p @click="count++">count:{{count}}</p>
        <button @click="$destroy()">销毁组件</button>
        <p>time:{{time}}</p>
        
    </div>
</template>


<script>
export default {
    data(){
        return {
            count:1,
            page:1,
            time:1,
            size:10,
            datalist:[]
        }
    },
    //@创建阶段 
    beforeCreate(){
        console.log("beforeCreate",this.count);
    },
    created(){
         console.log("created",this.count);


        // 当用户离开当前组件时，应该取消ajax（如何取消ajax）
        // ajax{page,size}
            // $.ajax({
            //     url:'xx',
            //     data:{
            //         page:this.page,
            //         size:this.size
            //     },
            //     success:(res)=>{
            //         this.datalist = res.data
            //     }
            // })
    },
    //@挂载阶段
    beforeMount(){
        console.log('beforeMount',this.$el)
    },
    mounted(){
        console.log('mounted',this.$el)


        // 以下10次数据修改会合并成一次渲染
            // for(let i=0;i<10;i++){
            //     console.log('data change');
            //     this.count++;
            // }
            // 定时器
            // 当用户离开当前组件时，应该清除定时器
        this.timer = setInterval(()=>{
            this.time++;
            console.log('timer')
            if(this.time >= 10){
                clearInterval(this.timer)
            }
        },1000)
    },
    //@销毁阶段
    beforeDestory(){
        console.log('beforeDestroy')
    },
    destoryed(){
        console.log('Destroy')
        
        clearInterval(this.timer)
    },
    // @更新阶段
    beforeUpdate(){
        // console.log('beforeUpdate',this.count,this.$el.innerHTML)
    },
    updated(){
        // console.log('updated',this.count,this.$el.innerHTML)
    }
}
</script>


<style>

</style>