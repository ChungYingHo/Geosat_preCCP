export const useSignStore = defineStore('Sign_', ()=>{
    // 使用者登入資料
    const loginEmail = ref('')
    const loginPassword = ref('')
    // 使用者註冊資料
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const checkedPassword = ref('')

    // 驗證規則
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const rules = {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 10 || 'Max 10 characters',
        email: value => pattern.test(value) || 'Invalid e-mail.',
    }
    const handleSubmit = ()=>{
        if(name.value.length <= 10 && password.value.length <= 10 && pattern.test(email.value) && password.value === checkedPassword.value){
            return navigateTo({
                path: '/login'
            })
        }else{
            alert('Enter right information')
        }
    }

    return{
        name,
        email,
        password,
        checkedPassword,
        rules,
        handleSubmit
    }
})