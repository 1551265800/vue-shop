<template>
    <div>
        <ProductList/>
        <Page/>
    </div>
</template>

<script>
import ProductList from './productList.vue';
import Page from './Page.vue';
    export default {
    components: { ProductList, Page }
}
</script>

<style lang="less" scoped>

</style>