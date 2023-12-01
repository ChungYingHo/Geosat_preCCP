export const useUavStore = defineStore('uav', ()=>{
    const isPopupLayerOpen = ref(false)
    const isPopupEditOpen = ref(false)

    return {
        isPopupLayerOpen,
        isPopupEditOpen
    }
})