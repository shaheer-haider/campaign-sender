<template>
  <div class="pl-10 pt-6 w-full">
    <p class="text-3xl text-indigo-900 font-semibold block mb-3">Send Message</p>
    <div class="mb-2">
      <label for="from" class="text-xl text-indigo-900 inline-block w-16">From:</label>
      <input
        id="from"
        placeholder="Name of Sender"
        value="AL NAFI"
        class="outline-none p-1 bg-blue-50 border border-indigo-900 rounded-sm"
        type="text"
      />
    </div>
    <div class="mb-2">
      <label for="to" class="text-xl text-indigo-900 inline-block w-16">To:</label>
      <input
        id="to"
        class="outline-none p-1 bg-blue-50 border border-indigo-900 rounded-sm w-4/6"
        type="text"
        placeholder="Enter Comma(,) seperated numbers (92XXXXXXXXXX) or drop an excel(xlsx) file on it's right."
      />
    </div>
    <div class="flex mt-2">
      <label for="msg" class="text-xl text-indigo-900 inline-block w-16">SMS:</label>
      <textarea
        id="msg"
        class="resize-none ml-1 w-4/6 h-96 outline-none p-2 text-lg bg-blue-50 border border-indigo-900 rounded-sm"
      ></textarea>
      <div>
        <button
          @click="template_drop_toggle"
          class="w-28 mr-2 ml-4 text-base text-indigo-800 cursor-default p-1 px-2 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800 hover:text-white focus:bg-indigo-800 focus:text-white"
        >
          Templates &nbsp;
          <span class="text-xs">&#5167;</span>
        </button>
        <div
          id="templates-dropdown"
          v-if="show_template_drop"
          class="absolute bg-white ml-4 rounded-md cursor-default overflow-hidden border border-indigo-800"
          style="width: 112px;"
        >
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
        </div>
        <button
          class="block ml-4 mt-4 w-28 text-base text-indigo-800 cursor-default p-1 px-2 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800 hover:text-white focus:bg-indigo-800 focus:text-white"
          @click="sendMSG"
        >SEND</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      show_template_drop: false
    }
  },
  methods: {
    template_drop_toggle() {
      this.show_template_drop = !this.show_template_drop
    },
    sendMSG(){
      
    }
  }
}
</script>