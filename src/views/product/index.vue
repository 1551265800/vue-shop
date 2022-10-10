<template>
    <div>
        <Head/>
        <ProductList/>
        <Page/>
    </div>
</template>

<script>
import ProductList from './productList.vue';
import Page from './Page.vue';
import Head from './head.vue';
    export default {
    components: { ProductList, Page, Head }
}
</script>

<style lang="less" scoped>

</style>