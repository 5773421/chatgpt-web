<script setup lang='ts'>
import { NCard } from 'naive-ui'
import { featureCongis } from '@/config/config'
import { useBasicLayout } from '@/hooks/useBasicLayout'
const { isMobile } = useBasicLayout()
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all bg-gray-100" :class="[isMobile ? 'p-4' : 'p-4']">
    <!-- <NLayout embedded content-style="padding: 24px;"> -->
    <div class="contanier grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 items-stretch">
      <router-link v-for="item in featureCongis" :key="item?.key" :to="`/chat/${item?.key}`" class="flex flex-col">
        <NCard :title="item.title" class="flex-grow">
          {{ item?.text }}
        </NCard>
      </router-link>
    </div>
    <!-- </NLayout> -->
  </div>
</template>
