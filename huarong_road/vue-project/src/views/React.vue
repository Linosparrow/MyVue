<template>
    <div class="container">
        <div class="content">
            <input type="radio" :value="-1" v-model="sexFilter" />all
            <input type="radio" :value="0" v-model="sexFilter" />man
            <input type="radio" :value="1" v-model="sexFilter" />woman
        </div>
        <div class="search">search: <input type="text" v-model="searchKey"/></div>
        <div class="content">
            <table border="1" width="300px">
                <tr>
                    <th>name</th>
                    <th>sex</th>
                </tr>
                <tr v-for="(data, index) in showDatas">
                    <td>{{ data.name }}</td>
                    <td>{{ data.sex == 0 ? 'man' : 'woman' }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs, computed, watch, onMounted } from 'vue';
let mock = [
    {
        name:"no1",
        sex:1
    },{
        name:"no2",
        sex:0
    },{
        name:"no3",
        sex:1
    }
]
const showDatas = ref([])
const queryAllData = ()=> {
    setTimeout(()=>{
        showDatas.value = mock
    }, 3000)
}
onMounted(queryAllData)
let sexFilter = ref(-1)
let searchKey = ref("")
let FilterData = () => {
    searchKey.value = ""
    if (sexFilter.value == -1) {
        showDatas.value = mock
    } else {
        showDatas.value = mock.filter((data)=>{
            return data.sex == sexFilter.value
        })
    }
}
let searchData = () => {
    sexFilter.value = -1
    if (searchKey.value.length == 0) {
        showDatas.value = mock
    } else {
        // data 表示 mock 数组中的一个元素
        showDatas.value = mock.filter((data)=>{
            return data.name.indexOf(searchKey.value) != -1
        })
    }
}
watch(sexFilter, FilterData)
watch(searchKey, searchData)
</script>

<style>
</style>