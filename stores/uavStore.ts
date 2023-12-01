export const useUavStore = defineStore('uav', ()=>{
    const isPopupLayerOpen = ref(false)
    const isPopupEditOpen = ref(false)

    // 底圖切換
    const isOsmOpen = ref(true)
    const isJawgOpen = ref(false)
    const isBingOpen =ref(false)
    const setBaseLayer = (layer: 'osm' | 'jawg' | 'bing')=>{
        isOsmOpen.value = layer === 'osm'
        isJawgOpen.value = layer === 'jawg'
        isBingOpen.value = layer === 'bing'
    }

    return {
        isPopupLayerOpen,
        isPopupEditOpen,
        isOsmOpen,
        isJawgOpen,
        isBingOpen,
        setBaseLayer
    }
})