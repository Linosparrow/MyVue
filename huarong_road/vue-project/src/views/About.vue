<template>
    <el-container>
        <el-header height="80px" style="padding: 0;">
            <div class="header">12323</div>
        </el-header>
        <el-container class="layout-container-demo" style="height: 500px">
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu class="aside" @select="selectFunc" :default-openeds="['1']" :unique-opened="false">
                        <el-sub-menu index="1">
                            <template #title>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <template #title>Group 1</template>
                                <el-menu-item index="1-1">Option 1</el-menu-item>
                                <el-menu-item index="1-2">Option 2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Group 2">
                                <el-menu-item index="1-3">Option 3</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="1-4">
                                <template #title>Option4</template>
                                <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><icon-menu /></el-icon>Navigator Two
                            </template>
                            <el-menu-item-group>
                                <template #title>Group 1</template>
                                <el-menu-item index="2-1">Option 1</el-menu-item>
                                <el-menu-item index="2-2">Option 2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Group 2">
                                <el-menu-item index="2-3">Option 3</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="2-4">
                                <template #title>Option 4</template>
                                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <div class="toolbar">123</div>
                </el-header>
                <el-main style="padding: 0;">
                    <el-scrollbar>
                        <el-table :data="tableData">
                            <el-table-column prop="date" label="Date" width="140" />
                            <el-table-column prop="name" label="Name" width="120" />
                            <el-table-column prop="address" label="Address" />
                        </el-table>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
  
  
  
<script>
import { ref } from 'vue';
import throttle from 'lodash/throttle';
export default {
    data() {
        const item = {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
        };

        return {
            checkList: [],
            item: item,
            tableData: Array(20).fill(item),
        };
    },
    methods: {
        click: throttle(function () {
            console.log(Date());
        }, 2000),
        appfunc(param) {
            console.log("appfunc" + param);
        },
    },
    components: {

    },
    computed: {
        type() {
            return this.count % 2 == 0 ? "偶数" : "奇数";
        },
    },
    watch: {
        searcgText(a, b) {
            console.log(a, b);
        },
    },
};
</script>
<style scoped>
.header {
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    background-color: #f1f1f1;
    color: black;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>