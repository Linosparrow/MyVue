<template>
    <div class="container">
        <div class="subTitle">welcome join us</div>
        <h1 class="title">Create Your Account</h1>
        <div v-for="(item, index) in fields" class="inputContainer">
            <div class="field">{{ item.title }} <span v-if="item.required" style="color: red;">*</span></div>
            <input v-model="item.model" class="input" :type="item.type" />
            <div class="tip" v-if="index == 2">password length more than 6</div>
        </div>
        <div class="subContainer">
            <div class="setting">偏好设置</div>
            <input v-model="receiveMsg" class="checkbox" type="checkbox" />
            <label class="label">接受新邮件</label>
        </div>
        <button @click="createAccount" class="btn">create</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fields: [
                {
                    title:"username",
                    required:true,
                    type:"text",
                    model:""
                },
                {
                    title:"email",
                    required:false,
                    type:"text",
                    model:""
                },
                {
                    title:"password",
                    required:true,
                    type:"password",
                    model:""
                }
            ],
            receiveMsg:false
        }
    },
    computed: {
        name: {
            get() {
                return this.fields[0].model
            },
            set(value) {
                this.fields[0].model = value
            }
        },
        email: {
            get() {
                return this.fields[1].model
            },
            set(value) {
                this.fields[1].model = value
            }
        },
        password: {
            get() {
                return this.fields[2].model
            },
            set(value) {
                this.fields[2].model = value
            }
        },
    },
    methods: {
        emailCheck() {
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            if (!verify.test(this.email)) {
                return false
            } else {
                return true
            }
        },
        createAccount() {
            if (this.name.length == 0) {
                alert("please input username")
                return
            } else if (this.password.length <= 6) {
                alert("password need 6")
                return
            } else if (this.email.length >0 && !this.emailCheck(this.email)) {
                alert("please input correct email")
                return
            }
            alert("register success")
            console.log(this)
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    margin-top: 0;
    text-align: center;
    width: 300px;
}
.subTitle {
    color:gray;
    font-size: 14px;
}
.title {
    font-size: 34px;
}
.input {
    width: 90%;
}
.inputContainer {
    text-align: left;
}
.field {
    font-size: 14px;
}
.input {
    border-radius: 6px;
    height: 25px;
    margin-top: 10px;
    border-color: silver;
    border-style: solid;
    background-color: cornsilk;
}
.tip {
    margin-top: 5px;
    font-size: 12px;
    color: gray;
}
.setting {
    font-size: 9px;
    color: black;
}
.label {
    font-size: 12px;
    margin-left: 5px;
    height: 20px;
    vertical-align: middle;
}
.checkbox {
    height: 20px;
    vertical-align: middle;
}
.btn {
    border-radius: 10px;
    height: 40px;
    width: 300px;
    margin-top: 30px;
    background-color: deepskyblue;
    border-color: blue;
    color: white;
}
</style>