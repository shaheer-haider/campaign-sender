<template>
    <nav class="h-screen flex flex-col">
        <div
            id="topNav"
            class="bg-indigo-900 p-4 text-gray-100 font-bold font-mono"
        >
            <h1 class="text-3xl">
                <span class="text-red-600 text-4xl">Al-Nafi</span> Campaign Sender
            </h1>
        </div>
        <div class="flex bg-indigo-100 max-w-full min-w-full h-full">
            <LeftNav></LeftNav>
            <slot></slot>
        </div>
    </nav>
</template>

<script>
import LeftNav from "@/components/Header-Components/LeftNav.vue"
export default{
    components: {
        LeftNav
    }
}
</script>