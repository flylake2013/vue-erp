import Vue from 'vue'
import { Button, Input } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { Message } from 'element-ui'
import {
    Header,
    Container,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Card,
    Dialog,
    Select,
    Option,
    Row,
    Col,
    Table,
    TableColumn,
    Pagination,
    MessageBox,
    Calendar,
    DatePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Calendar)
Vue.use(DatePicker)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm