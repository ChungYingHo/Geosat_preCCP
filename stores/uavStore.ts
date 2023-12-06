// !這裡的 import 是要給點線面顯示資訊用的
import * as selectedConditions from 'ol/events/condition'
import * as extent from "ol/extent"
import * as format from "ol/format"
import {getLength, getArea} from 'ol/sphere'

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
                console.log(geoJson)
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
    // 清空繪圖資訊
    const resetCounter = ref(0)
    const handleReset = ()=>{
        resetCounter.value++
    }

    // 顯示點線面資訊
    // todo display point info
    // *將地理資訊轉為易處理的 GeoJSON
    const geoJson = new format.GeoJSON()
    const selectedCondition = selectedConditions.singleClick
    const selectedPosition = ref<number[]>([])
    const selectedLength = ref<number | string>('')
    const selectedArea = ref<number | string>('')
    const selectedGeometry = ref('')
    const featureSelected = (event: any) =>{
        if(event.selected.length == 1){
            const selectedFeature = event.selected[0]
            // 以下會單純取出一個物件的名字
            const geometryType = selectedFeature.getGeometry().getType()
            selectedGeometry.value = geometryType
            console.log(event, geometryType, selectedFeature.getGeometry())
            selectedPosition.value = extent.getCenter(
                event.selected[0].getGeometry().extent_,
            )
            selectedPosition.value = selectedPosition.value.map(i => {
                return Number(i.toFixed(2));
            })

           if(geometryType === 'LineString'){
                // 這會取出一個物件
                const lineString = selectedFeature.getGeometry()
                let length: number = getLength(lineString, { projection: 'EPSG:4326' })
                length = Number((length / 1000).toFixed(2))
                selectedLength.value = length as number
            }else if(geometryType === 'Point'){
                selectedLength.value = ''
            }else if(geometryType === 'Polygon'){
                const polygon = selectedFeature.getGeometry()
                let area: number = getArea(polygon, { projection: 'EPSG:4326' })
                area = Number((area / 1000000).toFixed(2))
                selectedArea.value = area as number
                console.log('Area', polygon, area)
            }
        }else{
            selectedPosition.value = [] as number[]
        }
    }
    // *過濾交互要素
    const selectInteactionFilter = (feature: any) => {
        let geometryType = feature.getGeometry().getType();

        return geometryType === 'Point' || geometryType === 'LineString' || geometryType === 'Polygon'
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
        geoJson,
        selectedCondition,
        selectedPosition,
        featureSelected,
        selectInteactionFilter,
        selectedLength,
        selectedArea,
        selectedGeometry,
        resetCounter,
        handleReset
    }
})