<template>
    <div id="leftNav" class="bg-indigo-100 border-r border-black" style="min-width: 240px">
        <LeftNavLinks><NuxtLink to="/">SMS Campaign</NuxtLink></LeftNavLinks>
        <LeftNavLinks><NuxtLink to="/sms-template">SMS Templates</NuxtLink></LeftNavLinks>
        <LeftNavLinks><NuxtLink to="/email">Email Campaign</NuxtLink></LeftNavLinks>
        <LeftNavLinks><NuxtLink to="/email-template">Email Templates</NuxtLink></LeftNavLinks>
    </div>
</template>

<script>
import LeftNavLinks from "@/components/Header-Components/LeftNavLinks.vue"
export default {
    components: { LeftNavLinks }
}
</script>