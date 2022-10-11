<template>
    <div>
        <Head/>
        <ProductList/>
        <Page/>
        <ProdectAdd/>
    </div>
</template>

<script>
import ProductList from './productList.vue';
import Page from './Page.vue';
import Head from './head.vue';
import ProdectAdd from './prodectAdd.vue';
    export default {
    components: { ProductList, Page, Head, ProdectAdd }
}
</script>

<style lang="less" scoped>

</style>