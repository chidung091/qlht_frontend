import { Policies } from '../_constants/policy.constants';

export class MenuConfig {
  public defaults: any = {
    aside: {
      self: {},
      items: [
        // {
        //   title: 'Trang chủ',
        //   root: true,
        //   icon: 'flaticon-dashboard',
        //   page: '/dashboard',
        // },
        // {
        //   title: 'Quản trị',
        //   root: true,
        //   icon: 'flaticon-settings',
        //   page: '',
        //   // translate: 'MENU.DASHBOARD',
        //   // bullet: 'line',
        //   permission: [
        //     Policies.ABPIDENTITY_ROLES,
        //     Policies.ABPIDENTITY_USERS
        //   ],
        //   submenu: [
        //     {
        //       title: 'Người dùng',
        //       icon: '	flaticon-users',
        //       page: '/admin/users',
        //       permission: Policies.ABPIDENTITY_USERS,
        //     },
        //     {
        //       title: 'Vai trò',
        //       icon: 'flaticon-user-settings',
        //       page: '/admin/roles',
        //       permission: Policies.ABPIDENTITY_ROLES,
        //     },
        //   ],
        // },
        // {
        //   title: 'Hệ thống',
        //   root: true,
        //   icon: 'flaticon-analytics',
        //   // bullet: 'dot',
        //   submenu: [
        //     {
        //       title: 'Nhà thuốc',
        //       page: '/system/medicine',
        //     },
        //     // {
        //     //   title: 'Thông tin trường',
        //     //   // icon: 'flaticon-information',
        //     //   page: '/system/school-information',
        //     //   permission: [
        //     //     Policies.SCHOOLMANAGEMENT_SCHOOLINFOMATION,
        //     //   ],
        //     // },
        //     // {
        //     //   title: 'Tổ bộ môn',
        //     //   page: '/system/department',
        //     //   permission: Policies.SYSTEMMANAGEMENT_SCHOOLFACULTY,
        //     // },
        //     // {
        //     //   title: 'Khai báo lớp học',
        //     //   page: '/system/class-room',
        //     //   permission: Policies.SYSTEMMANAGEMENT_CLASSPROFILE,
        //     // },
        //     // {
        //     //   title: 'Khai báo môn học cho lớp',
        //     //   page: '/system/subject',
        //     //   permission: Policies.SYSTEMMANAGEMENT_CLASSSUBJECT,
        //     // },
        //     // {
        //     //   title: 'Năm học',
        //     //   page: '/system/school-year',
        //     // },
        //   ],
        // },
        // {
        //   title: 'Danh mục',
        //   root: true,
        //   icon: 'flaticon-grid-menu',
        //   // bullet: 'dot',
        //   permission: [
        //     Policies.CATEGORYMANAGEMENT_FAULTCRITERIA,
        //     Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE,
        //     Policies.CATEGORYMANAGEMENT_EXPERIENCETYPE,
        //     Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE,
        //     Policies.CATEGORYMANAGEMENT_EXAMVIOLATIONTYPE,
        //     Policies.CATEGORYMANAGEMENT_EMULATIONCRITERIA,
        //     Policies.CATEGORYMANAGEMENT_REWARDFINAL
        //   ],
        //   submenu: [
        //     {
        //       title: 'Lỗi vi phạm',
        //       page: '/categories/fault-criteria',
        //       permission: Policies.CATEGORYMANAGEMENT_FAULTCRITERIA,
        //     },
        //     {
        //       title: 'Khen thưởng - kỷ luật',
        //       page: '/categories/praise-discipline',
        //       permission: Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE,
        //     },
        //     {
        //       title: 'Sáng kiến kinh nghiệm',
        //       page: '/categories/experience-type',
        //       permission: Policies.CATEGORYMANAGEMENT_EXPERIENCETYPE,
        //     },
        //     {
        //       title: 'Công việc kiêm nhiệm',
        //       page: '/categories/concurrent-work-type',
        //       permission: Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE,
        //     },
        //     {
        //       title: 'Lỗi vi phạm quy chế thi',
        //       page: '/categories/exam-violation-type',
        //       permission: Policies.CATEGORYMANAGEMENT_EXAMVIOLATIONTYPE,
        //     },
        //     {
        //       title: 'Loại điểm thi đua',
        //       page: '/categories/emulation-criteria',
        //       permission: Policies.CATEGORYMANAGEMENT_EMULATIONCRITERIA,
        //     },
        //     {
        //       title: 'Khen thưởng cuối kỳ',
        //       page: '/categories/reward-final',
        //       permission: Policies.CATEGORYMANAGEMENT_REWARDFINAL,
        //     },
        //   ],
        // },
        {
          title: 'Nhà thuốc',
          root: true,
          icon: 'flaticon-user',
          // bullet: 'dot',
          permission: [
            // Policies.EMPLOYEEMANAGEMENT_EMPLOYEE,
            // Policies.EMPLOYEEMANAGEMENT_CONCURRENTWORKASSIGNMENT,
            // Policies.EMPLOYEEMANAGEMENT_CLASSSUPERVISORASSIGNMENT,
            // Policies.EMPLOYEEMANAGEMENT_TEACHINGASSIGNMENT,
            // Policies.EMPLOYEEMANAGEMENT_EMPLOYEEPRAISEDISCIPLINE,
            // Policies.EMPLOYEEMANAGEMENT_TEACHERGRADING,
            // Policies.EMPLOYEEMANAGEMENT_HONOURACHIVEMENT,
          ],
          submenu: [
            {
              title: 'Danh sách sản phẩm',
              page: '/system/medicine',
            },
            // {
            //   title: 'Phân công kiêm nhiệm',
            //   page: '/officers/concurrent-work-assignment',
            //   permission: Policies.EMPLOYEEMANAGEMENT_CONCURRENTWORKASSIGNMENT,
            // },
            // {
            //   title: 'Phân công chủ nhiệm',
            //   page: '/officers/head-teacher',
            //   //permission: 'EmployeeManagement.xxx'
            // },
            // // {s
            // //   title: 'Tiếp nhận chuyển công tác',
            // //   permission: 'EmployeeManagement.xxx'
            // // },
            // {
            //   title: 'Phân công giáo vụ',
            //   page: '/officers/assignment-ministry',
            //   permission: Policies.EMPLOYEEMANAGEMENT_CLASSSUPERVISORASSIGNMENT,
            // },
            // {
            //   title: 'Phân công giảng dạy',
            //   page: '/officers/assignment-teaching',
            //   permission: Policies.EMPLOYEEMANAGEMENT_TEACHINGASSIGNMENT,
            // },
            // {
            //   title: 'Khen thưởng - Kỷ luật',
            //   page: '/officers/employee-praise-discipline',
            //   permission: Policies.EMPLOYEEMANAGEMENT_EMPLOYEEPRAISEDISCIPLINE,
            // },
            // {
            //   title: 'Đánh giá xếp loại giáo viên',
            //   page: '/officers/teacher-grading',
            //   permission: Policies.EMPLOYEEMANAGEMENT_TEACHERGRADING,
            // },
            // {
            //   title: 'Danh hiệu thi đua tập thể',
            //   page: '/officers/honour-achivement',
            //   permission: Policies.EMPLOYEEMANAGEMENT_HONOURACHIVEMENT,
            // },
            // {
            //   title: 'Lịch báo giảng',
            //   page: '/officers/newspaper-teaching-calendar',
            //   submenu: [
            //     {
            //       title: 'Cấu hình phân môn',
            //       page: '/officers/divisive-configuaration',
            //     },
            //     {
            //       title: 'Phân phối chương trình',
            //       page: '/officers/distribute-program',
            //     },
            //     {
            //       title: 'Lịch báo giảng',
            //       page: '/officers/teaching-schedule',
            //     },
            //     {
            //       title: 'Quản lý lịch báo giảng',
            //       page: '/officers/management-teaching-schedule',
            //     },
            //   ]
            // },
            // {
            //   title: 'Đánh giá chuẩn nghề nghiệp',
            //   page: '/officers/standard-assessment',
            // },
            // {
            //   title: 'Làm thay chủ nhiệm',
            // },
            // {
            //   title: 'Quản lý sử dụng sổ điểm',
            // },
            // {
            //   title: 'Nhập liệu sổ chủ nhiệm',
            // },
          ],
        },
        {
          title: 'Nhân viên',
          root: true,
          icon: 'flaticon2-user-outline-symbol',
          // translate: 'MENU.DASHBOARD',
          // bullet: 'dot',
          permission: [
            // Policies.PUPILMANAGEMENT_PUPIL
          ],
          submenu: [
            {
              title: 'Hồ sơ nhân viên',
              page: '/students/employee',
            },
            // {
            //   title: 'Tiếp nhận học sinh chuyển trường',
            //   page: '/students/reception-students',
            // },
            // {
            //   title: 'Điểm danh',
            //   page: '/students/take-attendance',
            // },
            // {
            //   title: 'Vi phạm',
            //   page: '/students/violate-rules',
            // },
            // {
            //   title: 'Sổ đánh giá học sinh',
            //   page: '/students/student-assessment',
            // },
            // {
            //   title: 'Đánh giá khen thưởng',
            //   page: '/students/evaluation-rewardt',
            // },
            // {
            //   title: 'Xếp loại thi đua cho lớp',
            //   page: '/students/ranking-emulation',
            // },
            // {
            //   title: 'Sổ ghi nhận xét',
            //   page: '/students/comment-book',
            // },
            // {
            //   title: 'Đăng kí môn tự chọn',
            //   page: '/students/elective-subjects',
            // },
          ],
        },
        // {
        //   title: 'Hướng dẫn',
        //   root: true,
        //   icon: 'flaticon2-information',
        //   translate: 'MENU.DASHBOARD',
        //   bullet: 'dot',
        // },
      ],
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
