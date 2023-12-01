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

    // 向量圖層
    const drawEnable = ref(false)
    const drawType = ref("Point")
    const drawPoint = ref(true)
    const drawLine = ref(false)
    const drawArea = ref(false)
    const setVector = (tool: 'point' | 'line' | 'area') =>{
        if(tool === 'point'){
            drawType.value = 'Point'
            drawLine.value = false
            drawArea.value = false
            console.log(drawType.value)
            console.log(drawEnable.value)
        }else if(tool === 'line'){
            drawType.value = 'LineString'
            drawPoint.value = false
            drawArea.value = false
            console.log(drawType.value)
            console.log(drawEnable.value)
        }else if(tool === 'area'){
            drawType.value = 'Polygon'
            drawLine.value = false
            drawPoint.value = false
            console.log(drawType.value)
            console.log(drawEnable.value)
        }
    }
    // todo 為了開啟/關閉彈跳視窗時也開啟/關閉向量圖層
    const handleClick = () =>{
        isPopupEditOpen.value = !isPopupEditOpen.value
        drawEnable.value = !drawEnable.value
        if(drawEnable.value === false){
            drawPoint.value = false
            drawLine.value = false
            drawArea.value = false
        }
        console.log(isPopupEditOpen.value, drawEnable.value)
    }

    return {
        isPopupLayerOpen,
        isPopupEditOpen,
        isOsmOpen,
        isJawgOpen,
        isBingOpen,
        setBaseLayer,
        drawEnable,
        drawType,
        setVector,
        drawPoint,
        drawLine,
        drawArea,
        handleClick
    }
})