<template>
    <div>
        <vue-ueditor-wrap v-model="msg" :config="editorConfig" editor-id="editor-demo-01"></vue-ueditor-wrap>
    </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
export default {

    components: {
        VueUeditorWrap,
    },
    data() {
        return {
            msg: '<h2>Hello World!</h2>',
            editorConfig: {
                UEDITOR_HOME_URL: "/UEditor/",
                serverUrl: "",
                autoHeightEnabled: true,
                initialFrameHeight: 240,
                initialFrameWidth:"100%"
            }
        }
    },
    watch: {
        msg(newValue) {
            this.$emit("onEditor",newValue)
        }
    },
}
</script>

<style lang="less" scoped>

</style>