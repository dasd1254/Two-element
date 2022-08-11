// 第一种方式:单个组件注册方式
// import ctTable from './src/ct-table.vue';
// export default {
//     install:Vue=>{
//         Vue.component('ct-table',ctTable)
//     }
// }

// 第二种方式暴露：多个组件注册
import Tables from './src/tables.vue'
import Table from './src/table.vue'
export { Table, Tables }
