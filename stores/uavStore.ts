// !這裡的 import 是要給點線面顯示資訊用的
import * as selectedConditions from 'ol/events/condition'
import * as extent from "ol/extent"
import {getLength, getArea} from 'ol/sphere'
import GMLBase from 'ol/format/GMLBase'
import {Feature} from 'ol'
import { Polygon } from 'ol/geom'

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

    // 顯示點線面資訊
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
            }
        }else{
            selectedPosition.value = [] as number[]
        }
    }
    // 過濾交互要素
    const selectInteactionFilter = (feature: any) => {
        let geometryType = feature.getGeometry().getType();

        return geometryType === 'Point' || geometryType === 'LineString' || geometryType === 'Polygon'
    }

    // 刪除點線面
    const sourceL = ref<any | null>(null)
    const seletedDelete = (event: any)=>{
        const selectedFeature = event.selected[0]
        sourceL.value.source.removeFeature(selectedFeature)
        selectedPosition.value = [] as number[]
    }
    // 清空全部繪圖資訊
    const resetCounter = ref(0)
    const handleReset = ()=>{
        // resetCounter.value++
        // selectedPosition.value = [] as number[]
        sourceL.value.source.clear()
        selectedPosition.value = [] as number[]
        isWFSopen.value = false
    }

    // try to fetch wms data
    const wmsUrl = 'https://wms.nlsc.gov.tw/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.0.0'
    async function fetchData() {
        try {
            const response = await fetch(wmsUrl)
            const data = await response.text();
            // 使用 DOMParser 解析 XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            console.log(xmlDoc)
        } catch (error) {
            console.error('Error fetching WMS data:', error);
        }
    }
    const isWMSopen = ref(false)

    // try to fetch wfs data
    const sourceL2 = ref<any | null>(null)
    const isWFSopen = ref(false)
    const wfsData = ref<any | null>(null)
    const wfsUrl = 'https://wfs.nlsc.gov.tw/WFS?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=WFS:VILLAGE_NLSC&SRSNAME=EPSG4326&outputFormat="GML"&FILTER=<ogc:filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:propertyisequalto><ogc:propertyname>box</ogc:propertyname><ogc:literal>120.105877,22.997709 120.210933,23.053319</ogc:literal></ogc:propertyisequalto></ogc:filter>'
    const fetchWFS = async()=>{
        try{
            // call api
            const response = await fetch(wfsUrl)
            const data = await response.text()
            // 解析 gml
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(data, 'text/xml')
            const gmlParser = new GMLBase()
            const features = gmlParser.readFeatures(xmlDoc, {
                featureProjection: 'EPSG:4326',
            })
            wfsData.value = features.map(feature => {
                feature = new Feature(feature.getProperties());
                return feature;
            })
        }catch(error){
            console.error('Error fetching WFS data:', error)
        }
    }
    const handleWfs = async ()=>{
        console.log('click', isWFSopen.value)
        if(isWFSopen.value === true){
            await fetchWFS()
            wfsData.value.forEach((element: any) => {
                const coord: string = element.values_.Shape.MultiPolygon.polygonMember.Polygon._content_.outerBoundaryIs.LinearRing.coordinates
                const coordsArray = coord.split(' ').map(coord => {
                    const [a, b] = coord.split(',').map(parseFloat);
                    return [a, b];
                })
                const polygonGeometry = new Polygon([coordsArray])
                const polygonFeature = new Feature(polygonGeometry)
                sourceL.value.source.addFeature(polygonFeature)
            });
        }else if(isWFSopen.value === false){
            console.log(sourceL.value.source)
            sourceL.value.source.clear()
        }
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
        selectedPosition,
        featureSelected,
        selectInteactionFilter,
        selectedLength,
        selectedArea,
        selectedGeometry,
        resetCounter,
        handleReset,
        selectedConditions,
        sourceL,
        seletedDelete,
        isWMSopen,
        isWFSopen,
        fetchWFS,
        handleWfs,
        sourceL2
    }
})