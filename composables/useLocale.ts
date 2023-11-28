export function useLocale() {
    const localePath = useLocalePath();
    const switchLocalePath = useSwitchLocalePath();
  
    return {
      localePath,
      switchLocalePath
    };
}