import { ref, reactive } from 'vue';
import { getSimpleTableApi } from '@/api/table';

export const useTable = () => {
    const size = ref(10);

    // 表格数据模型
    const tableModel = ref({
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        data: [], // 表格数据
    });

    /** 获取表格数据 */
    const getTableModel = async (currentPage = 1) => {
        const res = await getSimpleTableApi({
            size: size.value, // 要获取数据的最大条数
            currentPage, // 目标页
        });

        // 数据渲染
        if (res.code == 200) {
            // 设置总页数
            tableModel.value.total = res.data.total;
            // 设置表格数据
            tableModel.value.data = res.data.list;
            // 设置当前页数
            tableModel.value.currentPage = currentPage;
        }
        // 返回获取数据是否成功
        return res.code == 200;
    };

    const tableCol = [
        {
            type: 'index',
            label: 'No.',
            align: 'center',
        },
        {
            prop: 'name',
            label: '姓名',
            width: '120',
            align: 'center',
            link: true,
        },
        {
            prop: 'department',
            label: '部门',
            btn: true,
            align: 'center',
        },
        {
            prop: 'position',
            label: '职位',
        },
        {
            prop: 'mail',
            label: '邮箱',
        },
        {
            prop: 'phone',
            label: '手机号',
        },
        {
            prop: 'startDate',
            label: '开始时间',
        },
        {
            prop: 'endDate',
            label: '结束时间',
        },
    ];

    /** 表格 */
    // 表格设置
    const tableSetting = reactive({
        loading: true, // 表格加载状态
        events: {
            // 点击表格多选框
            'selection-change': (val) => {
                console.log(val);
            },
            'cell-click': (val) => {
                console.log(val);
            },
        },
    });

    const tableToolData = reactive({
        show: true,
        editFlg: true,
        deleteFlg: true,
        // /**
        //  * 点击修改按钮
        //  */
        // handleEdit: () => {
        //     dialogProps.show = true;
        // },
        // /**
        //  * 点击删除按钮
        //  */
        // handleDelete: () => {
        //     ElMessageBox.confirm('请确认是否删除该用户！', '消息', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //     }).then(() => {
        //         ElMessage({
        //             type: 'info',
        //             message: '用户删除成功！',
        //         });
        //     });
        // },
    });

    return {
        tableModel,
        getTableModel,
        tableCol,
        tableSetting,
        tableToolData,
    };
};
