<template>
    <el-tree :props="props" :load="loadNode" lazy></el-tree>
</template>

<script>
import api from "../../api/index"
export default {
    data() {
        return {
            props: {
                label: "name"
            },
        };
    },
    methods: {
        loadNode(node, resolve) {
            if (node.level === 0) {
                api.categorySelection().then(res => {
                    if (res.data.status === 200) {
                        return resolve(res.data.result)
                    } else {
                        return resolve([])
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
            if (node.level >= 1) {
                api.categorySelection({
                    id: node.data.cid
                }).then(res => {
                    if (res.data.status === 200) {
                        return resolve(res.data.result)
                    } else {
                        return resolve([])
                    }
                }).catch(err => {
                    console.log(err);
                })
            }

        }
    }
};
</script>

<style lang="less" scoped>

</style>