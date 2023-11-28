// ! 這裡存放所有全局資料，包含語言
export const useMainStore = defineStore('Main', ()=>{
    // i18n import
    const { localePath, switchLocalePath} = useLocale()
    const currentLang = ref('')
    const changeLocale = ()=>{
        navigateTo(switchLocalePath(currentLang.value))
    }
    

    return{
        currentLang,
        changeLocale
    }
})