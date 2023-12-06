// !這裡的 import 是要給點線面顯示資訊用的
import * as selectedConditions from 'ol/events/condition'
import * as extent from "ol/extent"
import * as format from "ol/format"
import * as ol from 'ol';
import * as olGeom from 'ol/geom';
import Projection from 'ol/proj/Projection';
import * as olProj from 'ol/proj';




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
    const selectedPosition = ref<Array<{ coordinates?: number[]; distance?: number; area?: number }>>([]);
    const featureSelected = (event: any) => {
        selectedPosition.value = [];
        
        // *獲取被選中的要素
        const selectedFeatures = event.selected;
        console.log(selectedFeatures)
      
        // *迭代選中的要素
        selectedFeatures.forEach((feature: any) => {
          // *獲取要素的幾何類型
          const geometryType = feature.getGeometry().getType(); 
          if (geometryType === 'Point') {
            // *獲取點的座標
            const pointCoordinates = (feature.getGeometry() as olGeom.Point).getCoordinates(); 
            // *顯示點的座標，你可以根據需要修改顯示的方式
            console.log('點的座標：', pointCoordinates);   
            // *將點的座標存入 selectedPosition 中
            selectedPosition.value.push({ coordinates: pointCoordinates });
          } else if (geometryType === 'LineString') {
            // *獲取線段的座標
            const lineCoordinates = (feature.getGeometry() as olGeom.LineString).getCoordinates();   
            // *計算線段距離
            const distance = calculateLineDistance(lineCoordinates);    
            // *顯示線段距離，你可以根據需要修改顯示的方式
            console.log('線段距離：', distance, '公尺');
            // *將線段距離存入 selectedPosition 中
            selectedPosition.value.push({ distance: distance });
          }else if (geometryType === 'Polygon') {
            // *獲取面的座標
            const polygonCoordinates = (feature.getGeometry() as olGeom.Polygon).getCoordinates();
            // *計算面積
            const area = calculatePolygonArea(polygonCoordinates);
            // *顯示面積，你可以根據需要修改顯示的方式
            console.log('面積：', area, '平方公尺');
      
            // *將面積存入 selectedPosition 中
            selectedPosition.value.push({ area: area });
          }
        });
      };
      
        // *計算線段距離的函數
        const calculateLineDistance = (coordinates: number[][]): number => {
            const lineString = new olGeom.LineString(coordinates);
            const distance = lineString.getLength();
            return distance; 
        };

       // *計算多邊形面積的函數
       const calculatePolygonArea = (coordinates: number[][][]): number => {
        const polygon = new olGeom.Polygon(coordinates);
        // *定義原始坐標投影和目標坐標投影
        const sourceProjection = 'EPSG:4326';  // *假設原始坐標是 EPSG:4326
        const targetProjection = 'EPSG:3857';  // *修改為你想要的目標投影
        const transformedCoordinates = coordinates.map(ring =>
            ring.map(point => olProj.transform(point, sourceProjection, targetProjection))
        );
        // *使用轉換後的坐標創建轉換後的多邊形對象
        const transformedPolygon = new olGeom.Polygon(transformedCoordinates);
        // *計算多邊形的實際面積，單位通常是地圖的投影下的平方地圖單位（例如平方米）
        const areaSquareMeter  = transformedPolygon.getArea();
         // *轉換為平方公里
        const area = areaSquareMeter  * 0.000001;
        return area;
        };
    


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