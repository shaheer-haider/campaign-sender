<template>
  <form class="pl-10 pt-6 w-full" @submit.prevent="sendMSG">
    <p class="text-3xl text-indigo-900 font-semibold block mb-3">Send Message</p>
    <div class="mb-2">
      <p for="from" class="text-xl text-indigo-900 inline-block">
        From:&nbsp;&nbsp;&nbsp;
        <span class="font-semibold text-2xl">AL NAFI</span>
      </p>
    </div>
    <div class="mb-2 flex">
      <label for="to" class="text-xl text-indigo-900 inline-block w-16">To:</label>
      <textarea
        id="to"
        required
        v-model="receivers"
        class="resize-none ml-1 w-4/6 h-24 outline-none p-2 text-lg bg-blue-50 border border-indigo-900 rounded-sm"
        type="text"
        placeholder="Enter Comma(,) seperated numbers (92XXXXXXXXXX) or drop an excel(xlsx) file on it's right."
        :disabled="processing"
      ></textarea>
      <div class="ml-2 relative bg-indigo-500 rounded-md pd-2">
        <p class="absolute text-lg text-white" style="left: 15px; top: 10px;">Select or Drop an Excel File</p>
        <input
          type="file"
          @change="processExcel"
          id="excelFileSelector"
          draggable="true"
          title="Select An Excel file with Contacts"
          class="bg-transparent w-full h-24"
        />
      </div>
    </div>
    <div class="flex mt-2">
      <label for="msg" class="text-xl text-indigo-900 inline-block w-16">SMS:</label>
      <textarea
        id="msg"
        required
        v-model="msg"
        class="resize-none ml-1 w-4/6 h-96 outline-none p-2 text-lg bg-blue-50 border border-indigo-900 rounded-sm"
        placeholder="Write Message Here..."
        :disabled="processing"
      ></textarea>
      <div>
        <button
          @click="template_drop_toggle"
          :disabled="processing"
          class="w-32 mr-2 font-semibold ml-4 text-base text-indigo-800 cursor-default p-1 px-2 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800 hover:text-white focus:bg-indigo-800 focus:text-white"
        >
          Templates &nbsp;
          <span class="text-xs">&#5167;</span>
        </button>
        <div
          id="templates-dropdown"
          v-if="show_template_drop"
          class="absolute bg-white ml-4 rounded-md cursor-default overflow-hidden border border-indigo-800"
          style="min-width: 128px; max-width: 175px"
        >
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
          <p class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer">Space</p>
          <p
            class="hover:bg-indigo-200 p-2 border-t border-indigo-300 cursor-pointer"
          >Space Master TWO FIFTY</p>
        </div>
        <input
          class="block ml-4 mt-4 w-32 bg-transparent font-semibold text-base text-indigo-800 cursor-default p-1 px-2 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800 hover:text-white focus:bg-indigo-800 focus:text-white"
          type="submit"
          value="SEND"
        />
      </div>
    </div>
  </form>
</template>


<script>
import { read as readExcel, utils as utilsExcel } from 'xlsx';
export default {
  data() {
    return {
      show_template_drop: false,
      receivers: "",
      msg: "",
      processing: false,
      excelFile: "OK Bru"
    }
  },
  methods: {
    template_drop_toggle() {
      this.show_template_drop = !this.show_template_drop
    },
    callSMS_API(receiver) {
      this.$axios(
        {
          method: "post",
          url: "/api/sms/",
          data: {
            receiver: receiver,
            message: this.msg
          },
        }
      ).then(response => {
        if (response.status == 200) console.log(`Message has been sent to ${receiver}`)
        else console.log(`Message wasn't sent to ${receiver}`)
      })
    },
    async sendMSG() {
      this.processing = true
      let receivers = this.receivers.split(",")
      for (let receiver of receivers) {
        this.callSMS_API(receiver)
      }
      this.processing = false
      this.clearInputs()

    },
    clearInputs() {
      this.msg = ""
    },
    processExcel(e) {
      const excelFile = e.target.files[0]
      if (excelFile) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(excelFile)
        reader.onload = (e) => {
          const data = new Uint8Array(reader.result)
          const work_book = readExcel(data, { type: 'array' })
          var contactsFile = work_book["Sheets"][work_book.SheetNames[0]]
          delete contactsFile["!ref"]
          delete contactsFile["!margins"]
          var contacts = []
          for (let contact of Object.values(contactsFile)) {
            contacts.push(contact["v"])
          }
          this.receivers = contacts.join()
          document.getElementById("excelFileSelector").value = null
        }
        // reader.onloadend = function (event) {
        //   alert("OK")
        //   // var data = new Uint8Array(event.target.result);
        //   // var workbook = read(data, { type: 'array' })
        //   // console.log("REIJL")
        // }
        // const file = readFile(excelFile.files[0])
      }
    }
  }
}
</script>


<style scoped>
#excelFileSelector {
  opacity: 0;
}
</style>