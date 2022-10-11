<template>
    <el-dialog title="添加商品" :visible.sync="dialogAddVisible" width="70%" :before-close="handleClose">
        <el-form :model="addForm" status-icon ref="addForm" label-width="100px">
            <el-form-item label="商品类目">
                <el-button class="category" type="primary" @click="dialogCategoryVisible = true">
                    类目选择
                </el-button>
                <span class="category">{{treeData.name}}</span>
                <el-dialog title="类目选择" :visible.sync="dialogCategoryVisible" width="50%" append-to-body
                    :before-close="handleClose">
                    <ProductTree @onTree = "getTreeData"/>
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
                <img class="upload-img" :src="imageData.url" alt="">
                <el-dialog title="上传图片" :visible.sync="dialogUplodeVisible" width="50%" append-to-body
                    :before-close="handleClose">
                    <Uplode @onUpLode="getUpLodeData"/>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogUplodeVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogUplodeVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <UEditor @onEditor="getEditorData"/>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="addHandel">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ProductTree from "./productTree.vue";
import Uplode from "./Uplode.vue";
import UEditor from "./UEditor.vue";
import api from "../../api/index"
export default {
    data() {
        return {
            dialogAddVisible: false,
            dialogCategoryVisible: false,
            dialogUplodeVisible: false,
            addForm: {},
            treeData:{},
            imageData:{},
            EditorData:""
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //获取商品类目数据
        getTreeData(data){
            this.treeData = data;
        },
        //获取表单数据(添加按钮)
        addHandel(){
            /* console.log(this.addForm); */
            
            api.insertTbItem({
                title:this.addForm.name,
                cid:this.treeData.cid,
                sellPoint:this.addForm.sellPoint,
                price:this.addForm.press,
                num:this.addForm.num,
                desc:this.EditorData,
                image:this.imageData.url,
            }).then(res=>{
                if (res.data.status === 200) {
                    this.dialogAddVisible = false;
                    this.$bus.$emit("onRefresh",true);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取图片信息
        getUpLodeData(data){
            if (data.url) {
                data.url = data.url.replace("upload","http://localhost:3000")
            }
            this.imageData = data;
        },
        //获取富文本编辑器数据
        getEditorData(data){
            this.EditorData = data
        }

    },
    mounted() {
        this.$bus.$on("onAdd", res => {
            this.dialogAddVisible = res;
        });
    },
    components: { ProductTree, Uplode, UEditor }
}
</script>

<style lang="less" scoped>
.category {
    float: left;
    margin-left: 20px;
}
.upload-img{
    width: 200px;
    float: left;
    margin-left: 10px;
}
</style>