import Swal from 'sweetalert2'
import { useLocale } from '~/composables/useLocale'

export const useSignStore = defineStore('Sign_', ()=>{
    // sweetalert2 引用
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      })

    // i18n import
    const { localePath} = useLocale()

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
        required: (value: string) => !!value || 'Required.',
        counter: (value: string) => value.length <= 10 || 'Max 10 characters',
        email: (value: string) => pattern.test(value) || 'Invalid e-mail.',
    }
    const handleSubmit = (path:string)=>{
        if(path === ('/login')){
            if(loginEmail.value.length > 0 && loginPassword.value.length > 0){
                Toast.fire({
                    icon: "success",
                    title: "Login successfully"
                })
                return navigateTo(localePath('/main-page'))
            }else{
                Toast.fire({
                    icon: "error",
                    title: "Non executed account or password."
                })
            }
        }else{
            if(name.value.length <= 10 && password.value.length <= 10 && pattern.test(email.value) && password.value === checkedPassword.value){
                Toast.fire({
                    icon: "success",
                    title: "Signed up successfully"
                })
                return navigateTo(localePath('/'))
            }else{
                Toast.fire({
                    icon: "error",
                    title: "Enter correct information"
                })
            }
        }
    }

    return{
        loginEmail,
        loginPassword,
        name,
        email,
        password,
        checkedPassword,
        rules,
        handleSubmit,
        Toast
    }
})