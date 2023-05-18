<template>
    <div class="container">
        <div>
            <el-button type="primary" :plain="true">描边</el-button>
            <el-button type="primary" :round="true">圆角</el-button>
            <el-button type="primary" :circle="true">圆形</el-button>
            <el-button type="primary" :disable="true">禁用</el-button>
            <el-button type="primary" :loading="true">加载</el-button>
            <el-button type="primary">常规按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
            <el-button type="primary" icon="Delete">图标在左</el-button>
        </div>

        <div>
            <el-tag :closable="true">普通标签</el-tag>
            <el-tag :hit="true">描边标签</el-tag>
            <el-tag color="purple">紫色背景标签</el-tag>
        </div>
        <div>
            <el-image style="width:500px" src="http://huishao.cc/img/head-img.png">
                <template #placeholder>
                    <div style="color: #fff; font-size: 13px;">加载中...</div>
                </template>
                <template #error>
                    <div style="color: #fff; font-size: 13px;">加载失败</div>
                </template>
            </el-image>
            
            <el-avatar style="margin: 20px;">user</el-avatar>
            <el-avatar style="margin: 20px;" icon="UserFilled">user</el-avatar>

        </div>
     </div>
</template>

<script>
</script>