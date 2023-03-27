<script setup lang='ts'>
import { ref } from 'vue'
import { NCard, NModal } from 'naive-ui'
import { featureCongis } from '@/config/config'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import Icon403 from '@/icons/403.vue'
const { isMobile } = useBasicLayout()
const visible = ref<boolean>(false)
function onClick() {
  visible.value = true
}
function cancel() {
  visible.value = false
}
</script>

<template>
  <div class="min-h-full dark:bg-[#24272e] transition-all bg-gray-100" :class="[isMobile ? 'p-4' : 'p-4']">
    <!-- <NLayout embedded content-style="padding: 24px;"> -->
    <div class="contanier grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 items-stretch">
      <router-link v-for="item in featureCongis" :key="item?.key" :to="`/chat/${item?.key}`" class="flex flex-col">
        <NCard :title="item.title" class="flex-grow">
          {{ item?.text }}
        </NCard>
      </router-link>
    </div>
    <div class="flex justify-center mt-5 mb-5" @click="onClick">
      关注公众号，了解更多玩法
    </div>
    <NModal :show="visible" style="width: 90%; max-width: 640px" :on-mask-click="cancel">
      <div class="p-10 bg-white rounded dark:bg-slate-800">
        <div class="space-y-4">
          <header class="space-y-2">
            <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
              关注公众号
            </h2>
            <p class="text-base text-center text-slate-500 dark:text-slate-500">
              关注公众号，了解更多玩法，后续也会更新接入siri、自行部署等教程。
            </p>
            <Icon403 class="w-[200px] m-auto" />
          </header>
        </div>
      </div>
    </NModal>
    <!-- </NLayout> -->
  </div>
</template>
