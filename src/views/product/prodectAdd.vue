<template>
    <el-dialog title="添加商品" :visible.sync="dialogAddVisible" width="70%" :before-close="handleClose">
        <el-form :model="addForm" status-icon ref="addForm" label-width="100px">
            <el-form-item label="商品类目">
                <el-button class="category" type="primary" @click="dialogCategoryVisible = true">
                    类目选择
                </el-button>
                <el-dialog title="类目选择" :visible.sync="dialogCategoryVisible" width="50%" append-to-body
                    :before-close="handleClose">
                    <ProductTree />
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogCategoryVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogCategoryVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input type="text" v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品买点">
                <el-input type="text" v-model="addForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input type="text" v-model="addForm.press"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input type="num" v-model="addForm.num"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-button class="category" type="primary" @click="dialogUplodeVisible = true">
                    上传图片
                </el-button>
                <el-dialog title="上传图片" :visible.sync="dialogUplodeVisible" width="50%" append-to-body
                    :before-close="handleClose">
                    <Uplode/>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogUplodeVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogUplodeVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ProductTree from "./productTree.vue";
import Uplode from "./Uplode.vue";
export default {
    data() {
        return {
            dialogAddVisible: true,
            dialogCategoryVisible: false,
            dialogUplodeVisible: false,
            addForm: {}
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
    },
    mounted() {
        this.$bus.$on("onAdd", res => {
            this.dialogAddVisible = res;
        });
    },
    components: { ProductTree, Uplode }
}
</script>

<style lang="less" scoped>
.category {
    float: left;
    margin-left: 20px;
}
</style>