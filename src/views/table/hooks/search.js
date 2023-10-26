import { reactive } from 'vue';
import { QUERY_COMPONENT_KEY } from '@/components/BasicForm/constants/index.js';

export const useSearch = () => {
    // 用户部门的数据项
    const departmentOptions = [
        { label: '管理部', value: '1' },
        { label: '业务部', value: '2' },
        { label: '开发一部', value: '3' },
        { label: '开发二部', value: '4' },
        { label: '开发三部', value: '5' },
        { label: '其他', value: '9999' },
    ];

    // 用户状态的数据项
    const statusOptions = [
        { label: '在职', value: '1' },
        { label: '离职', value: '2' },
        { label: '待入职', value: '3' },
        { label: '休假', value: '4' },
        { label: '其他', value: '5' },
    ];

    const searchLayouts = reactive([
        {
            type: QUERY_COMPONENT_KEY.input,
            name: '姓名:',
            model: 'name',
            props: {
                placeholder: '请输入名字',
            },
        },
        {
            type: QUERY_COMPONENT_KEY.select,
            name: '部门:',
            model: 'department',
            props: {
                placeholder: '请选择部门',
                options: departmentOptions,
            },
        },
        {
            type: QUERY_COMPONENT_KEY.select,
            name: '状态:',
            model: 'status',
            props: {
                placeholder: '请选择部门',
                options: statusOptions,
            },
        },
        {
            type: QUERY_COMPONENT_KEY.datePicker,
            name: '入职时间:',
            model: 'date',
            props: {
                placeholder: '请选择入职时间',
            },
        },
    ]);

    // 用户搜索部分各项目值
    const searchData = reactive({
        name: '',
        department: '',
        status: '1',
        date: '',
    });

    /**
     * 点击检索
     */
    const searchHandle = () => {
        // 调用接口
        getTableData(1, searchData);
    };

    /**
     * 点击重置
     */
    const resetHandel = () => {
        searchData.name = '';
        searchData.department = '';
        searchData.status = '1';
        searchData.date = '';
    }

    return {
        searchLayouts,
        searchData,
        searchHandle,
        resetHandel
    }
}