import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    meta: { title: '首页', },
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')//首页
  }, {
    meta: { title: '活动预约', },
    path: '/active',
    name: 'active',
    component: () => import('../views/SubscribeActive.vue')//活动预约列表页
  }, {
    meta: { title: '活动预约详情', },
    path: '/detail_active',
    name: 'detail_active',
    component: () => import('../views/DetailActive.vue')//活动预约列表页
  }, {
    meta: { title: '讲解预约', },
    path: '/explain',
    name: 'explain',
    component: () => import('../views/Explain.vue')//门票预约讲解页面
  }, {
    meta: { title: '唐博概况', },
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')//唐博概况
  }, {
    meta: { title: '最新动态', },
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue')//最新动态
  }, {
    meta: { title: '动态详情', },
    path: '/detail_news',
    name: 'detail_news',
    component: () => import('../views/DetailNews.vue')//新闻公告详情
  }, {
    meta: { title: '陈列展览', },
    path: '/exhibition',
    name: 'exhibition',
    component: () => import('../views/Exhibition.vue')//陈列展览
  }, {
    meta: { title: '常设展览', },
    path: '/exhibit_standing',
    name: 'exhibit_standing',
    component: () => import('../views/ExhibitStanding.vue')//常设展览
  }, {
    meta: { title: '临时展览', },
    path: '/exhibit_temp',
    name: 'exhibit_temp',
    component: () => import('../views/ExhibitTemp.vue')//临时展览
  }, {
    meta: { title: '展览计划', },
    path: '/exhibit_plan',
    name: 'exhibit_plan',
    component: () => import('../views/ExhibitPlan.vue')//展览计划
  }, {
    meta: { title: '展览详情', },
    path: '/detail_exhibit',
    name: 'detail_exhibit',
    component: () => import('../views/DetailExhibit.vue')//展览详情
  }, {
    meta: { title: '展览计划详情', },
    path: '/detail_plan',
    name: 'detail_plan',
    component: () => import('../views/DetailPlan.vue')//展览计划详情
  }, {
    meta: { title: '典藏文物', },
    path: '/collection',
    name: 'collection',
    component: () => import('../views/Collection.vue')//典藏文物
  }, {
    meta: { title: '文物列表', },
    path: '/collect_list',
    name: 'collect_list',
    component: () => import('../views/CollectionList.vue')//文物列表
  }, {
    meta: { title: '文物详情', },
    path: '/detail_collect',
    name: 'detail_collect',
    component: () => import('../views/DetailCollect.vue')//典藏文物详情
  }, {
    meta: { title: '学术研究', },
    path: '/academic',
    name: 'academic',
    component: () => import('../views/Academic.vue')//学术研究
  }, {
    meta: { title: '学术资讯', },
    path: '/study_article',
    name: 'study_article',
    component: () => import('../views/AcademicArticle.vue')//学术资讯
  }, {
    meta: { title: '学术资讯详情', },
    path: '/detail_study_article',
    name: 'detail_study_article',
    component: () => import('../views/DetailStudyArticle.vue')//学术资讯详情
  }, {
    meta: { title: '出版书籍', },
    path: '/books',
    name: 'books',
    component: () => import('../views/AcademicBooks.vue')//出版书籍列表页
  }, {
    meta: { title: '学术委员会', },
    path: '/committee',
    name: 'committee',
    component: () => import('../views/DetailCommittee.vue')//学术委员会
  }, {
    meta: { title: '教育活动', },
    path: '/edu_active',
    name: 'edu_active',
    component: () => import('../views/EduActive.vue')//教育活动
  }, {
    meta: { title: '教育活动列表', },
    path: '/edu_active_list',
    name: 'edu_active_list',
    component: () => import('../views/EduActiveList.vue')//教育活动列表
  }, {
    meta: { title: '观众服务', },
    path: '/service',
    name: 'service',
    component: () => import('../views/Service.vue')//观众服务
  }, {
    meta: { title: '文创赏析', },
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue')//文创赏析
  }, {
    meta: { title: '文创销售', },
    path: '/product_sale',
    name: 'product_sale',
    component: () => import('../views/ProductSale.vue')//文创销售
  }, {
    meta: { title: '文创详情', },
    path: '/detail_product',
    name: 'detail_product',
    component: () => import('../views/DetailProduct.vue')//文创详情
  }, {
    meta: { title: '搜索', },
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')//搜索页
  }, {
    meta: { title: '网站地图', },
    path: '/web_map',
    name: 'web_map',
    component: () => import('../views/WebMap.vue')//网站地图
  }, {
    meta: { title: '友情链接', },
    path: '/friend_link',
    name: 'friend_link',
    component: () => import('../views/FriendlyLink.vue')//友情链接
  }, {
    meta: { title: '相关声明', },
    path: '/statement',
    name: 'statement',
    component: () => import('../views/Statement.vue')//相关声明
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
