<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import Permission from './Permission.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAuthStore } from '@/store'
import { featureCongis } from '@/config/config'

const route = useRoute()
const router = useRouter()
// const appStore = useAppStore()
// const chatStore = useChatStore()
const authStore = useAuthStore()

// router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

const { isMobile } = useBasicLayout()

// const collapsed = computed(() => appStore.siderCollapsed)
const pageUuid = ref()
const needPermission = computed(() => !!authStore.session?.auth && !authStore.token)

const getMobileClass = computed(() => {
  if (isMobile.value)
    return ['rounded-none', 'shadow-none']
  return ['rounded-md', 'dark:border-neutral-800']
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    // { 'pl-[260px]': !isMobile.value && !collapsed.value },
  ]
})
const getTitle = computed(() => {
  const title = pageUuid?.value ? featureCongis?.find(item => item?.key === +pageUuid?.value)?.title : ''
  return title ? ` - ${title}` : ''
})
watch(
  () => route,
  () => {
    // 处理路由变化的逻辑
    const { uuid } = route.params as { uuid: string }
    if (+uuid > 15)
      router.replace({ name: 'Manifest' })
    pageUuid.value = uuid
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all bg-gray-100" :class="[isMobile ? 'p-0' : 'p-0']">
    <div class="h-full overflow-hidden" :class="getMobileClass">
      <NLayout class="z-40 transition" :class="getContainerClass">
        <NLayoutHeader class="p-4 absolute subpixel-antialiased bg-white z-50 w-full font-black text-3xl font-sans bg-opacity-60">
          AI 沾沾
          <span class="text-2xl">{{ getTitle }}</span>
        </NLayoutHeader>
        <!-- <Sider /> -->
        <NLayoutContent class="h-full pt-16">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
    <Permission :visible="needPermission" />
  </div>
</template>
