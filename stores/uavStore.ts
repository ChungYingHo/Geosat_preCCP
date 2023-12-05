// !這裡的 import 是要給點線面顯示資訊用的
import * as selectedConditions from 'ol/events/condition'
import * as extent from "ol/extent"
import * as format from "ol/format"

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
    const selectedType = reactive({
        drawPoint: false,
        drawLine: false,
        drawArea: false
    })
    const setVector = (tool: 'point' | 'line' | 'area') =>{
        drawEnable.value = selectedType.drawPoint || selectedType.drawLine || selectedType.drawArea

        switch(tool){
            case "point":
                drawType.value = "Point"
                Object.assign(selectedType, { drawLine: false, drawArea: false })
                break
            case "line":
                drawType.value = "LineString"
                Object.assign(selectedType, { drawPoint: false, drawArea: false })
                break
            case "area":
                drawType.value = 'Polygon'
                Object.assign(selectedType, { drawLine: false, drawPoint: false })
                break
            default:
                break
        }
    }
    // todo 為了關閉彈跳視窗時也關閉向量圖層
    const handleClick = () =>{
        isPopupEditOpen.value = !isPopupEditOpen.value
        if(isPopupEditOpen.value === false){
            drawEnable.value = false
            Object.assign(selectedType, {drawPoint: false, drawLine: false, drawArea: false})
        }
    }
    const drawend = (event: any) =>{
        console.log(event);
        console.log(event.feature.values_.geometry.flatCoordinates)
    }

    // 顯示點線面資訊
    // todo display point info
    // *將地理資訊轉為易處理的 GeoJSON
    const geoJson = new format.GeoJSON()
    const selectedCondition = selectedConditions.singleClick
    const selectedPosition = ref<number[]>([])
    const featureSelected = (event: any) =>{
        if(event.selected.length == 1){
            selectedPosition.value = extent.getCenter(
                event.selected[0].getGeometry().extent_,
            )
        }else{
            selectedPosition.value = []
        }
    }
    // *過濾交互要素
    const selectInteactionFilter = (feature: any) => {
        console.log(feature)
        return feature.values_ != undefined;
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
        selectedType,
        handleClick,
        drawend,
        geoJson,
        selectedCondition,
        selectedPosition,
        featureSelected,
        selectInteactionFilter
    }
})