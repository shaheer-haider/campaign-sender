<template>
    <p class="text-xl text-semibold hover:bg-indigo-200 text-indigo-800 left-nav-link">
        <slot></slot>
    </p>
</template>

<style>
.left-nav-link>a{
    display: block;
    padding: 16px 18px;
}
.nuxt-link-exact-active{
    background: #3730a3;
    color: white;
}
</style>